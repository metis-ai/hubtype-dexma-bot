import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    req.context.selected_location_id = req.input.payload.match(
      /^LOCATION_([0-9]+)-(.*)$/
    )[1]
    req.context.selected_location_name = req.input.payload.match(
      /^LOCATION_([0-9]+)-(.*)$/
    )[2]
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('recommendations.selected_location')}{' '}
          {this.props.context.selected_location_name}
          <button
            webview_height_ratio='tall'
            url='/webviews/see_filtered_recommendations'
          >
            {_('recommendations.see_recommendations')}
          </button>
        </message>
      </messages>
    )
  }
}
