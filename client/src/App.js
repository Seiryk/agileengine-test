import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Statistic, Card, Row, Col, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import Transactions from './pages/Transactions';
import DetailTransaction from './pages/DetailTransaction';

import './index.css';

// refactor , split code

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route exact path="/">
            <Transactions />
          </Route>
          <Route exact path="/detail/:id">
            <DetailTransaction />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
