var _ = require('@botonic/core/lib/i18n').default
var match_text = require('./utils.js').match_text

module.exports = {
  routes: [
    {
      text: input =>
        match_text(input, _('good_night.regex'), 'i') ||
        match_text(input, _('good_bye.regex'), 'i'),
      redirect: 'bye'
    },
    { payload: 'WEBVIEW_ERROR', action: 'error' },
    {
      text: input => match_text(input, _('gratitude.regex'), 'i'),
      action: 'something_else'
    },
    {
      payload: 'dont_subscribe',
      action: 'something_else'
    },
    { payload: 'yes', redirect: 'initial', ignoreRetry: true },
    { payload: 'no', action: 'bye', ignoreRetry: true },

    {
      payload: 'sensor_data',
      redirect: 'initial>sensor_data/select_period',
      ignoreRetry: true
    },
    {
      payload: 'check_device',
      redirect: 'initial>check_device/select_location',
      ignoreRetry: true
    },
    {
      payload: 'contract_expiration_closed',
      action: 'contract_expiration/webview_closed'
    },
    {
      payload: 'league_tables',
      redirect: 'initial>league_tables/select_period',
      ignoreRetry: true
    },
    {
      payload: 'recommendations',
      redirect: 'initial>recommendations/subscription',
      ignoreRetry: true
    },
    {
      payload: /^(browse_recommendations_locations|dont_browse_recommendations_locations)$/,
      action: 'recommendations/browse',
      childRoutes: [
        {
          payload: /^LOCATION_.*/,
          action: 'recommendations/filter_recommendations',
          childRoutes: [
            {
              payload: 'recommendations_closed',
              action: 'recommendations/webview_closed'
            }
          ]
        }
      ]
    },
    {
      payload: 'unsubscribe_recommendations',
      action: 'recommendations/unsubscribe',
      ignoreRetry: true
    },

    {
      payload: 'anomalies',
      redirect: 'initial>anomalies/subscription',
      ignoreRetry: true
    },
    {
      payload: /^(browse_anomalies_locations|dont_browse_anomalies_locations)$/,
      action: 'anomalies/browse',
      childRoutes: [
        {
          payload: /^LOCATION_.*/,
          action: 'anomalies/filter_anomalies',
          childRoutes: [
            {
              payload: 'anomalies_closed',
              action: 'anomalies/webview_closed'
            }
          ]
        }
      ]
    },
    {
      payload: 'unsubscribe_anomalies',
      action: 'anomalies/unsubscribe',
      ignoreRetry: true
    },

    {
      referral: /.*/i,
      action: 'initial',
      childRoutes: [
        {
          payload: 'sensor_data',
          action: 'sensor_data/select_period',
          childRoutes: [
            {
              payload: /^(Today|Yesterday|Last 7 days|Last 30 days|Current month|Last month|Year to date|Previous date)$/,
              action: 'sensor_data/select_location',
              childRoutes: [
                {
                  payload: /^LOCATION_.*/,
                  action: 'sensor_data/select_device',
                  childRoutes: [
                    {
                      payload: /^DEVICE_.*/,
                      action: 'sensor_data/results'
                    }
                  ]
                }
              ]
            }
          ]
        },

        {
          payload: 'check_device',
          action: 'check_device/select_location',
          childRoutes: [
            {
              payload: /^LOCATION_.*/,
              action: 'check_device/select_device',
              childRoutes: [
                {
                  payload: /^DEVICE_.*/,
                  action: 'check_device/results'
                }
              ]
            }
          ]
        },

        {
          payload: 'league_tables',
          action: 'league_tables/select_period',
          childRoutes: [
            {
              payload: /^(Today|Yesterday|Last 7 days|Last 30 days|Current month|Last month|Year to date|Previous date)$/,
              action: 'league_tables/select_supply',
              childRoutes: [
                {
                  payload: 'main_supply',
                  action: 'league_tables/see_performance',
                  childRoutes: [
                    {
                      payload: /^LEAGUERESULTS_.*/,
                      action: 'league_tables/results'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          payload: 'recommendations',
          action: 'recommendations/subscription',
          childRoutes: [
            {
              payload: 'subscribe',
              action: 'recommendations/subscribe'
            }
          ]
        },
        {
          payload: 'anomalies',
          action: 'anomalies/subscription',
          childRoutes: [
            {
              payload: 'subscribe',
              action: 'anomalies/subscribe'
            }
          ]
        }
      ]
    }
  ]
}
