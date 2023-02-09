import * as customerActions from './customer.actions';
import { Customer } from "../customer.model";
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export function customerReducer(state = initialState, action: customerActions.LoadAction): CustomerState {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      }
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        customers: action.payload,
        loading: false,
        loaded: true
      }
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        customers: [],
        loading: false,
        loaded: true,
        error: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

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
