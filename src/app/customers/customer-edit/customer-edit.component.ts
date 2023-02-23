import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import * as fromCustomer from "../state/customer.reducer"
import * as customerActions from "../state/customer.actions"
import { Store } from "@ngrx/store";
import { Customer } from "../customer.model";
import { Observable } from "rxjs";


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

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

  ngOnInit() {
    const customer$: Observable<Customer | undefined> = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          id: currentCustomer.id,
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership
        })
      }
    })
  }

  updateCustomer() {
    const updateCustomer: Customer = { ...this.customerForm.value as Customer };

    this.store.dispatch(customerActions.updateCustomer({ payload: { customer: updateCustomer } }));
  }
}
