import { createAction, props } from "@ngrx/store";
import { Customer } from "../customer.model";
import { Update } from "@ngrx/entity";

export const loadCustomers = createAction(
  '[Customer] Load Customers',
)

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ payload: { customers: Customer[] } }>()
)

export const loadCustomersFail = createAction(
  '[Customer] Load Customers Fail',
  props<{ payload: { error: string } }>()
)

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ id: number }>()
)

export const loadCustomerSuccess = createAction(
  '[Customer] Load Customer Success',
  props<{ payload: { customer: Customer } }>()
)

export const loadCustomerFail = createAction(
  '[Customer] Load Customer Fail',
  props<{ error: string }>()
)

export const createCustomer = createAction(
  '[Customer] Create Customer',
  props<{ payload: { customer: Customer } }>()
)

export const createCustomerSuccess = createAction(
  '[Customer] Create Customer Success',
  props<{ payload: { customer: Customer } }>()
)

export const createCustomerFail = createAction(
  '[Customer] Create Customer Fail',
  props<{ error: string }>()
)


export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ payload: { customer: Customer } }>()
)

export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success',
  props<{ payload: { customer:Update<Customer> } }>()
)

export const updateCustomerFail = createAction(
  '[Customer] Update Customer Fail',
  props<{ error: string }>()
)

export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ payload: { id: number } }>()
)

export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ payload: { id: number } }>()
)

export const deleteCustomerFail = createAction(
  '[Customer] Delete Customer Fail',
  props<{ error: string }>()
)
