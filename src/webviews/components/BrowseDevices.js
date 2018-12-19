import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Alert, Button } from 'reactstrap'
import { SelectMenu, Button as EUIButton } from 'evergreen-ui'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class BrowseDevices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      devices: props ? props.devices || [] : [],
      selectedDevices: [],
      selectedDevicesNames: null,
      stats: null,
      errorMsg: '',
      button_disabled: false
    }
    this.handleDeviceSelect = this.handleDeviceSelect.bind(this)
    this.handleDeviceUnselect = this.handleDeviceUnselect.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Devices'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/locations/${
        this.props.context.selected_location_id
      }/reference-devices`,
      timeout: 2000,
      headers: { 'x-dexcell-token': this.props.context.token }
    })
      .then(res => {
        this.setState({
          loading: false,
          devices: res.data
        })
        const domNode = ReactDOM.findDOMNode(this.inputElement)
        domNode.click()
      })
      .catch(e => {
        this.error(e)
        this.setState({ loading: false })
      })
  }

  error(e) {
    let msg = String(e)
    console.log(msg)
    if (
      e.response &&
      e.response.data.errors &&
      e.response.data.errors.length > 0
    ) {
      msg += e.response.data.message
    }
    this.setState({ errorMsg: msg })
  }
  getSelectedBtnLabel(selectedDevices) {
    const selectedItemsLength = selectedDevices.length
    let selectedNames = ''
    if (selectedItemsLength === 0) {
      selectedNames = ''
    } else if (selectedItemsLength === 1) {
      selectedNames = selectedDevices.toString().split('-')[1]
    } else if (selectedItemsLength > 1) {
      selectedNames = selectedItemsLength.toString() + ' selected...'
    }
    return selectedNames
  }
  handleDeviceSelect(item) {
    const selectedDevices = [...this.state.selectedDevices, String(item.value)]
    this.setState({
      selectedDevices: selectedDevices,
      selectedDevicesNames: this.getSelectedBtnLabel(selectedDevices)
    })
  }

  handleDeviceUnselect(item) {
    const deselectedItemIndex = this.state.selectedDevices.indexOf(item.value)
    const selectedDevices = this.state.selectedDevices.filter(
      (_item, i) => i !== deselectedItemIndex
    )
    this.setState({
      selectedDevices: selectedDevices,
      selectedDevicesNames: this.getSelectedBtnLabel(selectedDevices)
    })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = ''
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = `DEVICE_`
      for (var i = 0; i < this.state.selectedDevices.length; i++) {
        payload += this.state.selectedDevices[i] + ':'
      }
      payload = payload.substring(0, payload.length - 1)
    }
    BotonicWebview.close(this.props.context, payload)
  }

  render() {
    return (
      <div className='browse-devices'>
        {this.state.loading && <Loading />}
        {this.state.errorMsg ? (
          <Alert color='danger'>{this.state.errorMsg}</Alert>
        ) : (
          <SelectMenu
            isMultiSelect
            width={'100%'}
            title='Select devices'
            options={this.state.devices.map(d => {
              return {
                label: d.type,
                value: `${d.device.id}-${d.type}`
              }
            })}
            selected={this.state.selectedDevices}
            onSelect={this.handleDeviceSelect}
            onDeselect={this.handleDeviceUnselect}
          >
            <EUIButton ref={input => (this.inputElement = input)}>
              {this.state.selectedDevicesNames || 'Select devices...'}
            </EUIButton>
          </SelectMenu>
        )}
        {(this.state.selectedDevices.length > 0 || this.state.errorMsg) && (
          <Button
            color='info'
            className='close-btn'
            onClick={() => this.close()}
            disabled={this.state.button_disabled}
          >
            {this.state.errorMsg ? 'Return' : 'Confirm'}
          </Button>
        )}
      </div>
    )
  }
}

export default BrowseDevices
