import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'
import { default as SomethingElse } from '../something_else'
import { default as SeeTopRecommendations } from './see_top_recommendations'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let subscription = req.input.payload
    let subscribed = false
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let seeTopRecommendationsProps = await SeeTopRecommendations.botonicInit({
      req
    })

    if (subscription == 'subscribe') {
      let res = await axios.post(C.dexmaAPIURL + '/subscriptions', {
        type: 'RECOMMENDATION',
        user_id: req.context.user_id,
        deployment_id: req.context.account_id,
        meta_info: {
          hubtype_id: req.context.bot.id
        }
      })
      req.context.recommendations_subs_id = res.data.id
      subscribed = true
    } else {
      let res = await axios.delete(
        `${C.dexmaAPIURL}/subscriptions/${req.context.recommendations_subs_id}`
      )
      subscribed = false
    }

    return {
      req: req.input.payload,
      subscribed: subscribed,
      somethingElseProps: somethingElseProps,
      seeTopRecommendationsProps: seeTopRecommendationsProps
    }
  }

  render() {
    if (this.props.subscribed) {
      return (
        <messages>
          <message type='text'>
            {_('recommendations.you_have_been_subscribed')}
          </message>
          <message type='text'>
            {_('recommendations.you_will_receive_notifications')}
          </message>
          <SeeTopRecommendations {...this.props.seeTopRecommendationsProps} />
        </messages>
      )
    } else {
      return (
        <messages>
          <message type='text'>
            {_('recommendations.you_have_been_unsubscribed')}
          </message>
          <SomethingElse {...this.props.somethingElseProps} />
        </messages>
      )
    }
  }
}
