/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-loop-func */
import Web3 from 'web3'
import range from 'lodash/range'
import { Subject } from 'rxjs'
import betContract from '../contracts/Betting.json'

export const MATCH_STATE_UNSETTLED = 0
export const MATCH_STATE_SETTLED_ON_HOME_VICTORY = 1
export const MATCH_STATE_SETTLED_ON_CHALLENGER_VICTORY = 2
export const MATCH_STATE_SETTLED_ON_EQUALITY = 3


class BetService {
  constructor() {
    const methods = [
      this.bet,
      this.resolveMatch,
      this.getBalance,
      this.createMatch,
      this.getMatchesToBetOn,
      this.getCurrentEthereumAccountPubKey,
      this.startWatchingEvents,
      this.stopWatchingEvents,
    ]
    
    methods.forEach((method) => {
      this[method.name] = method.bind(this)
    })
    
    this.eventSubject = new Subject()
    
    if (typeof window.web3 !== 'undefined') {
      console.log('Using web3 detected from external source like Metamask')
      this.web3 = new Web3(window.web3.currentProvider) // eslint-disable-line no-undef
    } 
    
    const myContract = window.web3.eth.contract(betContract.abi)
    this.state = {
      ContractInstance: myContract.at(this.getBetContractPubKey())
    }
  }
  
  printEvent(event) {
    console.log(event)
    return event && `${event.event} : ${JSON.stringify(event.args)}`
  }
  
  getBetContractPubKey() {
    return '0xd05785Fa4a88cd616259eA2cB4215EdD3d510132'
  }
  
  fromWei(number){
    return this.web3.fromWei(number, 'ether');
  }
  
  resolveMatch(matchId, hasHomeTeamWon, wasThereEquality) {
    this.state.ContractInstance.resolveMatch(
      matchId, hasHomeTeamWon, wasThereEquality, {
        gas: 3000000,
        from: this.getCurrentEthereumAccountPubKey(),
      }, (err, result) => {
        console.log(err, result)
      },
      )
    }
    
    
    createMatch(homeTeam, challengerTeam, libelle, date, quotation) {
      this.state.ContractInstance
      .createMatch(homeTeam, challengerTeam, libelle, date, Math.floor(quotation * 100), {
        gas: 1000000,
        from: this.getCurrentEthereumAccountPubKey(),
      }, (err, result) => {
        console.log(err, result)
      })
    }
    
    getBalance(account,callback) {
      this.web3.eth.getBalance(account,callback)
    }
    
    getCurrentEthereumAccountPubKey() {
      return this.web3.eth.accounts[0]
    }
    
    getMatchesToBetOn() {
      const matches = []
      const contractInst = this.state.ContractInstance
      return new Promise((resolve, reject) => {
        contractInst.matchIDGenerator.call((err, matchsLenght) => {
          if (err) {
            reject('Erreur récupération lenght', err)
          }
          
          let matchCounter = 0
          
          for (let i = 0; i < matchsLenght; i += 1) {
            contractInst.matchs.call(i, (err2, match) => {
              if (err2) {
                reject('Erreur récupération match', err2)
              }
              
              matches.push({
                id: match[0].toNumber(),
                homeTeam: match[1],
                externalTeam: match[2],
                matchState: match[3],
                libelle: match[4],
                date: match[5].toNumber(),
                quotation: match[6].toNumber()
              })
              if (++matchCounter == matchsLenght) {
                resolve(matches)
              }
            })
          }
        })
      })
    }
    
    bet(matchId, betOnHomeTeamWin, betOnHomeTeamEquality, amountToBet) {
      
    }
    
    getBets() {
      return new Promise((resolve, reject) => {
        const bets = [
          {
            amount: 10000000000000,
            match_id: 0,
            externalTeam: 'externalTeam',
            homeTeam: 'homeTeam',
            homeVictoryBet: true,
            equalityBet: false,
          },
          {
            amount: 20000000000000,
            match_id: 1,
            externalTeam: 'externalTeam1',
            homeTeam: 'homeTeam2',
            homeVictoryBet: false,
            equalityBet: true,
          },
        ]
        resolve(bets)
      })
    }
    
    startWatchingEvents() {
      this.state.eventsFilter = this.state.ContractInstance.allEvents({ fromBlock: 0, toBlock: 'latest' })
      this.state.eventsFilter.watch((error, result) => {
        this.eventSubject.next(this.printEvent(result))
      })
    }
    
    stopWatchingEvents() {
      // will stop and uninstall the filter
      this.state.eventsFilter.stopWatching()
    }
  }
  
  
  export default BetService
  