import React from 'react'
import { default as _ } from '@botonic/core/lib/i18n'

export default class extends React.Component {
  render() {
    return (
      <messages>
        <message type='text'>
          {this.props.text}
          <button
            webview_height_ratio={this.props.webview_height_ratio}
            url={this.props.webview_url}
          >
            {this.props.button}
          </button>
        </message>
      </messages>
    )
  }
}
