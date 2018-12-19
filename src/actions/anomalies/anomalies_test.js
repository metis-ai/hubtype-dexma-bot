import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('anomalies.please_select_location')}
          <button webview_height_ratio='tall' url='/webviews/browse_locations'>
            {_('anomalies.location.select_location')}
          </button>
        </message>
      </messages>
    )
  }
}
