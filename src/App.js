import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import LoginForm from './Components/LoginForm/LoginForm';
import Chat from './Components/Chat/Chat';

import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:fecb3e51-fd49-4b5e-a936-40a31bf549d8",
  key: "701522f5-49e9-45d3-9abf-9e0d60383c81:zoRWXG9YwZx27DMvPNZMGR/Dx0MUg1BsglEniyTAixg="
});


class App extends Component {
  state  = {
    currentUsername: '',
    currentId: '',
    currentView: 'LoginForm'
  };
  createUser = (username) => {
    chatkit.createUser({
      id: username,
      name: username,
    })
      .then((currentUser) => {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      }).catch((err) => {
      if (err.status === 400) {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      } else {
        console.log(err.status);
      }
    });
  };

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  };

  render() {
    let view = '';

    switch (this.state.currentView) {

      case "chatApp":
        view = <Chat currentId={this.state.currentId} />;
        break;
      default:
        view = <LoginForm onSubmit={this.createUser} />;
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}
export default App;
