import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormValid(this.state)) {
      this.props.dispatch(loginUser(dataToSubmit)).then((res) => {
        console.log(res);
        console.log(res.payload.loginSuccess);
        if (res.payload.loginSuccess) {
          this.props.history.push("/about");
        } else {
          this.setState({
            errors: this.state.errors.concat(
              "Failed to log in: please check email and password."
            ),
          });
          //console.log(this.state.errors);
        }
      });
    } else {
      this.setState({
        errors: this.state.errors.concat("Form is not valid."),
      });
      //console.log(this.state.errors);
    }
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    return (
      <div className="container center-align">
        <h2>Login</h2>
        <div className="row">
          <form
            action=""
            onSubmit={(event) => this.submitForm(event)}
            className="col offset-s4 s4"
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  id="email"
                  className="validate"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />

                <label
                  className={this.state.email ? "active" : ""}
                  htmlFor="email"
                >
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Type a valid email"
                  data-success="right"
                ></span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  name="password"
                  value={this.state.password}
                  type="password"
                  id="password"
                  onChange={(e) => this.handleChange(e)}
                  required
                />
                <label
                  className={this.state.password ? "active" : ""}
                  htmlFor="password"
                >
                  Password:
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                ></span>
              </div>
            </div>
            <div>
              {this.state.errors.length > 0 && (
                <div>{this.displayErrors(this.state.errors)}</div>
              )}
            </div>
            <div className="row">
              <div className="col 6">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Log in
                </button>
              </div>

              <div className="col 6">
                <Link to="/register">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
