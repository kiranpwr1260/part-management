import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartService } from './shared/part.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  @ViewChild('addPartModal',{static:false}) addPartModal: TemplateRef<any>;
  addPartForm: FormGroup;
  modalRef: BsModalRef;
  partList: any;
    constructor(private modalService: BsModalService, private fb: FormBuilder, private partServices:PartService, private toastr: ToastrService) { }
    ngOnInit() {
      this.getAllParts();
      this.buildForm();
    }
  getAllParts() {
    this.partServices.getParts().subscribe(data=>{
      this.partList = data.parts;
     },err=>{
       this.toastr.error('err loading');
     })
  }
  buildForm() {
    this.addPartForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
    });
  }
  
    openModal(){
    this.addPartForm.reset();
      this.modalRef = this.modalService.show(this.addPartModal);
    }
    closeModal(){
      this.modalRef.hide();
    }
    savePart(){
    if(this.addPartForm.invalid){
        return;
    }
      this.partServices.createPart(this.addPartForm.value).subscribe(res=>{
        this.getAllParts();
        this.modalRef.hide();
      },err=>{
        this.modalRef.hide();  
      })
    }

}
