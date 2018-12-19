import React from 'react'
import axios from 'axios'
import { Button, ButtonGroup, Table, Alert } from 'reactstrap'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class AnomaliesBrowse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      anomalies: props ? props.results || [] : [],
      selected_location_name: this.props.context.selected_location_name,
      selected_location_id: this.props.context.selected_location_id,
      selected_option: 'Good',
      dexma_user: this.props.context.user_id,
      errorMsg: '',
      button_disabled: false
    }
    this.handleSelectedOption = this.handleSelectedOption.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Anomalies'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIURL}/anomalies/`,
      timeout: 2000,
      params: {
        user_id: this.state.dexma_user,
        location_id: this.state.selected_location_id
      },
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        var data = res.data
        data.sort((a, b) => a.value - b.value)
        this.setState({
          loading: false,
          anomalies: data
        })
      })
      .catch(e => {
        this.error(e)
        this.setState({ loading: false })
      })
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

  handleSelectedOption(selected_option) {
    if (selected_option.label === 'Bad') {
      this.state.anomalies.sort((a, b) => b.value - a.value)
    }
    if (selected_option.label === 'Good') {
      this.state.anomalies.sort((a, b) => a.value - b.value)
    }
    this.setState({
      selected_option: selected_option.label,
      anomalies: this.state.anomalies
    })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = null
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = 'anomalies_closed'
    }
    BotonicWebview.close(this.props.context, payload)
  }

  render_table() {
    if (!this.state.anomalies || this.state.anomalies.length === 0) {
      return (
        (this.state.errorMsg || this.state.anomalies.length === 0) && (
          <Alert color='danger'>
            {this.state.errorMsg ? this.state.errorMsg : 'No Data Available'}
          </Alert>
        )
      )
    }
    let r
    if (this.state.selected_option === 'Good') {
      r = this.state.anomalies.sort((a, b) => a.value - b.value)
    } else {
      r = this.state.anomalies.sort((a, b) => b.value - a.value)
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Ref. Device</th>
            <th>Location</th>
            <th>From</th>
            <th>To</th>
            <th>Hours</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {r.map((o, i) => (
            <tr key={i}>
              <th scope='row'>{i + 1}</th>
              <td>{o.type}</td>
              <td>{o.reference_device}</td>
              <td>{o.location_name}</td>
              <td>{o.from}</td>
              <td>{o.to}</td>
              <td>{`${o.hours_duration}h`}</td>
              <td>{`${o.value.toFixed(2)} kWh`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <div className='anomalies-browse'>
        {this.state.loading && <Loading />}
        <div>
          <h2>
            {this.state.selected_option} Anomalies for Location{' '}
            {this.state.selected_location_name}
          </h2>
          <ButtonGroup>
            {C.anomalies_options.map((e, i) => (
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

export default AnomaliesBrowse
