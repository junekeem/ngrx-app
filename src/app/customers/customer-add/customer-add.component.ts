import { Component } from '@angular/core';
import * as fromCustomer from "../state/customer.reducer"
import * as customerActions from "../state/customer.actions"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Customer } from "../customer.model";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerForm: FormGroup = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    membership: new FormControl('', [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromCustomer.AppState>) {
  }

  createCustomer() {
    const newCustomer: Customer = { ...this.customerForm.value as Customer };

    this.store.dispatch(customerActions.createCustomer({ payload: { customer: newCustomer } }));

    this.customerForm.reset();
  }
}
