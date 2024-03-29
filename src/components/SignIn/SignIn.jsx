import React, { Component } from 'react';
import './Signin.css';
import { getLoadAuthenticatedUser } from '../../utils/user';
import { saveAuthTokenInSession } from '../../utils/session';
import { apiRequest } from '../../utils/api';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (e) => {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    apiRequest(`signin`, 'post', null, {
      email: signInEmail,
      password: signInPassword,
    })
      .then((response) => {
        return response.json();
      })
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

    return false;
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
