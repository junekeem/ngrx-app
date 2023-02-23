import { Component, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Customer } from "../customer.model";
import * as customerActions from '../state/customer.actions'
import * as fromCustomer from '../state/customer.reducer'
import { Observable } from "rxjs";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]>;
  error$: Observable<String>;

  constructor(
    private store: Store<fromCustomer.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(customerActions.loadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomer.getError))
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(customerActions.loadCustomer({ id: customer.id! }))
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Delete the user?")) {
      this.store.dispatch(customerActions.deleteCustomer({ payload: { id: customer.id! } }));
    }
  }
}
