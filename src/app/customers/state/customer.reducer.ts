const initialState = {
  customers: [
    {
      "name": "John Doe",
      "phone": "1234567890",
      "address": "123 Sun Street",
      "membership": "Platinum",
      "id": 1
    }
  ],
  loading: false,
  loaded: true
};

export function customerReducer(state = initialState, action: { type: any; }) {
  switch (action.type) {
    case "LOAD_CUSTOMERS": {
      return {
        ...state,
        loading: true,
        loaded: false
      }
    }
    default: {
      return state
    }
  }
}
