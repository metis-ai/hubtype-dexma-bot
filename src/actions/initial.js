import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import axios from 'axios'
import C from '../constants.js'
import { match_text } from '../utils.js'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    var ref = {}
    var error = false
    var bot_response = null

    try {
      ref = JSON.parse(req.input.referral)
    } catch (e) {
      //ref.user_id = '19085'
      //ref.account_id = '1643'
      //ref.token = '5963e3b88df6a71d6b25'
      if (
        (!req.context.token && !ref.token) ||
        (!ref.user_id && !req.context.user_id) ||
        (!ref.account_id && !req.context.account_id)
      )
        error = true
    }
    req.context = Object.assign(req.context, ref)

    await axios
      .get(C.dexmaAPIURL + '/subscriptions')
      .then(res => {
        req.context.was_subscribed = res.data.filter(
          o => o.user_id === ref.user_id || o.user_id === req.context.user_id
        ).length
      })
      .catch(function(e) {
        error = true
      })

    if (!req.context.was_subscribed) {
      await axios
        .post(C.dexmaAPIURL + '/subscriptions', {
          type: 'INITIAL',
          user_id: ref.user_id ? ref.user_id : req.context.user_id,
          deployment_id: ref.account_id
            ? ref.account_id
            : req.context.account_id,
          meta_info: {
            hubtype_id: req.context.bot.id
          }
        })
        .then(function(res) {
          req.context.is_subscribed = true
          req.context.initial_subscription_id = res.data.id
          // INITIAL SUBSCRIPTION ID STORED HERE
        })
        .catch(function(e) {
          error = true
        })
    }

    if (match_text(req.input.data, _('greetings.regex'), 'i'))
      bot_response = _(`greetings.copys.copy_1`)
    if (match_text(req.input.data, _('good_morning.regex'), 'i'))
      bot_response = _('good_morning.copys.copy_1')
    if (match_text(req.input.data, _('good_afternoon.regex'), 'i'))
      bot_response = _('good_afternoon.copys.copy_1')
    if (match_text(req.input.data, _('insults.regex'), 'i'))
      bot_response = _('insults.copys.copy_1')

    return { bot_response: bot_response, error: error }
  }

  render() {
    if (this.props.error) {
      return <message type='text'>{_('initial.no_access')}</message>
    } else {
      return (
        <messages>
          <message type='text'>
            {!this.props.context.was_subscribed &&
            this.props.context.is_subscribed
              ? _('initial.subscribed')
              : ''}
          </message>
          <message type='text'>
            {this.props.bot_response
              ? this.props.bot_response
              : _('initial.welcome')}
          </message>
          <message type='carrousel'>
            <element>
              <pic>/assets/check_device_pic.png</pic>
              <title>{_('initial.check_device_title')}</title>
              <desc>{_('initial.check_device_desc')}</desc>
              <button payload='check_device'>{_('initial.go')}</button>
              {this.props.context.subscribed_recommendations && <button />}
            </element>
            <element>
              <pic>/assets/sensor_data_pic.png</pic>
              <title>{_('initial.sensor_data_title')}</title>
              <desc>{_('initial.sensor_data_desc')}</desc>
              <button payload='sensor_data'>{_('initial.go')}</button>
            </element>
            <element>
              <pic>/assets/contract_expiration_pic.png</pic>
              <title>{_('initial.contract_expiration_title')}</title>
              <desc>{_('initial.contract_expiration_desc')}</desc>
              <button url='/webviews/contract_expiration'>
                {_('initial.go')}
              </button>
            </element>
            <element>
              <pic>/assets/league_tables_pic.png</pic>
              <title>{_('initial.league_tables_title')}</title>
              <desc>{_('initial.league_tables_desc')}</desc>
              <button payload='league_tables'>{_('initial.go')}</button>
            </element>
            <element>
              <pic>/assets/recommendations_pic.png</pic>
              <title>{_('initial.recommendations_title')}</title>
              <desc>{_('initial.recommendations_desc')}</desc>
              <button payload='recommendations'>{_('initial.go')}</button>
              {this.props.context.subscribed_to_recommendations && (
                <button payload='unsubscribe_recommendations'>
                  Unsubscribe
                </button>
              )}
            </element>
            <element>
              <pic>/assets/anomalies_pic.png</pic>
              <title>{_('initial.anomalies_title')}</title>
              <desc>{_('initial.anomalies_desc')}</desc>
              <button payload='anomalies'>{_('initial.go')}</button>
              {this.props.context.subscribed_to_anomalies && (
                <button payload='unsubscribe_anomalies'>Unsubscribe</button>
              )}
            </element>
            <element>
              <pic>/assets/anomalies_pic.png</pic>
              <title>{_('initial.anomalies_title')} Test Webviews</title>
              <desc>{_('initial.anomalies_desc')}</desc>
              <button payload='browse_recommendations_locations'>
                {_('initial.go')}
              </button>
            </element>
          </message>
        </messages>
      )
    }
  }
}
