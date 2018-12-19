import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as InvokeWebview } from '../components/InvokeWebview'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
  }

  render() {
    return (
      <InvokeWebview
        text={_('league_tables.performance.buildings_of_your_portfolio')}
        webview_height_ratio={'tall'}
        webview_url={'/webviews/league_table'}
        button={_('league_tables.performance.see_results')}
      />
    )
  }
}
