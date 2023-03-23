import * as customerActions from './customer.actions';
import { Customer } from "../customer.model";
import * as fromRoot from '../../state/app-state';
import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, on, union } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: ''
}

const initialState = customerAdapter.getInitialState(defaultCustomer);

export const customerReducer = createReducer(
  initialState,
  on(customerActions.loadCustomers,
    (state) => ({ ...state, loading: true })),
  on(customerActions.loadCustomersSuccess,
    (state, { payload: { customers } }) =>
      customerAdapter.setAll(customers, { ...state, loading: false, loaded: true })),
  on(customerActions.loadCustomersFail,
    (state, { payload: { error } }) => ({ ...state, entities: {}, loading: false, loaded: true, error })),

  on(customerActions.loadCustomerSuccess,
    (state, { payload: { customer } }) =>
      customerAdapter.addOne(customer, { ...state, selectedCustomerId: customer.id! })),
  on(customerActions.loadCustomerFail,
    (state, { error }) => ({ ...state, error })),

  on(customerActions.createCustomerSuccess,
    (state, { payload: { customer } }) =>
      customerAdapter.addOne(customer, { ...state })),
  on(customerActions.createCustomerFail,
    (state, { error }) => ({ ...state, error })),

  on(customerActions.updateCustomerSuccess,
    (state, { payload: { customer } }) =>
      customerAdapter.updateOne(customer, { ...state })),
  on(customerActions.updateCustomerFail,
    (state, { error }) => ({ ...state, error })),

  on(customerActions.deleteCustomerSuccess,
    (state, { payload: { id } }) =>
      customerAdapter.removeOne(id, { ...state })),
  on(customerActions.deleteCustomerFail,
    (state, { error }) => ({ ...state, error }))
);

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
)

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
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

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
)

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.entities[state.selectedCustomerId!]
)

export interface State {
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};


