import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as Browse } from './want_to_browse_recommendations'
import C from '../../constants.js'
import axios from 'axios'

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
    let tr = req.input.payload //user wants or not top recommendations
    let browseProps = await Browse.botonicInit({ req })
    var res = null
    var with_payback = null
    var without_payback = null

    if (tr === 'see_top_recommendations') {
      //POST https://protypo.pre.enerapp.com/subscriptions

      res = await axios({
        method: 'GET',
        url: `${C.dexmaAPIURL}/recommendations/top`,
        params: {
          user_id: req.context.user_id
        }
      })

      with_payback = res.data
        .filter(e => e.payback)
        .sort((a, b) => a.payback - b.payback)
      without_payback = res.data
        .filter(e => !e.payback)
        .sort((a, b) => b.energy_savings_annual - a.energy_savings_annual)
    }

    return {
      with_payback: with_payback,
      without_payback: without_payback,
      browseProps: browseProps,
      top_recommendations: tr
    }
  }

  render() {
    if (this.props.top_recommendations === 'see_top_recommendations') {
      return (
        <messages>
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
          <Browse {...this.props.browseProps} />
        </messages>
      )
    } else {
      return (
        <messages>
          <message type='text'>Okay! So...</message>
          <Browse {...this.props.browseProps} />
        </messages>
      )
    }
  }
}
