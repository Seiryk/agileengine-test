import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Statistic, Card, Row, Col, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";

import { COLORS, NAMES } from "../constants";

const ARROW_COMPS = {
  credit: <ArrowUpOutlined />,
  debit: <ArrowDownOutlined />,
};


const Transactions = (props) => {
  const [data, setData] = useState([])

  const init = async () => {
    const response = await axios.get('http://localhost:2222/transaction');
    console.log(response)
    setData(response.data.data);
  }

  const onTransactionClick = useCallback((id) => {
    props.history.push(`detail/${id}`)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      init()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    init()
  }, [])

  return data.length ? (
    <>
      {
        data.map(transaction => (
          <Card
            key={transaction.id}
            onClick={() => onTransactionClick(transaction.id)}
            className='transaction-card transaction-card-hover'>
            <Statistic
              title={NAMES[transaction.type]}
              value={transaction.amount}
              valueStyle={{ color: COLORS[transaction.type] }}
              prefix={ARROW_COMPS[transaction.type]}
              suffix="$"
            />
          </Card>
        ))
      }
    </>
  ) : <div>no transactions</div>;
}

Transactions.displayName = 'Transactions';

export default withRouter(Transactions);
