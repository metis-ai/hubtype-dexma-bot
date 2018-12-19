import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { default as SomethingElse } from './something_else'

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
          It has not been possible to retrieve the requested information.
        </message>
        <message type='text'>Please, try it again later.</message>
        <SomethingElse {...this.props.somethingElseProps} />
      </messages>
    )
  }
}
