import React, {Component} from 'react';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import SendForm from '../SendForm/SendForm';
import MessageList from '../MessageList/MessageList';
import s from './Chat.module.scss'

class Chat extends Component {

  state = {
    currentUser: null,
    currentRoom: {users: []},
    messages: [],
    users: []
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:fecb3e51-fd49-4b5e-a936-40a31bf549d8",
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fecb3e51-fd49-4b5e-a936-40a31bf549d8/token"
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({currentUser: currentUser})

        return currentUser.subscribeToRoom({
          roomId: "19411457",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
          }
        })
      })
      .then(currentRoom => {
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        })
      })
      .catch(error => console.log(error))
  }


  addMessage = (text) => {
    console.log(this.state);
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
      .catch(error => console.error('error', error));
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className={s.wrapper}>
        <h2 className="header">Chat base on Chatkit</h2>
        <SendForm className="input-field" onSubmit={this.addMessage}/>
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
}

export default Chat;
