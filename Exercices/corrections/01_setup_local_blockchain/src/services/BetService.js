import Web3 from 'web3'
import range from 'lodash/range'
import { Subject } from 'rxjs'
import betContract from '../contracts/Betting.json'

class BetService {
  constructor() {
    this.state = {
      bet: undefined, amount: null, matches: [], eventLogs: [], bets: []
    }
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
  }

  static printEvent(event) {
    console.log(event)
    return event && `${event.event} : ${JSON.stringify(event.args)}`
  }

  static getBetContractPubKey() {
    return '<ContractPublicKey>'
  }

  getBalance(account) {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(account, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(this.web3.fromWei(result.toNumber(), 'ether'))
        }
      })
    })
  }

  getCurrentEthereumAccountPubKey() {
    return this.web3.eth.accounts[0]
  }

  getBets() {
    const formattedBets = []

    return new Promise((resolve, reject) => {
      this.getMatchesToBetOn().then(matches => {
        this.state.ContractInstance.getUserBets.call(this.getCurrentEthereumAccountPubKey(), 
          (err, bets) => {
            range(bets[0].length).forEach((index) => {
              const match_id = bets[1][index].toNumber()
              const match = matches.find(({ id}) => id === bets[1][index].toNumber())
              formattedBets.push({
                amount: window.web3.fromWei(bets[0][index].toNumber(), 'ether'),
                match_id,
                externalTeam: match.externalTeam,
                homeTeam: match.homeTeam,
                homeVictoryBet: bets[2][index],
                equalityBet: bets[3][index],
              })
            })
            resolve(formattedBets)
          })
      })
    })
  }

  startWatchingEvents() {
    this.state.eventsFilter = this.state.ContractInstance.allEvents({ fromBlock: 0, toBlock: 'latest' })
    this.state.eventsFilter.watch((error, result) => {
      this.eventSubject.next(BetService.printEvent(result))
    })
    this.state.betTreatmentFilter = this.state.ContractInstance.ResolvedBet({}, { fromBlock: 0, toBlock: 'latest' },
      (error, result) => {
        if (!error) {
          this.eventSubject.next(BetService.printEvent(result))
        } else {
          console.log(error)
        }
      })
  }

  stopWatchingEvents() {
    // will stop and uninstall the filter
    this.state.eventsFilter.stopWatching()
    this.state.betTreatmentFilter.stopWatching()
  }
}


export default BetService
