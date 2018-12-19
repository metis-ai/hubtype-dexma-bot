import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../../constants'
import { default as SomethingElse } from '../something_else'
import { default as Errors } from '../error.js'

function format_string(o) {
  return `${o.from}-${o.to} (${o.hours_duration}h) ${o.reference_device} (${
    o.location_name
  }): ${o.value.toFixed(2)} kWh`
}

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let errors = false
    let subscription = await axios
      .post(C.dexmaAPIURL + '/subscriptions', {
        type: 'ANOMALIES',
        timeout: 2000,
        user_id: req.context.user_id,
        deployment_id: req.context.account_id,
        meta_info: {
          hubtype_id: req.context.bot.id
        }
      })
      .then(subscription => {
        req.context.anomalies_subs_id = subscription.data.id
        req.context.subscribed_to_anomalies = true
      })
      .catch(e => (errors = true))

    let good = null
    let bad = null

    let res = await axios({
      method: 'GET',
      url: `${C.dexmaAPIURL}/anomalies/top`,
      timeout: 2000,
      params: {
        user_id: req.context.user_id
      }
    })
      .then(res => {
        let results = res.data.sort((a, b) => a.value - b.value)
        good = results.slice(0, 3) //already sorted
        bad = results.slice(3, 6).sort((a, b) => b.value - a.value)
      })
      .catch(e => (errors = true))

    return {
      errors: errors,
      good: good,
      bad: bad,
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
            {_('anomalies.you_have_been_subscribed')}
          </message>
          <message type='text'>
            {_('anomalies.you_will_receive_notifications')}
          </message>
          <message type='text'>{_('anomalies.anomalies_good_msg')}</message>
          {this.props.good.map((e, i) => (
            <message type='text' key={i + 1}>
              {`${i + 1} - ` + format_string(e)}
            </message>
          ))}
          <message type='text'>{_('anomalies.anomalies_bad_msg')}</message>
          {this.props.bad.map((e, i) => (
            <message type='text' key={i + 1}>
              {`${i + 1} - ` + format_string(e)}
            </message>
          ))}
          <message type='text'>
            {_('anomalies.want_to_browse')}
            <reply payload='browse_anomalies_locations'>
              {_('anomalies.yes')}
            </reply>
            <reply payload='dont_browse_anomalies_locations'>
              {_('anomalies.no')}
            </reply>
          </message>
        </messages>
      )
    }
  }
}
