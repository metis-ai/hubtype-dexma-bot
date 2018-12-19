import React from 'react'
import axios from 'axios'
import moment from 'moment'
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

class CheckDevice extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locationsDropdownOpen: false,
      devicesDropdownOpen: false,
      loading: true,
      locations: props ? props.locations || [] : [],
      selectedLocation: '',
      devices: props ? props.devices || [] : [],
      selectedDevice: '',
      lastMeasure: null,
      errorMsg: ''
    }

    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleDeviceChange = this.handleDeviceChange.bind(this)
    this.toggleLocations = this.toggleLocations.bind(this)
    this.toggleDevices = this.toggleDevices.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Check Device'
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
          locations: l,
          locationsDropdownOpen: l.length > 1
        })
        if (l.length === 1) this.handleLocationChange(l[0])
      })
      .catch(e => {
        this.setState({ loading: false })
      })
  }

  handleLocationChange(location) {
    this.setState({ selectedLocation: location, errorMsg: null })
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/locations/${location.id}/reference-devices`,
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
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
    let deviceType = this.state.devices.find(
      d => d.device.id === parseInt(device.device.id)
    ).type
    let [parameterKey, _] = Object.entries(C.parameterKeys).find(
      ([k, v]) => v.indexOf(deviceType) !== -1
    )
    axios({
      method: 'GET',
      url: `${
        C.dexmaAPIBaseURL
      }/parameters/${parameterKey}/resolutions?device_id=${device.device.id}`,
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        let r = ['B', 'FM', 'TM', 'QH', 'HH', 'H', 'D', 'W', 'M']
        let resolution = res.data[0].raw_resolutions[0]
        res.data[0].raw_resolutions.forEach(
          raw_res =>
            (resolution =
              r.indexOf(raw_res) < r.indexOf(resolution) ? raw_res : resolution)
        )
        axios({
          method: 'GET',
          url: `${C.dexmaAPIBaseURL}/readings/`,
          params: {
            from: moment()
              .subtract(24, 'hours')
              .utc()
              .format()
              .slice(0, -1),
            to: moment()
              .utc()
              .format()
              .slice(0, -1),
            device_id: device.device.id,
            parameter_key: parameterKey,
            resolution: resolution
          },
          headers: { 'x-dexcell-token': this.props.context.token }
        })
          .then(res => {
            if (res.data.values && res.data.values.length > 0) {
              let last = res.data.values.slice(-1).pop()
              last.time = moment(last.ts)
              this.setState({ lastMeasure: last })
            } else {
              this.setState({ lastMeasure: -1 })
            }
          })
          .catch(err => this.error(err))
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
    this.setState({ errorMsg: msg, lastMeasure: null })
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
    BotonicWebview.close()
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        <div className='check-device'>
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
          {this.state.lastMeasure === -1 ? (
            <Alert color='warning'>Without data within the last 24 hours</Alert>
          ) : null}
          {this.state.lastMeasure && this.state.lastMeasure.time ? (
            <Alert color='success'>
              With data, last time was {this.state.lastMeasure.time.fromNow()}
            </Alert>
          ) : null}
          {this.state.errorMsg ? (
            <Alert color='danger'>{this.state.errorMsg}</Alert>
          ) : null}
          <Button
            color='info'
            className='close-btn'
            onClick={() => this.close()}
          >
            Close
          </Button>
        </div>
      </div>
    )
  }
}

export default CheckDevice
