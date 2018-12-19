import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import ContractExpiration from './components/ContractExpiration.js'
import LeagueTable from './components/LeagueTables.js'
import RecommendationsBrowse from './components/RecommendationsBrowse.js'
import AnomaliesBrowse from './components/AnomaliesBrowse.js'
import BrowseLocations from './components/BrowseLocations.js'
import BrowseDevices from './components/BrowseDevices.js'

import './styles.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    var url_string = window.location.href
    var url = new URL(url_string)
    var context = JSON.parse(url.searchParams.get('context'))

    this.state = {
      context: context
    }
  }

  render() {
    return (
      <React.Fragment>
        <Route
          path='/browse_locations'
          render={() => <BrowseLocations context={this.state.context} />}
        />
        <Route
          path='/browse_devices'
          render={() => <BrowseDevices context={this.state.context} />}
        />
        <Route
          path='/contract_expiration'
          render={() => <ContractExpiration context={this.state.context} />}
        />
        <Route
          path='/league_table'
          render={() => <LeagueTable context={this.state.context} />}
        />
        <Route
          path='/see_filtered_recommendations'
          render={() => <RecommendationsBrowse context={this.state.context} />}
        />
        <Route
          path='/see_filtered_anomalies'
          render={() => <AnomaliesBrowse context={this.state.context} />}
        />
      </React.Fragment>
    )
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
