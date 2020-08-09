import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic, Card, Row, Col, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";

import { COLORS, NAMES } from '../constants';


const ARROW_COMPS = {
  credit: <ArrowUpOutlined />,
  debit: <ArrowDownOutlined />,
};


const DetailTransaction = (props) => {

  const [transaction, setTransaction] = useState()

  const init = async () => {
    const id = props.match.params.id
    if (id) {
      const response = await axios.get(`http://localhost:2222/transaction/${id}`);
      console.log(response)
      setTransaction(response.data.data);
    }
  }

  useEffect(() => {
    init()
  }, [])

  return transaction ? (
    <Card
      className='transaction-card'
    >
      <Statistic
        title={NAMES[transaction.type]}
        value={transaction.amount}
        valueStyle={{ color: COLORS[transaction.type] }}
        prefix={ARROW_COMPS[transaction.type]}
        suffix="$"
      />
      <p className='card-date'>{new Date(transaction.effectiveDate).toDateString()}</p>
    </Card>) : 'Transaction doest exist'
}

DetailTransaction.displayName = 'DetailTransaction';

export default withRouter(DetailTransaction);
