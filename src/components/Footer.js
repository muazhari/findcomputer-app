import React, { Component } from "react"
import { WithRoute } from "react-router-dom"

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <footer>
        Created with love by
        <a href="https://github.com/muazhari">Muhamamd Kharisma Azhari</a>
      </footer>
    )
  }
}

export default Footer
