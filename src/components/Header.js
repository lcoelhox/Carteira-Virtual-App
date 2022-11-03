import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculatorExpenses = (expenses) => {
    const totalExpenses = expenses
      .reduce((total, { value, currency, exchangeRates }) => (
        total + (
          value * exchangeRates[currency].ask
        )), 0) || 0;
    return totalExpenses;
  };

  render() {
    const { expenses, email } = this.props;

    return (
      <header>
        <h4 data-testid="email-field">{`Email: ${email}`}</h4>
        <label htmlFor="total-field">
          despesas:
          <h4 data-testid="total-field">
            { this.calculatorExpenses(expenses).toFixed(2) }
          </h4>
        </label>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
