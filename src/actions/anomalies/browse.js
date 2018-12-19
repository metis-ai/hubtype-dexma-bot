import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'
import { default as InvokeWebview } from '../components/InvokeWebview'

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
    if (this.props.wants_to_browse === 'browse_anomalies_locations') {
      return (
        <InvokeWebview
          text={_('anomalies.please_select_location')}
          webview_height_ratio={'tall'}
          webview_url={'/webviews/browse_locations'}
          button={_('anomalies.location.select_location')}
        />
      )
    } else {
      return <SomethingElse {...this.props.somethingElseProps} />
    }
  }
}
