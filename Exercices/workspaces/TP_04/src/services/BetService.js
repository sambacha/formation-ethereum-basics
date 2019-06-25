import Web3 from 'web3'
import range from 'lodash/range'
import { Subject } from 'rxjs'

export const MATCH_STATE_UNSETTLED = 0
export const MATCH_STATE_SETTLED_ON_HOME_VICTORY = 1
export const MATCH_STATE_SETTLED_ON_CHALLENGER_VICTORY = 2
export const MATCH_STATE_SETTLED_ON_EQUALITY = 3


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

    //TO COMPLETE IN TP05
    this.state.MyContract
    this.state.ContractInstance

  }

  static printEvent(event) {
    console.log(event)
    return event && `${event.event} : ${JSON.stringify(event.args)}`
  }

  static getBetContractPubKey() {
    return '<ContractPublicKey>'
  }


  resolveMatch(matchId, hasHomeTeamWon, wasThereEquality) {
    //TO COMPLETE IN TP05
  }

  
  createMatch(homeTeam, challengerTeam, libelle, date, quotation) {
    //TO COMPLETE IN TP05
  }
   
  getMatchesToBetOn(){
    return new Promise((resolve, reject) => {
      //TO COMPLETE IN TP05
      let matches = [{
        id: 0, 
        homeTeam: 'hometeam1', 
        externalTeam: 'extteam1', 
        matchState: MATCH_STATE_UNSETTLED, 
        libelle: 'match n°1',
        date: '10848394343',
        quotation: '3.0'
      },
      {
        id: 1, 
        homeTeam: 'hometeam2', 
        externalTeam: 'extteam2', 
        matchState: MATCH_STATE_UNSETTLED, 
        libelle: 'match n°2',
        date: '1082844384343',
        quotation: '2.0'
      }]
      resolve(matches)
      // YOU CAN USE THIS CODE IF YOU ARE STUCK
      // const matches = []
      // let contractInst = this.state.ContractInstance
      
      // <ici récupération de la taille du tableau>((err, matchsLenght) => {
      
      //   if (err) {
      //     reject("Erreur récupération lenght", err);
      //   }
      
      //   let matchCounter = 0;
      
      //   for (let i = 0; i < matchsLenght; i++) {
      //     <ici récupération du match d'index i dans le smart contract>(i, (err, match) => {
      //       if (err) {
      //         reject("Erreur récupération match", err);
      //       }
      
      //       matches.push({ 
      //         id: match[0].toNumber(), 
      //         homeTeam: match[1], 
      //         externalTeam: match[2], 
      //         matchState: match[3], 
      //         libelle: match[4],
      //         date: match[5].toNumber(),
      //         quotation: match[6].toNumber()
      //        });
      //       if (++matchCounter == matchsLenght) {
      //         resolve(matches);
      //       }
      //     });
      //   }
      // })
      
      
    })
  }

  getBalance(account) {
    new Promise((resolve, reject) => {
      //TO REPLACE IN TP05 BY COMMENTED BLOCK BELOW
      let amount = 10000000000000000
      resolve(amount)
      //   this.web3<insert getBalanceFonction>(account, (error, result) => {
      //   if (error) {
      //     reject(error)
      //   } else {
      //     resolve(<insert fonction to convert result.toNumber()>)
      //   }
      // })
    })
  }

  getCurrentEthereumAccountPubKey() {
    //TO COMPLETE IN TP05
    return "mocked account"
  }

  bet(){

  }
  getBets() {
    //TO COMPLETE IN TP05
    return new Promise((resolve, reject) => {
            let bets = [
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
              }
            ]
            resolve(bets)
         
    })
  }

  startWatchingEvents() {
    //TO COMPLETE IN TP05
    // this.state.eventsFilter = this.state.<insert method to get all events here>({ fromBlock: 0, toBlock: 'latest' })
    // this.state.eventsFilter.<insert method to start watching event here>((error, result) => {
    //   this.eventSubject.next(BetService.printEvent(result))
    // })
  }

  stopWatchingEvents() {
   //TO COMPLETE IN TP05
  }
}


export default BetService
