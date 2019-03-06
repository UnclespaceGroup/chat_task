import React, {Component} from 'react';
import moment from "moment";
import tz from 'moment-timezone'

class MessageList extends Component {
  render() {
    return (
      <ul>
        {this.props.messages.map((message, index) => (
          <li key={index}>
            <h4 >{message.senderId}</h4>
            <small>{this.correctDate(message.createdAt)}</small>
            <p >{message.text}</p>
          </li>
        ))}
      </ul>
    )
  }

  correctDate = (date) => {
    const format = 'YYYY/MM/DD HH:mm:ss ZZ'
    const renderFormat = 'YYYY/MM/DD HH:mm:ss'
    return moment(date, format).tz('Russia/Moscow').format(renderFormat)
  }
}

export default MessageList;
