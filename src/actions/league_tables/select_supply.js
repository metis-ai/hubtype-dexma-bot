import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    req.context.selected_period = req.input.payload
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('league_tables.supply.which_supply')}
          <reply payload='main_supply'>Main Supply</reply>
        </message>
      </messages>
    )
  }
}
