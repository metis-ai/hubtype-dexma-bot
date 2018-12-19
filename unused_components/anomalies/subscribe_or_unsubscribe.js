import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let subscription = ''
    let url = `${C.dexmaAPIURL}/subscriptions`
    let res = await axios({
      method: 'GET',
      url: url
    })

    if (
      res.data.filter(
        o => o.type === 'ANOMALIES' && o.user_id === req.context.user_id
      ).length > 0
    ) {
      subscription = 'subscribed'
    } else {
      subscription = 'unsubscribed'
    }

    return { subscription: subscription }
  }

  render() {
    if (this.props.subscription === 'unsubscribed') {
      return (
        <messages>
          <message type='text'>
            {_('anomalies.subscribe')}
            <reply payload='subscribe'>{_('anomalies.yes')}</reply>
            <reply payload={`no_action_${this.props.subscription}`}>
              {_('anomalies.no')}
            </reply>
          </message>
        </messages>
      )
    } else {
      return (
        <messages>
          <message type='text'>
            {_('anomalies.unsubscribe')}
            <reply payload='unsubscribe'>{_('anomalies.yes')}</reply>
            <reply payload={`no_action_${this.props.subscription}`}>
              {_('anomalies.no')}
            </reply>
          </message>
        </messages>
      )
    }
  }
}
