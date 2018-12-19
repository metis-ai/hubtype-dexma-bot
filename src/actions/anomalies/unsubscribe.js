import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'
import { default as SomethingElse } from '../something_else'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let errors = false
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let res = await axios
      .delete(
        `${C.dexmaAPIURL}/subscriptions/${req.context.anomalies_subs_id}`,
        { timeout: 2000 }
      )
      .then(() => (req.context.subscribed_to_anomalies = false))
      .catch(e => (errors = true))
    return {
      errors: errors,
      somethingElseProps: somethingElseProps
    }
  }

  render() {
    if (this.props.errors) {
      return (
        <messages>
          <message type='text'>An error ocurred during unsubscription.</message>
          <message type='text'>Please, retry it later.</message>
          <SomethingElse {...this.props.somethingElseProps} />
        </messages>
      )
    } else {
      return (
        <messages>
          <message type='text'>
            {_('anomalies.you_have_been_unsubscribed')}
          </message>
          <SomethingElse {...this.props.somethingElseProps} />
        </messages>
      )
    }
  }
}
