import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpensesTable, editExpensesTable } from '../redux/actions';

class Table extends Component {
  buttonRemoveExpenses = (value, description) => {
    const { expenses, removeExpensesProps } = this.props;
    const filterDeleteExpenses = !expenses ? '' : expenses
      .filter((expense) => expense.value !== value && expense
        .description !== description);
    removeExpensesProps(filterDeleteExpenses);
  };

  editExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpensesTable(id));
  };

  render() {
    const { expenses } = this.props;
    const validationExpenses = !expenses;
    const renderTable = expenses.map((expense) => {
      const { description, tag, method, value, exchangeRates, currency, id } = expense;
      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ Number(value).toFixed(2) }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2) }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.buttonRemoveExpenses(value, description) }
            >
              Deletar
            </button>
            <button
              type="button"
              data-testid="edit-btn"
              onClick={ () => this.editExpenses }
            >
              Editar despesa
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          { validationExpenses ? '' : renderTable}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpensesProps: (expenses) => dispatch(removeExpensesTable(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeExpensesProps: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
