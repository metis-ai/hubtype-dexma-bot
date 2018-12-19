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
          {_('recommendations.want_to_browse')}
          <reply payload='browse_locations'>{_('recommendations.yes')}</reply>
          <reply payload='dont_browse_locations'>
            {_('recommendations.no')}
          </reply>
        </message>
      </messages>
    )
  }
}
