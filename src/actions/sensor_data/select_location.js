import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as InvokeWebview } from '../components/InvokeWebview'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    req.context.selected_period = req.input.payload
  }

  render() {
    return (
      <InvokeWebview
        text={_('sensor_data.location.which_location')}
        webview_height_ratio={'tall'}
        webview_url={'/webviews/browse_locations'}
        button={_('sensor_data.location.select_location')}
      />
    )
  }
}
