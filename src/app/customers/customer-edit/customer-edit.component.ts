import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {

  customerForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    membership: new FormControl('', [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder) {
  }

  updateCustomer() {

  }
}
