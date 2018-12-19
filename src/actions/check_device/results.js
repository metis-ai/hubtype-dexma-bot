import React from 'react'
import axios from 'axios'
import C from '../../constants.js'
import moment from 'moment'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'

function get_resolution(parameterKey, device_id, token) {
  return axios({
    method: 'GET',
    timeout: 2000,
    url: `${
      C.dexmaAPIBaseURL
    }/parameters/${parameterKey}/resolutions?device_id=${device_id}`,
    headers: { 'x-dexcell-token': token }
  })
}

function get_results(
  resolutions,
  deviceResolutions,
  parameterKey,
  device_id,
  token
) {
  let resolution = deviceResolutions.raw_resolutions[0]

  deviceResolutions.raw_resolutions.forEach(
    raw_res =>
      (resolution =
        resolutions.indexOf(raw_res) < resolutions.indexOf(resolution)
          ? raw_res
          : resolution)
  )

  let operation = null
  if (resolution === 'B') operation = 'RAW'
  else operation = 'DELTA'

  return axios({
    method: 'GET',
    timeout: 2000,
    url: `${C.dexmaAPIBaseURL}/readings/`,
    params: {
      from: moment()
        .subtract(24, 'hours')
        .utc()
        .format()
        .slice(0, -1),
      to: moment()
        .utc()
        .format()
        .slice(0, -1),
      device_id: device_id,
      parameter_key: parameterKey,
      resolution: resolution,
      operation: operation
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
    var final_results = null

    try {
      let devices_info = devices.map(d => {
        let [device_id, device_type] = d.split('-')
        let [parameterKey, {}] = Object.entries(C.parameterKeys).find(
          ([k, v]) => v.indexOf(device_type) !== -1
        )
        return { device_id: device_id, device_type: device_type, parameterKey }
      })
      const res = await Promise.all(
        devices_info.map((e, i) =>
          get_resolution(e.parameterKey, e.device_id, req.context.token)
        )
      )
      final_results = await Promise.all(
        res.map((e, i) =>
          get_results(
            C.resolutions,
            e.data[0],
            devices_info[i].parameterKey,
            devices_info[i].device_id,
            req.context.token
          )
        )
      )
      final_results = final_results.map((res, i) => {
        let lastMeasure = null
        if (!res)
          return (
            devices_info[i].device_type +
            ' - ' +
            _('check_device.stats.results_not_available')
          )
        if (res.data.values && res.data.values.length > 0) {
          let last = res.data.values.slice(-1).pop()
          last.time = moment(last.ts)
          lastMeasure = last
        } else {
          lastMeasure = -1
        }
        if (lastMeasure === -1) {
          return (
            devices_info[i].device_type +
            ' - ' +
            _('check_device.stats.without_data')
          )
        } else if (lastMeasure && lastMeasure.time) {
          return (
            devices_info[i].device_type +
            ' - ' +
            _('check_device.stats.with_data') +
            lastMeasure.time.fromNow()
          )
        } else {
          return (
            devices_info[i].device_type +
            ' - ' +
            _('check_device.stats.without_data')
          )
        }
      })
    } catch (e) {
      errors = true
    }

    return {
      final_results: final_results,
      errors: errors,
      somethingElseProps: somethingElseProps
    }
  }

  render() {
    if (this.props.errors) {
      return (
        <messages>
          <message type='text'>
            {_('check_device.stats.results_not_available')}
          </message>
          <SomethingElse {...this.props.somethingElseProps} />
        </messages>
      )
    } else {
      return (
        <messages>
          <message type='text'>
            {_('check_device.stats.we_have_checked_your_device')}
          </message>
          {this.props.final_results.map((e, i) => (
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
