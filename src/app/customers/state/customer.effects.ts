import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CustomerService } from "../customer.service";
import { catchError, map, mergeMap, Observable, of, switchMap, tap } from "rxjs";
import * as customerActions from "../state/customer.actions";
import { Customer } from "../customer.model";

@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private customerService: CustomerService) {
  }

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.loadCustomers),
      tap(() => console.log('Load Customers')),
      // switchMap cancels previous HTTP requests that are still in progress, use latest value
      // mergeMap lets all of previous HTTP requests finish.
      switchMap((action) => {
        return this.customerService.getCustomers().pipe(
          map((customers: Customer[]) => customerActions.loadCustomersSuccess({ payload: { customers } })),
          catchError(error => of(customerActions.loadCustomersFail({ payload: { error } })))
        )
      })
    );
  })

  loadCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.loadCustomer),
      tap(() => console.log('Load Customer')),
      switchMap((action) => {
        return this.customerService.getCustomerById(action.id).pipe(
          map((customer: Customer) => customerActions.loadCustomerSuccess({ payload: { customer } })),
          catchError(error => of(customerActions.loadCustomerFail({ error })))
        )
      })
    );
  })

  createCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.createCustomer),
      tap(() => console.log('CREATE Customer')),
      switchMap((action) => {
        return this.customerService.createCustomer(action.payload.customer).pipe(
          map((newCustomer: Customer) => customerActions.createCustomerSuccess({ payload: { customer: newCustomer } })),
          catchError(error => of(customerActions.createCustomerFail({ error })))
        )
      })
    );
  })

  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.updateCustomer),
      tap(() => console.log('Update Customer')),
      switchMap((action) => {
        return this.customerService.updateCustomer(action.payload.customer).pipe(
          map((updateCustomer: Customer) => customerActions.updateCustomerSuccess({
            payload: {
              customer: {
                id: updateCustomer.id!,
                changes: updateCustomer
              }
            }
          })),
          catchError(error => of(customerActions.updateCustomerFail({ error })))
        )
      })
    );
  })

  deleteCustomer = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.deleteCustomer),
      tap(() => console.log('Delete Customer')),
      switchMap((action) => {
        return this.customerService.deleteCustomer(action.payload.id).pipe(
          map(() => customerActions.deleteCustomerSuccess({ payload: { id: action.payload.id } })),
          catchError(error => of(customerActions.deleteCustomerFail({ error })))
        )
      })
    );
  })
}
