import React, { Component } from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';
import { saveAuthTokenInSession } from '../../utils/session';
import { getLoadAuthenticatedUser } from '../../utils/user';
import '../SignIn/Signin.css';
import { apiRequest } from '../../utils/api';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    apiRequest('register', 'post', null, {
      name,
      email,
      password,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId && data.success === 'true') {
          saveAuthTokenInSession(data.token);
          getLoadAuthenticatedUser(
            data.userId,
            data.token,
            this.props.loadUser,
            this.props.onRouteChange
          );
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loginError: 'Yikes! Network error.' });
      });
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  autoComplete="on"
                />
              </div>
            </fieldset>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
