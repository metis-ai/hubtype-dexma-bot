import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'
import { match_text } from '../utils.js'

export default class extends React.Component {
  static async botonicInit({ req }) {
    _.setLocale('en')
    if (match_text(req.input.data, _('gratitude.regex'), 'i'))
      return { response: _('gratitude.copys.copy_1') }
  }

  render() {
    return (
      <messages>
        <message type='text'>
          {this.props.response ? this.props.response : ''}
        </message>
        <message type='text'>
          {_('something_else.is_there_anything_else_i_can_help_you')}
          <reply payload='yes'>{_('something_else.yes')}</reply>
          <reply payload='no'>{_('something_else.no')}</reply>
        </message>
      </messages>
    )
  }
}
