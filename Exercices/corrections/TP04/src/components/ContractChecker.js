import React, { Component } from 'react'
import BetService from '../services/BetService'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

class ContractChecker extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getCurrentUserBalance = this.getCurrentUserBalance.bind(this)
    this.getContractAccountBalance = this.getContractAccountBalance.bind(this)
    this.getCurrentUserPublicKey = this.getCurrentUserPublicKey.bind(this)
    this.betService = new BetService()
  }
  
  componentDidMount() {
    this.setState({
      contractAccountInterval: setInterval(this.getContractAccountBalance, 5000),
      currentUserBalanceInterval: setInterval(this.getCurrentUserBalance, 5000),
      currentUserPublicKeyInterval: setInterval(this.getCurrentUserPublicKey, 5000),
    })
  }
  
  componentWillUnmount() {
    const {
      contractAccountInterval,
      currentUserBalanceInterval,
      currentUserPublicKeyInterval,
    } = this.state
    
    clearInterval(contractAccountInterval)
    clearInterval(currentUserBalanceInterval)
    clearInterval(currentUserPublicKeyInterval)
  }
  
  
  async getCurrentUserPublicKey() {
    try {
      this.setState({
        currentUserPublicKey: await this.betService.getCurrentEthereumAccountPubKey()
      })
    } catch(err){
      console.error(err)
    }
  }

  balanceCallback(stateParam) {
    return  (error, result) => { 
      if (error) {
        console.error(error)
      } else {
        this.setState({
          [stateParam]: this.betService.fromWei(result.toNumber())
        })
      }
    }
  } 
  
  async getCurrentUserBalance() {
    
    const account = await this.betService.getCurrentEthereumAccountPubKey()
    
    this.betService.getBalance(account, this.balanceCallback('currentUserBalance')) 
  }
  
  async getContractAccountBalance() {
    this.betService.getBalance(this.betService.getBetContractPubKey(), this.balanceCallback('contractBalance'))
  }
  
  render() {
    const { currentUserPublicKey, currentUserBalance, contractBalance } = this.state
    return (
      <div id="accounts-sumup">
      <div>
      <h2>My account</h2>
      <p>
      <strong>Public key :</strong>
      {' '}
      {currentUserPublicKey}
      </p>
      <p>
      <strong>Balance :</strong>
      {' '}
      {currentUserBalance}
      </p>
      </div>
      <div>
      <h2>Bet contract</h2>
      <p>
      <strong>Public key :</strong>
      {' '}
      {this.betService.getBetContractPubKey()}
      </p>
      <p>
      <strong>Balance :</strong>
      {' '}
      {contractBalance}
      </p>
      </div>
      </div>
      )
    }
  }
  
  export default ContractChecker
  