import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import BurgerBuilderCopy from "./containers/BurgerBuilder/BurgegBuilderCopy";

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          {/*<BurgerBuilder />*/}
          <BurgerBuilderCopy/>
        </Layout>
      </div>
    );
  }
}

export default App;
