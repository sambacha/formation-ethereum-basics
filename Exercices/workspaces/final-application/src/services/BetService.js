import Web3 from 'web3'
import range from 'lodash/range'
import { Subject } from 'rxjs'
import betContract from '../contracts/Betting.json'

export const MATCH_STATE_UNSETTLED = 0;
export const MATCH_STATE_SETTLED_ON_HOME_VICTORY = 1;
export const MATCH_STATE_SETTLED_ON_CHALLENGER_VICTORY = 2;
export const MATCH_STATE_SETTLED_ON_EQUALITY = 3;

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

    if (typeof window.web3 !== 'undefined') {
      console.log('Using web3 detected from external source like Metamask')
      this.web3 = new Web3(window.web3.currentProvider) // eslint-disable-line no-undef
    }
    const betAbi = betContract.abi
    // TODO : ne fonctionne que si on fait un lien symbolique truffle-build
    // dans src vers le répertoire de build de truffle
    // ln -s ../build truffle-build
    this.state.MyContract = window.web3.eth.contract(betAbi)
    this.state.ContractInstance = this.state.MyContract.at(BetService.getBetContractPubKey())
  }

  static printEvent(event) {
    console.log(event)
    return event && `${event.event} : ${JSON.stringify(event.args)}`
  }

  static getBetContractPubKey() {
    return '0xddA3B5c975c2C4fb2bf03d086aD5834732eaFb17'
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

  bet(matchId, betOnHomeTeamWin, betOnHomeTeamEquality, amountToBet) {
    this.state.ContractInstance.betOnMatch(
      betOnHomeTeamWin, betOnHomeTeamEquality, matchId, {
        gas: 300000,
        from: this.getCurrentEthereumAccountPubKey(),
        value: window.web3.toWei(amountToBet, 'ether'),
      }, (err, result) => {
        console.log(err, result)
      },
    )
  }

  /* eslint-disable */
  getMatchesToBetOn() {
    return new Promise((resolve, reject) => {
      const matches = []
      let contractInst = this.state.ContractInstance

      contractInst.matchIDGenerator.call((err, matchsLenght) => {

        if (err) {
          reject("Erreur récupération lenght", err);
        }

        let matchCounter = 0;
        
        for (let i = 0; i < matchsLenght; i++) {
          contractInst.matchs.call(i, (err, match) => {
            if (err) {
              reject("Erreur récupération match", err);
            }

            matches.push({ 
              id: match[0].toNumber(), 
              homeTeam: match[1], 
              externalTeam: match[2], 
              matchState: match[3], 
              libelle: match[4],
              date: match[5].toNumber(),
              quotation: match[6].toNumber()
             });
            if (++matchCounter == matchsLenght) {
              resolve(matches);
            }
          });
        }
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
