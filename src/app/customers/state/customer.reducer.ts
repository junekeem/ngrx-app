import * as customerActions from './customer.actions';
import { Customer } from "../customer.model";
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createReducer, createSelector, on, union } from "@ngrx/store";

export interface CustomerState {
  customers: Customer[],
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  loaded: false,
  error: ''
}

export const customerReducer = createReducer(
  initialState,
  on(customerActions.loadCustomers,
    (state) => ({ ...state, loading: true })),
  on(customerActions.loadCustomersSuccess,
    (state, { payload }) => ({ ...state, customers: payload.customers, loading: false, loaded: true })),
  on(customerActions.loadCustomersFail,
    (state, { payload }) => ({ ...state, customers: [], loading: false, loaded: true, error: payload.error }))
);

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
)

export const getCustomers = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.customers
)

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
)

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
)

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
)
