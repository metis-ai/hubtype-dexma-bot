import React from 'react'
import axios from 'axios'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Button
} from 'reactstrap'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class SensorDataSummary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      periodsDropdownOpen: false,
      locationsDropdownOpen: false,
      devicesDropdownOpen: false,
      loading: true,
      selectedPeriod: '',
      locations: props ? props.locations || [] : [],
      selectedLocation: '',
      devices: props ? props.devices || [] : [],
      selectedDevice: '',
      stats: null,
      errorMsg: '',
      button_disabled: false
    }

    this.handlePeriodChange = this.handlePeriodChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleDeviceChange = this.handleDeviceChange.bind(this)
    this.togglePeriods = this.togglePeriods.bind(this)
    this.toggleLocations = this.toggleLocations.bind(this)
    this.toggleDevices = this.toggleDevices.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Sensor Data Summary'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/locations`,
      headers: { 'x-dexcell-token': this.props.context.token },
      params: {
        start: 0,
        limit: 500
      }
    })
      .then(res => {
        let l = res.data.filter(e => e.type === 'LEAF' || e.type === 'SECTION')
        this.setState({
          loading: false,
          locations: l
          //locationsDropdownOpen: l.length > 1
        })
        if (l.length === 1) this.handleLocationChange(l[0])
      })
      .catch(e => {
        this.setState({ loading: false })
      })
  }

  handlePeriodChange(period) {
    this.setState({ selectedPeriod: period, errorMsg: null })
  }

  handleLocationChange(location) {
    // this.props.context.token
    this.setState({ selectedLocation: location, errorMsg: null })
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/locations/${location.id}/reference-devices`,
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        console.log(res.data)
        if (res.data && res.data.length > 0) {
          this.setState({
            devices: res.data,
            devicesDropdownOpen: res.data.length > 1
          })
          if (res.data.length === 1) this.handleDeviceChange(res.data[0])
        }
      })
      .catch(e => console.log(e))
  }

  handleDeviceChange(device) {
    this.setState({ selectedDevice: device, errorMsg: null })
    let [parameterKey, _] = Object.entries(C.parameterKeys).find(
      ([k, v]) => v.indexOf(device.type) !== -1
    )
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/readings/`,
      params: {
        from: this.state.selectedPeriod
          .start_date()
          .utc()
          .format()
          .slice(0, -1),
        to: this.state.selectedPeriod
          .end_date()
          .utc()
          .format()
          .slice(0, -1),
        device_id: device.device.id,
        parameter_key: parameterKey,
        resolution: this.state.selectedPeriod.resolution,
        operation: C.operations[parameterKey]
      },
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        let v = res.data.values.reduce((p, c) => p + c.v, 0)
        if (C.operations[parameterKey] === 'AVG') v /= res.data.values.length
        this.setState({
          stats: `${v.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })} ${res.data.units}`
        })
      })
      .catch(err => this.error(err))
  }

  error(e) {
    let msg = String(e)
    if (
      e.response &&
      e.response.data.errors &&
      e.response.data.errors.length > 0
    )
      msg += '\n' + e.response.data.errors[0].message
    this.setState({ errorMsg: msg, stats: null })
  }

  togglePeriods() {
    this.setState(prevState => ({
      periodsDropdownOpen: !prevState.periodsDropdownOpen
    }))
  }

  toggleLocations() {
    this.setState(prevState => ({
      locationsDropdownOpen: !prevState.locationsDropdownOpen
    }))
  }

  toggleDevices() {
    this.setState(prevState => ({
      devicesDropdownOpen: !prevState.devicesDropdownOpen
    }))
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = `SUMMARY_${this.state.selectedPeriod.label}_${
      this.state.selectedLocation.name
    }_${this.state.selectedDevice.type}_${this.state.stats}`
    BotonicWebview.close(this.props.context, payload)
  }

  render() {
    return (
      <div className='check-device'>
        {this.state.loading && <Loading />}
        <div className='sensor-data'>
          <h2>Please, select time period:</h2>
          <Dropdown
            size='lg'
            color='primary'
            isOpen={this.state.periodsDropdownOpen}
            toggle={this.togglePeriods}
          >
            <DropdownToggle color='primary' caret>
              {this.state.selectedPeriod.label || '------'}
            </DropdownToggle>
            <DropdownMenu>
              {C.periods.map((e, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => this.handlePeriodChange(e)}
                >
                  {e.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <h2>Please, select location:</h2>
          <Dropdown
            size='lg'
            color='primary'
            isOpen={this.state.locationsDropdownOpen}
            toggle={this.toggleLocations}
          >
            <DropdownToggle color='primary' caret>
              {this.state.selectedLocation.name || '------'}
            </DropdownToggle>
            <DropdownMenu>
              {this.state.locations.map((e, i) => (
                <DropdownItem
                  key={e.id}
                  onClick={() => this.handleLocationChange(e)}
                >
                  {e.name} {e.id}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <h2
            style={{
              display: this.state.devices.length > 0 ? 'block' : 'none'
            }}
          >
            Please, select device:
          </h2>
          <Dropdown
            size='lg'
            style={{
              display: this.state.devices.length > 0 ? 'block' : 'none'
            }}
            isOpen={this.state.devicesDropdownOpen}
            toggle={this.toggleDevices}
          >
            <DropdownToggle color='primary' caret>
              {this.state.selectedDevice.type || '------'}
            </DropdownToggle>
            <DropdownMenu>
              {this.state.devices.map((e, i) => (
                <DropdownItem
                  key={e.device.id}
                  onClick={() => this.handleDeviceChange(e)}
                >
                  {e.type} {e.device.id}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {this.state.stats ? (
            <Alert color='success'>{this.state.stats}</Alert>
          ) : null}
          {this.state.errorMsg ? (
            <Alert color='danger'>{this.state.errorMsg}</Alert>
          ) : null}
          <Button
            color='info'
            className='close-btn'
            onClick={() => this.close()}
            disabled={this.state.button_disabled}
          >
            Confirm
          </Button>
        </div>
      </div>
    )
  }
}

export default SensorDataSummary
