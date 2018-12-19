import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button, ButtonGroup, Table, Alert } from 'reactstrap'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class LeagueTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      best_results: props ? props.results || [] : [],
      worst_results: props ? props.results || [] : [],
      selected_option: 'BEST',
      errorMsg: '',
      button_disabled: false,
      period: C.periods.filter(
        p => p.label === this.props.context.selected_period
      )[0]
    }
    this.handleSelectedOption = this.handleSelectedOption.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | League Tables'
    axios({
      method: 'GET',
      timeout: 2000,
      url: `${C.dexmaAPIBaseURL}/locations/league-table`,
      params: {
        from: moment(this.state.period.start_date).format('YYYY-MM-DD'),
        to: moment(this.state.period.end_date).format('YYYY-MM-DD'),
        order_by: 'BEST'
      },
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        this.setState({ loading: false, best_results: res.data })
        this.setState({
          loading: false,
          bestThree: [
            this.state.best_results[0],
            this.state.best_results[1],
            this.state.best_results[2]
          ]
        })
      })
      .catch(e => {
        this.error(e)
        this.setState({ loading: false })
      })
    axios({
      method: 'GET',
      timeout: 2000,
      url: `${C.dexmaAPIBaseURL}/locations/league-table`,
      params: {
        from: moment(this.state.period.start_date).format('YYYY-MM-DD'),
        to: moment(this.state.period.end_date).format('YYYY-MM-DD'),
        order_by: 'BEST'
      },
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        let results = res.data.sort((a, b) => b.value - a.value)
        this.setState({ loading: false, worst_results: results })
        this.setState({
          loading: false,
          worstThree: [
            this.state.worst_results[0],
            this.state.worst_results[1],
            this.state.worst_results[2]
          ]
        })
      })
      .catch(e => {
        this.error(e)
        this.setState({ loading: false })
      })
  }

  handleSelectedOption(selected_option) {
    this.setState({
      selected_option: selected_option.label
    })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = null
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = `LEAGUERESULTS_${JSON.stringify(
        this.state.bestThree
      )}_${JSON.stringify(this.state.worstThree)}`
    }
    BotonicWebview.close(this.props.context, payload)
  }

  error(e) {
    let msg = String(e)
    if (
      e.response &&
      e.response.data.errors &&
      e.response.data.errors.length > 0
    )
      msg += '\n' + e.response.data.errors[0].message
    this.setState({ errorMsg: msg })
  }

  render_table() {
    if (
      !this.state.best_results ||
      this.state.best_results.length === 0 ||
      !this.state.worst_results ||
      this.state.worst_results.length === 0
    ) {
      return (
        this.state.errorMsg && (
          <Alert color='danger'>{this.state.errorMsg}</Alert>
        )
      )
    }
    let c
    if (this.state.selected_option === 'BEST') {
      c = this.state.best_results
    } else {
      c = this.state.worst_results
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {c.map((o, i) => (
            <tr key={i}>
              <th scope='row'>{i + 1}</th>
              <td>{o.name}</td>
              <td>{o.value}</td>
              <td>{o.units}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <div className='league-tables'>
        {this.state.loading && <Loading />}
        <div>
          <h2>{this.state.selected_option} League Table</h2>
          <ButtonGroup>
            {C.league_table_options.map((e, i) => (
              <Button
                key={i}
                color={e.color}
                onClick={() => this.handleSelectedOption(e)}
              >
                {e.label}
              </Button>
            ))}
          </ButtonGroup>
          {this.render_table()}
          <Button
            color='info'
            className='close-btn'
            onClick={() => this.close()}
            disabled={this.state.button_disabled}
          >
            {this.state.errorMsg ? 'Return' : 'Close'}
          </Button>
        </div>
      </div>
    )
  }
}

export default LeagueTables
