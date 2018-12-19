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
          {_('recommendations.some_recommendations')}
          <reply payload='see_top_recommendations'>
            {_('recommendations.yes')}
          </reply>
          <reply payload='dont_see_top_recommendations'>
            {_('recommendations.no')}
          </reply>
        </message>
      </messages>
    )
  }
}
