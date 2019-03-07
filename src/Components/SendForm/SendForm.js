import React, {Component} from 'react';
import {Input, Button} from 'reactstrap'
import s from './Send.module.scss'

class SendForm extends Component {

  state = {
    message: ""
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.message);
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.wrapper}>
        <Input type="text" onChange={this.handleChange} value={this.state.message} placeholder={'Write message'}/>
        <Button color={'primary'} type="submit" value="send">Send</Button>
      </form>
    )
  }
}

export default SendForm;
