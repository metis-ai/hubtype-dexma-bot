import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as InvokeWebview } from '../components/InvokeWebview'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
  }

  render() {
    return (
      <InvokeWebview
        text={_('check_device.location.which_location')}
        webview_height_ratio={'tall'}
        webview_url={'/webviews/browse_locations'}
        button={_('check_device.location.select_location')}
      />
    )
  }
}
