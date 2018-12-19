import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as Browse } from './want_to_browse_anomalies'
import C from '../../constants.js'
import axios from 'axios'

function format_string(o) {
  return `${o.from}-${o.to} (${o.hours_duration}h) ${o.reference_device} (${
    o.location_name
  }): ${o.value.toFixed(2)} kWh`
}

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let anomalies = req.input.payload //user wants or not anomalies
    let browseProps = await Browse.botonicInit({ req })
    var res = null
    var good = null
    var bad = null

    if (anomalies === 'see_anomalies') {
      res = await axios({
        method: 'GET',
        url: `${C.dexmaAPIURL}/anomalies/top`,
        params: {
          user_id: req.context.user_id
        }
      })
      let results = res.data.sort((a, b) => a.value - b.value)
      good = results.slice(0, 3) //already sorted
      bad = results.slice(3, 6).sort((a, b) => b.value - a.value)
    }

    return {
      good: good,
      bad: bad,
      browseProps: browseProps,
      anomalies: anomalies
    }
  }

  render() {
    if (this.props.anomalies === 'see_anomalies') {
      return (
        <messages>
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
