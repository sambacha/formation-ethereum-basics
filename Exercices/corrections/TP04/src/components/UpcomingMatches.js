import React, { Component } from 'react'


class UpcomingMatches extends Component {
  constructor(props) {
    super(props)
    this.selectedMatchUpdate = this.selectedMatchUpdate.bind(this)
  }



  selectedMatchUpdate(selectedMatch) {
    this.props.callback(selectedMatch)
  }

 

  render() {
    return (
      <div id="next-matches">
        <h2>Upcoming matches</h2>
        <ul>
          {this.props.matchs.map(match => (
            <li key={match.id}>
              <a onClick={() => this.selectedMatchUpdate(match)}>
                <strong>{match.libelle}</strong>
(
                {match.homeTeam}
                {' '}
-
                {' '}
                {match.externalTeam}
)
              </a>

            </li>
          ))}
        </ul>

      </div>
    )
  }
}

export default UpcomingMatches
