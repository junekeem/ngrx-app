import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CustomerService } from "../customer.service";
import { catchError, map, mergeMap, Observable, of, switchMap } from "rxjs";
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

}
