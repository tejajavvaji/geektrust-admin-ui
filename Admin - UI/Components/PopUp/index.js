import { Component } from "react";
import "./index.css";

class PopUp extends Component {
  state = { name: "", mail: "", role: "" };

  editDetailsInData = (event) => {
    event.preventDefault();
    const { editUserDetails } = this.props;
    const { name, mail, role } = this.state;
    editUserDetails(name, mail, role);
    this.setState({ name: "", mail: "", role: "" });
  };

  closeClicked = () => {
    const { removeBlur } = this.props;
    removeBlur();
  };

  updateNameInState = (event) => {
    this.setState({ name: event.target.value });
  };

  updateMailInState = (event) => {
    this.setState({ mail: event.target.value });
  };

  updateRoleInState = (event) => {
    this.setState({ role: event.target.value });
  };

  render() {
    const { show } = this.props;
    const { name, mail, role } = this.state;
    return (
      <div className={`test ${show}`}>
        <h1>Edit Details</h1>
        <form autoComplete="off" className="form">
          <label className="nameLabel" htmlFor="name">
            Enter Name:
          </label>
          <input
            placeholder="Enter New Name"
            value={name}
            onChange={this.updateNameInState}
            className="nameInput"
            type="text"
            id="name"
          />
          <label className="mailLabel" htmlFor="mail">
            Enter Mail Id:
          </label>
          <input
            placeholder="Enter New Mail Id"
            value={mail}
            onChange={this.updateMailInState}
            className="mailInput"
            type="text"
            id="mail"
          />
          <label className="roleLabel" htmlFor="role">
            Enter Role:
          </label>
          <input
            placeholder="Enter New Role"
            value={role}
            onChange={this.updateRoleInState}
            className="roleInput"
            type="text"
            id="role"
          />
          <div>
            <button
              className="submitBtn"
              type="submit"
              onClick={this.editDetailsInData}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={this.closeClicked}
              className="closeBtn"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PopUp;
