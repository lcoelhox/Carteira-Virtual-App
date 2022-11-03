import fechAPIAll from '../../requestAPI';

export const SAVE_LOGIN = 'SAVE_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SUCESS_CURRENCIES = 'SUCESS_CURRENCIES';
export const FAIL_CURRENCIES = 'FAIL_CURRENCIES';
export const REQUEST_RATES_STORE = 'REQUEST_RATES_STORE';
export const RECEIVE_RATES_STORE = 'RECEIVE_RATES_STORE';
export const REMOVE_EXPENSES_TABLE = 'REMOVE_EXPENSES_TABLE';
export const EDIT_EXPENSES_TABLE = 'EDIT_EXPENSES_TABLE';
export const APPLY_EXPENSES_TABLE = 'APPLY_EXPENSES_TABLE';

export const saveLogin = (email) => ({
  type: SAVE_LOGIN,
  email,
  pay: email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const sucessCurrencies = (pay) => ({
  type: SUCESS_CURRENCIES,
  pay,
});

export const failCurrencies = (error) => ({
  type: FAIL_CURRENCIES,
  error,
});

export const requestRatesStore = () => ({
  type: REQUEST_RATES_STORE,
});

export const receiveRatesStore = (pay) => ({
  type: RECEIVE_RATES_STORE,
  pay,
});

export const removeExpensesTable = (expenses) => ({
  type: REMOVE_EXPENSES_TABLE,
  expenses,
});

export const editExpensesTable = (idToEdit) => ({
  type: EDIT_EXPENSES_TABLE,
  idToEdit,
});

export const applyExpensesTable = (expenses) => ({
  type: APPLY_EXPENSES_TABLE,
  expenses,
});

export const fetchCurrenciesAll = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const responseFetch = await fechAPIAll();

  try {
    dispatch(sucessCurrencies(Object.keys(responseFetch).filter((sg) => sg !== 'USDT')));
  } catch (error) {
    dispatch(failCurrencies(error));
  }
};

export const requestRates = (expenses) => async (dispatch, getState) => {
  const responseFetch = await fechAPIAll();
  dispatch(requestRatesStore());
  const pay = {
    id: getState().wallet.idCont,
    ...expenses,
    exchangeRates: responseFetch,
  };
  dispatch(receiveRatesStore(pay));
};
