import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveUserEmail } from '../actions/index';

import illustrImg from '../assets/img/illustration.svg';
import logoImg from '../assets/img/logo.svg';

import '../styles/buttonLogin.css';
import '../styles/auth.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  emailValidation(email) {
    const regex = /\S+@\S+\.\S+/;

    const validation = regex.test(email);
    return validation;
  }

  passwordValidation(password) {
    const minimumLength = 6;
    return password.length >= minimumLength;
  }

  loginValidation() {
    const { email, password } = this.state;
    const login = this.emailValidation(email) && this.passwordValidation(password);
    return login;
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const canLogin = this.loginValidation();
    const { email } = this.state;
    const { saveEmailInRedux } = this.props;
    return (
      <div className="page-auth">
        <aside>
          <img src={ illustrImg } alt="Ilustração carteira para conversão de moedas" />
          <strong>Crie sua carteira</strong>
          <p>Conversão de moedas em tempo real</p>
        </aside>
        <main>
          <div className="main-content">
            <img src={ logoImg } alt="TrybeWallet" />
            <div className="separator">Inserir e-mail e senha</div>
            <form>
              <input
                type="email"
                data-testid="email-input"
                name="email"
                onChange={ this.handleInput }
                placeholder="Enter your email address"
              />
              <input
                type="password"
                data-testid="password-input"
                name="password"
                onChange={ this.handleInput }
                placeholder="Enter your password"
              />
            </form>
            <Link
              onClick={ () => saveEmailInRedux(email) }
              to="/carteira"
            >
              <button
                type="button"
                disabled={ !canLogin }
                className="button"
              >
                Entrar
              </button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  saveEmailInRedux: PropTypes.func.isRequired,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveEmailInRedux: (email) => dispatch(saveUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
