import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PartService } from '../part/shared/part.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { InventoryService } from '../inventory/shared/inventory.service';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('addToCartModal', { static: false }) addToCartModal: TemplateRef<any>;
  @ViewChild('generateInvoice', { static: false }) generateInvoice: TemplateRef<any>;

  addToCartForm: FormGroup;
  modalRef: BsModalRef;
  partList: any[] = [];
  cartList: any[] = [];
  part: any;
  totalAmt: any = 0;
  inventoryList: any;
  constructor(private modalService: BsModalService,private cartServices:CartService, private fb: FormBuilder, private inventoryService: InventoryService, private partServices: PartService, private toastr: ToastrService) { }
  ngOnInit() {
    this.getAllParts();
    this.getInventory();
    this.buildForm();
  }
  getAllParts() {
    this.partServices.getParts().subscribe(data => {
      this.partList = data.parts;
      console.log('list---', this.partList)
    }, err => {
      this.toastr.error('err loading');
    })
  }
  buildForm() {
    this.addToCartForm = this.fb.group({
      part: ['', [Validators.required]],
      price: [0, [Validators.required]],
      quantity: [1, [Validators.required]],
      tax: [0, [Validators.required]],
      amount: [0, [Validators.required]]
    });
  }

  openModal() {
    if (this.partList.length > 0) {
      this.addToCartForm.reset();
      this.modalRef = this.modalService.show(this.addToCartModal);
    }
    else {
      this.toastr.error('no part available')
    }
  }
  openInvoice() {
    this.modalRef = this.modalService.show(this.generateInvoice);
  }
  closeModal() {
    this.modalRef.hide();
  }
  save() {
    console.log('this form', this.addToCartForm)
    if (this.addToCartForm.invalid) {
      return;
    } else {
      let part = this.part;
      part.price = this.addToCartForm.value.price
      part.quantity = this.addToCartForm.value.quantity
      part.tax = this.addToCartForm.value.tax
      part.amount = this.addToCartForm.value.amount

      this.cartList.push(part);
      console.log('cart list', this.cartList)
      this.calculateTotal();
      this.modalRef.hide()
    }
    if (false) {
      this.partServices.createPart(this.addToCartForm.value).subscribe(res => {
        console.log(res)
        this.getAllParts();
        this.modalRef.hide();
      }, err => {
        this.modalRef.hide();
      })
    }
  }
  set(event) {
    this.part = this.partList.find(x => x._id == event)
    this.addToCartForm.controls['price'].setValue(this.part.price);
    console.log('event===>', this.partList.find(x => x._id == event))
  }

  calculateAmount() {
    let amount = (this.addToCartForm.value.quantity * this.addToCartForm.value.price) + ((this.addToCartForm.value.quantity * this.addToCartForm.value.price) * (this.addToCartForm.value.tax / 100))
    this.addToCartForm.controls['amount'].setValue(amount);
    console.log('amount====>', amount)
  }

  calculateTotal() {
    this.totalAmt = 0;
    this.cartList.forEach(element => {
      this.totalAmt = this.totalAmt + element.amount;
    })
    console.log('totalamount====>', this.totalAmt)
  }

  getInventory() {
    this.inventoryService.getInv().subscribe(data => {
      this.inventoryList = data.inventorys;
      console.log('inventoryList list---', this.inventoryList)
    }, err => {
      this.toastr.error('err loading');
    })
  }
  saveInvoice() {
    let obj = {
      LineOfItems: this.cartList,
      Amount: Number(this.totalAmt),
    }
    this.cartServices.createOrder(obj).subscribe(data => {
      this.toastr.success('invoice created');
     this.changeInventory();
    }, err => {
      this.toastr.error('err creating');
    })
    this.closeModal();
  }

  changeInventory() {
    let qua = 0;
    this.cartList.forEach(prt => {
      this.inventoryList.forEach(inv => {
        if (prt._id == inv.part._id && inv.inStock > 0) {
          if (prt.quantity > 0) {
            if (prt.quantity > inv.inStock) {
              let obj = {
                inStock: 0,
                out: inv.inStock
              }
              prt.quantity = prt.quantity - inv.inStock
              inv.inStock = 0;
              console.log(prt.quantity)
              this.inventoryService.updateInv(inv._id, obj).subscribe(res => {
                console.log(res);
              })
            } else {
              console.log(prt.quantity)
              let obj = {
                inStock: inv.inStock - prt.quantity,
                out: inv.out + prt.quantity
              }
              prt.quantity = prt.quantity - obj.out
              inv.inStock = obj.inStock;
              this.inventoryService.updateInv(inv._id, obj).subscribe(res => {
                console.log(res);
              })
            }
          }

        }
      })
    })
  }
}
