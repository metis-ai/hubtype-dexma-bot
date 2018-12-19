import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'
import { default as SomethingElse } from '../something_else'
import { default as Errors } from '../error.js'

function replaceInformation(msg, obj, hasPayback) {
  msg = msg.replace('energySavingsAnnual', obj.energy_savings_annual.toFixed(2))
  msg = msg.replace('LocationName', obj.location_name)
  msg = msg.replace('Retrofit', obj.retrofit)
  msg = msg.replace('Resource', obj.energy_source)
  if (hasPayback) {
    msg = msg.replace('payback', obj.payback.toFixed(2))
  }
  return msg
}

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let errors = false
    let subscription = await axios
      .post(C.dexmaAPIURL + '/subscriptions', {
        type: 'RECOMMENDATION',
        timeout: 2000,
        user_id: req.context.user_id,
        deployment_id: req.context.account_id,
        meta_info: {
          hubtype_id: req.context.bot.id
        }
      })
      .then(subscription => {
        req.context.recommendations_subs_id = subscription.data.id
        req.context.subscribed_to_recommendations = true
      })
      .catch(e => (errors = true))

    let with_payback = null
    let without_payback = null

    let recommendations = await axios({
      method: 'GET',
      url: `${C.dexmaAPIURL}/recommendations/top`,
      timeout: 3000,
      params: {
        user_id: req.context.user_id
      }
    })
      .then(recommendations => {
        with_payback = recommendations.data
          .filter(e => e.payback)
          .sort((a, b) => a.payback - b.payback)
        without_payback = recommendations.data
          .filter(e => !e.payback)
          .sort((a, b) => b.energy_savings_annual - a.energy_savings_annual)
      })
      .catch(e => (errors = true))

    return {
      errors: errors,
      with_payback: with_payback,
      without_payback: without_payback,
      somethingElseProps: somethingElseProps
    }
  }

  render() {
    if (this.props.errors) {
      return <Errors />
    } else {
      return (
        <messages>
          <message type='text'>
            {_('recommendations.you_have_been_subscribed')}
          </message>
          <message type='text'>
            {_('recommendations.you_will_receive_notifications')}
          </message>

          <message type='text'>
            {_('recommendations.recommendations_with_payback_msg')}
          </message>
          {this.props.with_payback.map((e, i) => (
            <message type='text' key={i}>
              {replaceInformation(
                _('recommendations.recommendations_with_payback'),
                e,
                true
              )}
            </message>
          ))}
          <message type='text'>
            {_('recommendations.recommendations_without_payback_msg')}
          </message>
          {this.props.without_payback.map((e, i) => (
            <message type='text' key={i}>
              {replaceInformation(
                _('recommendations.recommendations_without_payback'),
                e,
                false
              )}
            </message>
          ))}
          <message type='text'>
            {_('recommendations.want_to_browse')}
            <reply payload='browse_recommendations_locations'>
              {_('recommendations.yes')}
            </reply>
            <reply payload='dont_browse_recommendations_locations'>
              {_('recommendations.no')}
            </reply>
          </message>
        </messages>
      )
    }
  }
}
