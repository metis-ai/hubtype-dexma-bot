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
        o => o.type === 'RECOMMENDATION' && o.user_id === req.context.user_id
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
            {_('recommendations.subscribe')}
            <reply payload='subscribe'>{_('recommendations.yes')}</reply>
            <reply payload={`no_action_${this.props.subscription}`}>
              {_('recommendations.no')}
            </reply>
          </message>
        </messages>
      )
    } else if (this.props.subscription === 'subscribed') {
      return (
        <messages>
          <message type='text'>
            {_('recommendations.unsubscribe')}
            <reply payload='unsubscribe'>{_('recommendations.yes')}</reply>
            <reply payload={`no_action_${this.props.subscription}`}>
              {_('recommendations.no')}
            </reply>
          </message>
        </messages>
      )
    }
  }
}
