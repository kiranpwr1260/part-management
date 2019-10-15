import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartService } from '../part/shared/part.service';
import { InventoryService } from './shared/inventory.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @ViewChild('addInventoryModal', { static: false }) addInventoryModal: TemplateRef<any>;
  modalRef: BsModalRef;
  addInvForm: FormGroup;
  partList: any;
  inventoryList: any;

  constructor(private modalService: BsModalService, private fb: FormBuilder,private partService: PartService, private inventoryService:InventoryService, private toastr: ToastrService) { }
  ngOnInit() {
    this.getAllParts();
    this.getInventory();
  this.buildForm();
  }
  getInventory() {
    this.inventoryService.getInv().subscribe(data=>{
      this.inventoryList = data.inventorys;
     },err=>{
       this.toastr.error('err loading');
     })
  }
  getAllParts() {
    this.partService.getParts().subscribe(data=>{
     this.partList = data.parts;
    },err=>{
      this.toastr.error('err loading');
    })
  }
  
  buildForm() {
    this.addInvForm = this.fb.group({
      batchNo: ['', [Validators.required]],
      part: ['', [Validators.required]],
      inDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      // inStock: ['', [Validators.required]],
      // out: ['', [Validators.required]],
    });
  }
  openModal() {
    if (this.partList.length > 0) {
      this.addInvForm.reset();
      this.modalRef = this.modalService.show(this.addInventoryModal);
    } else {
      this.toastr.error('no part available')
    }
    
  }
  closeModal() {
    this.modalRef.hide();
  }
  saveInventory() {
    if(this.addInvForm.invalid){
        return;
    }

    let inv = {
      batchNo:this.addInvForm.value.batchNo ,
      part:this.addInvForm.value.part ,
      inDate:new Date(this.addInvForm.value.inDate),
      quantity:this.addInvForm.value.quantity
    }

    this.inventoryService.createInv(inv).subscribe(res=>{
      this.getInventory();
      this.modalRef.hide();
    },err=>{
      this.modalRef.hide();
    })
  }
}
