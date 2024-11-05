import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lr-form',
  templateUrl: './lr-form.component.html',
  styleUrls: ['./lr-form.component.scss']
})
export class LrFormComponent implements OnInit {
  lrForm!: FormGroup
  dateValue!: Date;
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.lrForm = this.formBuilder.group({
      truckNo: '',
      lrNo: '',
      dateValue: '',
      consigner: '',
      consignee: '',
      address: '',
      from: '',
      to: '',
      driverName: '',
      transporterName: '',
      ownerName: '',
      cellNo: '',
      noOfArticles: '',
      billNo: '',
      rate: '',
      advance: '',
      grossWeight: '',
      tareWeight: '',
      netWeight: '',
      amountInWords: '',
      declaredValue: '',
      deliveryInstruction: '',
    })
  }

  onSubmit() {
    console.log(this.lrForm.value)
  }
}
