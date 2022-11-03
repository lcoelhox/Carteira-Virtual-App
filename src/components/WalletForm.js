import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestRates, applyExpensesTable } from '../redux/actions';
// import fetchAPIAll from '../requestAPI';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  edit: false,
};

class WalletForm extends Component {
  state = { ...INITIAL_STATE };

  handleSubmitButton = async (event) => {
    event.preventDefault();
    const { getExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    getExpense({ value, description, currency, method, tag });
    this.setState({ ...INITIAL_STATE });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  editExpensesButton = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(applyExpensesTable(this.state));
    this.state(INITIAL_STATE);
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, fethiching, edit } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          <input
            type="number"
            placeholder="Valor de despesa"
            data-testid="value-input"
            name="value"
            id="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            name="description"
            id="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency-input">
          Moedas
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            { fethiching ? <option>Loading...</option> : (
              currencies.map((option, index) => (
                <option
                  key={ index }
                  value={ option }
                >
                  { option }
                </option>))
            )}
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de pagamento:
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            id="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ edit ? this.editExpensesButton : this.handleSubmitButton }
        >
          {edit ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  fethiching: state.wallet.fethiching,
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  getExpense: (expense) => dispatch(requestRates(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  fethiching: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpense: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
