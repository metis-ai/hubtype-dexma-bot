import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'
import { default as SomethingElse } from '../something_else'
import { default as SeeAnomalies } from './see_anomalies'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let subscription = req.input.payload
    let subscribed = false
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let seeAnomaliesProps = await SeeAnomalies.botonicInit({ req })

    if (subscription == 'subscribe') {
      let res = await axios.post(C.dexmaAPIURL + '/subscriptions', {
        type: 'ANOMALIES',
        user_id: req.context.user_id,
        deployment_id: req.context.account_id,
        meta_info: {
          hubtype_id: req.context.bot.id
        }
      })
      req.context.anomalies_subs_id = res.data.id
      subscribed = true
    } else {
      let res = await axios.delete(
        `${C.dexmaAPIURL}/subscriptions/${req.context.anomalies_subs_id}`
      )
      subscribed = false
    }

    return {
      subscribed: subscribed,
      somethingElseProps: somethingElseProps,
      seeAnomaliesProps: seeAnomaliesProps
    }
  }

  render() {
    if (this.props.subscribed) {
      return (
        <messages>
          <message type='text'>
            {_('anomalies.you_have_been_subscribed')}
          </message>
          <message type='text'>
            {_('anomalies.you_will_receive_notifications')}
          </message>
          <SeeAnomalies {...this.props.seeAnomaliesProps} />
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
