import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('anomalies.some_anomalies')}
          <reply payload='see_anomalies'>{_('anomalies.yes')}</reply>
          <reply payload='dont_see_anomalies'>{_('anomalies.no')}</reply>
        </message>
      </messages>
    )
  }
}
