import React, { Component } from 'react';
import Header from '../components/Header';
import FormExpense from '../components/FormExpense';
import FormTable from '../components/FormTable';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };
  }

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <header>
          <Header />
        </header>
        <FormExpense currencies={ currencies } />
        <FormTable />
      </div>
    );
  }
}

export default Wallet;
