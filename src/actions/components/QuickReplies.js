import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'

export default class extends React.Component {
  render() {
    return (
      <messages>
        <message type='text'>
          {this.props.text}
          {this.props.buttons.map((e, i) => (
            <reply key={i} payload={e.label}>
              {e.label}
            </reply>
          ))}
        </message>
      </messages>
    )
  }
}
