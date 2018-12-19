import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { match_text } from '../utils.js'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    if (match_text(req.input.data, _('good_night.regex'), 'i'))
      return { response: _('good_night.copys.copy_1') }
    if (match_text(req.input.data, _('good_bye.regex'), 'i'))
      return { response: _('good_bye.copys.copy_1') }
  }

  render() {
    if (this.props.response) {
      return <message type='text'>{this.props.response}</message>
    } else {
      return (
        <messages>
          <message type='text'>
            {_('bye.remember_i_will_be_here_for_your_questions')}
          </message>
          <message type='text'>{_('bye.have_a_nice_day')}</message>
        </messages>
      )
    }
  }
}
