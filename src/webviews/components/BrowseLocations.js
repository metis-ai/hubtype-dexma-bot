import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Button, Alert } from 'reactstrap'
import { SelectMenu, Button as EUIButton } from 'evergreen-ui'
import { BotonicWebview } from '@botonic/react'
import C from '../../constants.js'
import Loading from './Loading.js'

class BrowseLocations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      locations: props ? props.locations || [] : [],
      selectedLocation: [],
      selectedLocationsName: null,
      errorMsg: '',
      button_disabled: false
    }
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  componentDidMount() {
    document.title = 'Dexma | Locations'
    axios({
      method: 'GET',
      url: `${C.dexmaAPIBaseURL}/locations`,
      headers: { 'x-dexcell-token': this.props.context.token },
      timeout: 2000,
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
    if (
      e.response &&
      e.response.data.errors &&
      e.response.data.errors.length > 0
    )
      msg += '\n' + e.response.data.errors[0].message
    this.setState({ errorMsg: msg })
  }

  getSelectedBtnLabel(selectedLocation) {
    const selectedItemsLength = selectedLocation.length
    let selectedNames = ''
    if (selectedItemsLength === 0) {
      selectedNames = ''
    } else if (selectedItemsLength === 1) {
      selectedNames = selectedLocation.toString().split('-')[1]
    }
    return selectedNames
  }
  handleLocationChange(item) {
    const selectedLocation = [String(item.value)]
    this.setState({
      selectedLocation: selectedLocation,
      selectedLocationsName: this.getSelectedBtnLabel(selectedLocation)
    })
  }

  close() {
    this.setState({ button_disabled: true })
    let payload = ''
    if (this.state.errorMsg) {
      payload = 'WEBVIEW_ERROR'
    } else {
      payload = `LOCATION_${this.state.selectedLocation}`
    }
    BotonicWebview.close(this.props.context, payload)
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        <div className='browse-locations'>
          {this.state.errorMsg && (
            <Alert color={'danger'}>{this.state.errorMsg}</Alert>
          )}
          {!this.state.errorMsg && (
            <SelectMenu
              width={'100%'}
              title='Select location'
              options={this.state.locations.map(d => {
                return {
                  label: d.name,
                  value: `${d.id}-${d.name}`
                }
              })}
              selected={this.state.selectedLocation}
              onSelect={this.handleLocationChange}
            >
              <EUIButton ref={input => (this.inputElement = input)}>
                {this.state.selectedLocationsName || 'Select location...'}
              </EUIButton>
            </SelectMenu>
          )}
          {(this.state.selectedLocation.length > 0 || this.state.errorMsg) && (
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
      </div>
    )
  }
}

export default BrowseLocations
