import React from 'react'
import moment from 'moment'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from '../something_else'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    let somethingElseProps = await SomethingElse.botonicInit({ req })
    return { somethingElseProps: somethingElseProps }
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {_('contract_expiration.you_have_consulted_your_contracts')}{' '}
          {moment().format('YYYY/MM/DD')} - {moment().format('LTS')}
        </message>
        <SomethingElse {...this.props.somethingElseProps} />
      </messages>
    )
  }
}
