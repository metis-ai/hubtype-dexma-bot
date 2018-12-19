import React from 'react'
import axios from 'axios'
import { Button, ButtonGroup, Table, Alert } from 'reactstrap'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class RecommendationsBrowse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      recommendations: props ? props.results || [] : [],
      selected_location_name: this.props.context.selected_location_name,
      selected_location_id: this.props.context.selected_location_id,
      selected_option: 'Payback',
      dexma_user: this.props.context.user_id,
      errorMsg: '',
      button_disabled: false
    }
    this.handleSelectedOption = this.handleSelectedOption.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Recommendations'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIURL}/recommendations/`,
      timeout: 2000,
      params: {
        user_id: this.state.dexma_user,
        location_id: this.state.selected_location_id
      },
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        var data = res.data
        data.sort((a, b) => a.payback - b.payback)
        this.setState({
          loading: false,
          recommendations: data
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
    if (selected_option.label === 'Energy Savings') {
      this.state.recommendations.sort(
        (a, b) => b.energy_savings_annual - a.energy_savings_annual
      )
    }
    if (selected_option.label === 'Payback') {
      this.state.recommendations.sort((a, b) => a.payback - b.payback)
    }
    this.setState({
      selected_option: selected_option.label,
      recommendations: this.state.recommendations
    })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = null
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = 'recommendations_closed'
    }
    BotonicWebview.close(this.props.context, payload)
  }

  render_table() {
    if (
      !this.state.recommendations ||
      this.state.recommendations.length === 0
    ) {
      return (
        (this.state.errorMsg || this.state.recommendations.length === 0) && (
          <Alert color='danger'>
            {this.state.errorMsg ? this.state.errorMsg : 'No Data Available'}
          </Alert>
        )
      )
    }
    let r
    if (this.state.selected_option === 'Payback') {
      r = this.state.recommendations.sort((a, b) => a.payback - b.payback)
    } else {
      r = this.state.recommendations.sort(
        (a, b) => b.energy_savings_annual - a.energy_savings_annual
      )
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Retrofit</th>
            <th>Resource</th>
            <th>Energy Savings (kWh/year)</th>
            <th>Payback (year)</th>
          </tr>
        </thead>
        <tbody>
          {r.map((o, i) => (
            <tr key={i}>
              <th scope='row'>{i + 1}</th>
              <td>{o.retrofit}</td>
              <td>{o.energy_source}</td>
              <td>{o.energy_savings_annual.toFixed(2)}</td>
              <td>{o.payback.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <div className='recommendations-browse'>
        {this.state.loading && <Loading />}
        <div>
          <h2>
            Recommendations for Location {this.state.selected_location_name}{' '}
            requiring{' '}
            {this.state.selected_option == 'Payback'
              ? 'Investment'
              : 'No Investment'}
          </h2>
          <ButtonGroup>
            {C.recommendations_options.map((e, i) => (
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

export default RecommendationsBrowse
