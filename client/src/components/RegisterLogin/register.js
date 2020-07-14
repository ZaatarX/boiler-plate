import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmP: "",
    errors: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((res) => {
          console.log(res);
          if (res.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat("Failed to sign up..."),
            });
            //console.log(this.state.errors);
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      console.log("Form is not valid...");
    }
  };

  checkPass = ({ password, confirmP }) => password === confirmP;

  checkLeng = ({ password }) => password.length >= 6;

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      console.log("Empty Form.");
      error = "Fill in all fields.";
      this.setState({ errors: errors.concat(error) });
    } else if (!this.checkLeng(this.state)) {
      console.log("Check Length.");
      error = "Password invalid.";
      this.setState({ errors: errors.concat(error) });
    } else if (!this.checkPass(this.state)) {
      console.log("Passwords don't match.");
      error = "Passwords don't match.";
      this.setState({ errors: errors.concat(error) });
    } else return true;
  };

  isFormEmpty = ({ name, lastname, email, password, confirmP }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !confirmP.length
    );
  };

  render() {
    return (
      <div className="container center-align">
        <h2>Sign Up</h2>
        <div className="row">
          <form
            action=""
            onSubmit={(event) => this.submitForm(event)}
            className="col offset-s4 s4"
          >
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  id="name"
                  className="validate"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                />
                <label
                  className={this.state.name ? "active" : ""}
                  htmlFor="text"
                >
                  Name
                </label>
                <span
                  className="helper-text"
                  data-error="Type a valid email"
                  data-success="right"
                ></span>
              </div>
              <div className="input-field col s6">
                <input
                  type="text"
                  id="lastname"
                  className="validate"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                />
                <label
                  className={this.state.lastname ? "active" : ""}
                  htmlFor="text"
                >
                  Last Name
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
              <div className="input-field col s6">
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
              <div className="input-field col s6">
                <input
                  className="validate"
                  name="confirmP"
                  value={this.state.confirmP}
                  type="password"
                  id="confirmP"
                  onChange={(e) => this.handleChange(e)}
                  required
                />
                <label
                  className={this.state.confirmP ? "active" : ""}
                  htmlFor="password"
                >
                  Confirm Password:
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
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create an Account
                </button>
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

export default connect(mapStateToProps)(Register);
