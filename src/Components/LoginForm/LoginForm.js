import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Input, Label} from "reactstrap/es";
import s from './Form.module.scss'

class LoginForm extends Component {
  state = {
    username: "",
  }

  handleChange = (e) => {
    this.setState({username: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.form}>
          <h1>Let's Talk</h1>

          <form onSubmit={this.handleSubmit}>
            <Label htmlFor="text">What is your login?</Label>
            <Input type="text" name="username" onChange={this.handleChange} className="input" placeholder={'Login'}/>
            <Button color={'primary'}>Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
