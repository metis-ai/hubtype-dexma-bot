import React from 'react'
import axios from 'axios'
import C from '../../constants.js'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else.js'
import { default as Errors } from '../error.js'

function get_device_values(period, device_id, parameterKey, token) {
  return axios({
    method: 'GET',
    url: `${C.dexmaAPIBaseURL}/readings/`,
    timeout: 2000,
    params: {
      from: period[0].start_date,
      to: period[0].end_date,
      device_id: parseInt(device_id),
      parameter_key: parameterKey,
      resolution: period[0].resolution,
      operation: C.operations[parameterKey]
    },
    headers: { 'x-dexcell-token': token }
  }).catch(err => false)
}

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')

    let somethingElseProps = await SomethingElse.botonicInit({ req })

    var errors = false
    let devices = req.input.payload.split('_')[1].split(':')
    try {
      let period = C.periods.filter(
        p => p.label === req.context.selected_period
      )
      let devices_info = devices.map(d => {
        let [device_id, device_type] = d.split('-')
        let [parameterKey, {}] = Object.entries(C.parameterKeys).find(
          ([k, v]) => v.indexOf(device_type) !== -1
        )
        return {
          device_id: device_id,
          device_type: device_type,
          parameterKey,
          period
        }
      })
      const results = await Promise.all(
        devices_info.map((e, i) =>
          get_device_values(
            e.period,
            e.device_id,
            e.parameterKey,
            req.context.token
          )
        )
      )
      var stats = results.map((e, i) => {
        if (!e)
          return `${devices_info[i].device_type} - ${_(
            'sensor_data.results.error'
          )}`
        let v = e.data.values.reduce((p, c) => p + c.v, 0)
        if (C.operations[devices_info[i].parameterKey] === 'AVG')
          v /= e.data.values.length
        return (stats = `${devices_info[i].device_type} - ${v.toLocaleString(
          'en',
          { minimumFractionDigits: 2 }
        )} ${e.data.units}`)
      })
    } catch (e) {
      errors = true
    }

    return {
      stats: stats,
      errors: errors,
      somethingElseProps: somethingElseProps
    }
  }

  render() {
    if (this.props.errors) {
      return <Errors />
    } else {
      return (
        <messages>
          <message type='text'>{_('sensor_data.results.stats')}</message>
          {this.props.stats.map((e, i) => (
            <message type='text' key={i}>
              {e}
            </message>
          ))}
          <SomethingElse {...this.props.somethingElseProps} />
        </messages>
      )
    }
  }
}
