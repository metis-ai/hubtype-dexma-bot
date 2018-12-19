import React from 'react'

export default class extends React.Component {

  render() {
    return (
      <message type="text">
        I don't understand you {this.props.context.user.name}
        <button action="initial">Hola</button>
      </message>
    )
  }
}
