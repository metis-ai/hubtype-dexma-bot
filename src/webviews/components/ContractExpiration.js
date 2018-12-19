import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Alert, Button, ButtonGroup, Table } from 'reactstrap'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

function sort_expiration_dates(a, b, flag) {
  if (flag === 'asc') return moment(a.to) - moment(b.to)
  if (flag === 'desc') return moment(b.to) - moment(a.to)
}

class ContractExpiration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      contracts: props ? props.contracts || [] : [],
      selected_option: '',
      errorMsg: '',
      button_disabled: false
    }
    this.handleSelectedOption = this.handleSelectedOption.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Contracts'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/utility/contracts/electricity`,
      timeout: 2000,
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        let c = res.data
        c = c.sort((a, b) => sort_expiration_dates(a, b, 'asc'))
        this.setState({
          loading: false,
          contracts: c,
          selected_option: C.contract_options[1]
        })
      })
      .catch(e => {
        this.error(e)
        this.setState({ loading: false })
      })
  }

  handleSelectedOption(selected_option) {
    this.setState({ selected_option: selected_option })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = null
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = 'contract_expiration_closed'
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

  check_validation(expiration_date) {
    if (moment().isBefore(expiration_date)) {
      if (moment(expiration_date).isBefore(moment().add(90, 'days'))) {
        return (
          <td bgcolor={C.contract_expiration.expirations.expire_soon.color}>
            {C.contract_expiration.expirations.expire_soon.copy.replace(
              '{expiration_date}',
              expiration_date.format(C.contract_expiration.date_format)
            )}
          </td>
        )
      } else {
        return (
          <td bgcolor={C.contract_expiration.expirations.valid.color}>
            {C.contract_expiration.expirations.valid.copy}
          </td>
        )
      }
    } else {
      return (
        <td bgcolor={C.contract_expiration.expirations.expired.color}>
          {C.contract_expiration.expirations.expired.copy.replace(
            '{expiration_date}',
            expiration_date.format(C.contract_expiration.date_format)
          )}
        </td>
      )
    }
  }

  render_table() {
    var c = this.state.contracts
    var option = this.state.selected_option
    if (!c || c.length === 0) {
      return <Alert color='danger'>{this.state.errorMsg}</Alert>
    }
    switch (option) {
      case option:
        if (!c.length || !option.filter_method) {
          break
        }
        c = c.filter(option.filter_method)
        break
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Key</th>
            <th>Expiration</th>
          </tr>
        </thead>
        <tbody>
          {c.map((o, i) => (
            <tr key={i}>
              <th scope='row'>{i + 1}</th>
              <td>{o.name}</td>
              <td>{o.key}</td>
              {this.check_validation(moment(o.to))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <div className='contract-expiration'>
        {this.state.loading && <Loading />}
        <div>
          <h2>{this.state.selected_option.label} Contracts</h2>

          <ButtonGroup>
            {C.contract_options.map((e, i) => (
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

export default ContractExpiration
