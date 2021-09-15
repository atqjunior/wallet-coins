import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

import '../styles/FormTable.css';

const data = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Excluir',
];

class FormTable extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target, paymentData) {
    const { remove } = this.props;
    if (target.name === 'delete') {
      remove(paymentData);
    }
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="content-table">
        <thead>
          <tr>
            { data.map((item) => (<th key={ item }>{ item }</th>)) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((current, id) => {
            const { description, tag, method, value, exchangeRates, currency } = current;
            const total = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ total.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    name="delete"
                    data-testid="delete-btn"
                    onClick={ ({ target }) => this.handleClick(target, id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  remove: PropTypes.func,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(deleteExpense(id)),
});

FormTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormTable);
