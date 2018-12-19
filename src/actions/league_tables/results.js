import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    let payload = req.input.payload.match(/^LEAGUERESULTS_(.*)_(.*)$/)
    let best = JSON.parse(payload[1])
    let worst = JSON.parse(payload[2])
    return { somethingElseProps: somethingElseProps, best: best, worst: worst }
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('league_tables.results.best_results')}\n
          {this.props.best.map(
            (e, i) => `${i + 1} - ${e.name} - ${e.value} - ${e.units}\\n`
          )}
        </message>
        <message type='text'>
          {_('league_tables.results.worst_results')}\n
          {this.props.worst.map(
            (e, i) => `${i + 1} - ${e.name} - ${e.value} - ${e.units}\\n`
          )}
        </message>
        <SomethingElse {...this.props.somethingElseProps} />
      </messages>
    )
  }
}
