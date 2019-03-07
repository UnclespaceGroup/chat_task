import React, {Component} from 'react';
import s from './Message.module.scss'
import {Card, Button, CardText} from 'reactstrap';
import moment from 'moment-timezone'

const MASSAGE_IN_LIST = 10

class MessageList extends Component {
  state = {
    number: 0
  }

  render() {

    const {
      props: {
        messages
      },
      state: {
        number
      }
    } = this
    const prevDisabled = number === 0
    const nextDisabled = number === parseInt(messages.length / MASSAGE_IN_LIST)
    const startIndex = number * MASSAGE_IN_LIST
    const currentList = messages.slice(startIndex, startIndex + MASSAGE_IN_LIST)
    return (
      <div className={s.wrapper}>
        <div className={s.pagination}>
          <Button
            disabled={prevDisabled}
            onClick={() => {
              this.setState({number: number - 1})
            }}>Prev</Button>
          <Button
            disabled={nextDisabled}
            onClick={() => {
              this.setState({number: number + 1})
            }}>Next</Button>
        </div>
        {currentList.map((message, index) => (
          <Card key={index} className={s.card}>
            <span>{message.senderId}</span>
            <small>{this.correctDate(message.createdAt)}</small>
            <CardText>{message.text}</CardText>
          </Card>
        ))}
      </div>
    )
  }

  correctDate = (date) => {
    const format = 'YYYY/MM/DD HH:mm:ss ZZ'
    const renderFormat = 'YYYY/MM/DD HH:mm:ss'
    return moment(date, format).format(renderFormat)
  }
}

export default MessageList;
