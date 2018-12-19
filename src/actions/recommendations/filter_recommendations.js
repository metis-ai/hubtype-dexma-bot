import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as InvokeWebview } from '../components/InvokeWebview'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let location = req.input.payload.match(/^LOCATION_([0-9]+)-(.*)$/)
    req.context.selected_location_id = location[1]
    req.context.selected_location_name = location[2]
  }

  render() {
    return (
      <InvokeWebview
        text={`${_('recommendations.selected_location')} ${
          this.props.context.selected_location_name
        }`}
        webview_height_ratio={'tall'}
        webview_url={'/webviews/see_filtered_recommendations'}
        button={_('recommendations.see_recommendations')}
      />
    )
  }
}
