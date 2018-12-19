import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as InvokeWebview } from '../components/InvokeWebview'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let selected_location = req.input.payload.match(/^LOCATION_([0-9]+)-(.*)$/)
    req.context.selected_location_id = selected_location[1]
    req.context.selected_location_name = selected_location[2]
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('sensor_data.device.selected_location')}{' '}
          {this.props.context.selected_location_name}
        </message>
        <InvokeWebview
          text={_('sensor_data.device.which_device')}
          webview_height_ratio={'tall'}
          webview_url={'/webviews/browse_devices'}
          button={_('sensor_data.device.select_device')}
        />
      </messages>
    )
  }
}
