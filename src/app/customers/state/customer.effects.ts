import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CustomerService } from "../customer.service";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
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
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      mergeMap((actions: customerActions.LoadCustomers) => this.customerService.getCustomers().pipe(
          map((customers: Customer[]) => new customerActions.LoadCustomersSuccess(customers)),
          catchError(err => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    );
  })

}
