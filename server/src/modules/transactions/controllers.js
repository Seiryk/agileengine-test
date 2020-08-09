

import { v4 as uuid } from 'uuid';

const TYPES = {
  credit: 'credit',
  debit: 'debit',
}


class Transaction {
  BLOCKED_QUEUE = []
  isBlocked = false

  TRANSACTIONS = [];
  BALANCE = 1000;

  runBlockedQueue = () => {
    while (!this.isBlocked && this.BLOCKED_QUEUE.length) {
      const fn = this.BLOCKED_QUEUE.shift()
      fn()
    }
  }

  _getBallance = (req, res, next) => {
    res.json({ data: this.BALANCE })
  }
  getBallance = (req, res, next) => {
    const resolveFn = this._getBallance.bind(this, req, res, next)
    if (this.isBlocked) this.BLOCKED_QUEUE.push(resolveFn)
    else resolveFn()
  }

  _create = (req, res, next) => {
    this.isBlocked = true
    const newTransaction = {
      id: uuid(),
      type: req.body.type,
      amount: req.body.amount,
      effectiveDate: Date.now()
    }
    let message = ''

    if (newTransaction.type === TYPES.debit) {
      this.BALANCE = this.BALANCE + Number(newTransaction.amount);
      this.TRANSACTIONS.push(newTransaction)
      let message = 'Transaction has been completed succesfully'
    } else if (newTransaction.type === TYPES.credit) {
      const newBallance = this.BALANCE - newTransaction.amount
      const isValid = newBallance >= 0
      if (isValid) {
        this.BALANCE = newBallance
        this.TRANSACTIONS.push(newTransaction)
        message = 'Transaction has been completed succesfully'

      } else {
        message = 'Not enough money for transaction'
      }
    }
    this.isBlocked = false
    this.runBlockedQueue()
    res.json(message)
  }
  create = (req, res, next) => {
    const resolveFn = this._create.bind(this, req, res, next)
    if (this.isBlocked) this.BLOCKED_QUEUE.push(resolveFn)
    else resolveFn()
  }


  _getById = (req, res, next) => {
    const transaction = this.TRANSACTIONS.find(el => el.id === req.params.id) || null;
    res.json({ data: transaction })
  }
  getById = (req, res, next) => {
    const resolveFn = this._getById.bind(this, req, res, next)
    if (this.isBlocked) this.BLOCKED_QUEUE.push(resolveFn)
    else resolveFn()
  }


  _getAll = (req, res, next) => {
    res.json({ data: this.TRANSACTIONS })
  }
  getAll = (req, res, next) => {
    const resolveFn = this._getAll.bind(this, req, res, next)
    if (this.isBlocked) this.BLOCKED_QUEUE.push(resolveFn)
    else resolveFn()
  }
}

export default new Transaction;

