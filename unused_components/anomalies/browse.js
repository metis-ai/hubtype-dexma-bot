import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let wants_to_browse = req.input.payload
    return {
      wants_to_browse: wants_to_browse,
      somethingElseProps: somethingElseProps
    }
  }

  render() {
    if (this.props.wants_to_browse === 'browse_locations') {
      return (
        <messages>
          <message type='text'>
            {_('anomalies.please_select_location')}
            <button
              webview_height_ratio='full'
              url='/webviews/anomalies_location'
            >
              {_('anomalies.location.select_location')}
            </button>
          </message>
        </messages>
      )
    } else {
      return <SomethingElse {...this.props.somethingElseProps} />
    }
  }
}
