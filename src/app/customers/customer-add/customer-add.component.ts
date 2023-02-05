import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    membership: new FormControl('', [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder) {
  }

  createCustomer() {

  }
}
