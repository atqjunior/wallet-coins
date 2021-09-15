import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LogoVertical from '../assets/img/logo-vertical.svg';
import '../styles/header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const rate = exchangeRates[currency].ask;
      // parseFloat transforma em número considerando os decimais
      acc += (parseFloat(value) * parseFloat(rate));
      return acc;
    }, 0);
    return Math.round(total * 100) / 100;
  }

  render() {
    const { email } = this.props;
    return (
      <div className="page-wallet">
        <div className="logo-wallet">
          <img src={ LogoVertical } alt="Logo na Vertical" />
        </div>
        <div className="text-wallet">
          <p>
            Email:
            <span data-testid="email-field">
              {email}
            </span>
          </p>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">
              {this.totalExpenses()}
            </span>
          </p>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
