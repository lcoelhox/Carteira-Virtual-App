// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCIES,
  SUCESS_CURRENCIES,
  FAIL_CURRENCIES,
  REQUEST_RATES_STORE,
  RECEIVE_RATES_STORE,
  REMOVE_EXPENSES_TABLE,
  EDIT_EXPENSES_TABLE,
  APPLY_EXPENSES_TABLE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: '',
  fethiching: false,
  idCont: 0,
  edit: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES: return {
    ...state,
    fethiching: true,
  };

  case SUCESS_CURRENCIES: return {
    ...state,
    currencies: action.pay,
    fethiching: false,
  };

  case FAIL_CURRENCIES: return {
    ...state,
    error: action.error,
    fethiching: false,
  };

  case REQUEST_RATES_STORE:
    return {
      ...state,
    };

  case RECEIVE_RATES_STORE: return {
    ...state,
    fethiching: false,
    idCont: state.idCont + 1,
    expenses: [...state.expenses, { ...action.pay }],
  };

  case REMOVE_EXPENSES_TABLE: return {
    ...state,
    expenses: action.expenses,
  };

  case EDIT_EXPENSES_TABLE: return {
    ...state,
    idToEdit: action.id,
    edit: true,
  };

  case APPLY_EXPENSES_TABLE: return {
    ...state,
    expenses: action.expenses,
    edit: false,
  };

  default: return state;
  }
};

export default wallet;
