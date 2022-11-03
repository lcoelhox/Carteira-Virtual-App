import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAll, saveLogin } from '../redux/actions/index';

const MIN_LENGTH = 6;

class Login extends Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(saveLogin(email));
    dispatch(fetchCurrenciesAll('login'));
    history.push('/carteira');
  };

  validationButton = () => {
    const { email, password } = this.state;
    const validator = /[^@]+@[^@]+\.[^@]+/gi.test(email);
    const validEmailLength = email
      .length > 0 && password.length >= MIN_LENGTH && validator;
    if (validEmailLength) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validationButton);
  };

  render() {
    const { email, password, disabled } = this.state;

    return (
      <section>
        <h1>Insira seu Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">
            Email
            <input
              type="text"
              placeholder="Email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              id="Email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="text"
              placeholder="Senha"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              id="password"
            />
          </label>
          <button
            type="submit"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
