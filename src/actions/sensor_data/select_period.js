import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as QuickReplies } from '../components/QuickReplies'
import C from '../../constants.js'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
  }

  render() {
    return (
      <QuickReplies
        text={_('sensor_data.period.which_period')}
        buttons={C.periods}
      />
    )
  }
}
