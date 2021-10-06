import { Component } from "react";
import TableRow from "../TableRow/index";
import Pagination from "../Pagination";
import PopUp from "../PopUp/index";

import "./index.css";

class Home extends Component {
  state = {
    data: [],
    //can change no of rows per page if required
    pageLimit: 10,
    currentPage: 1,
    blur: "",
    show: "display",
    editId: 0,
    searchTerm: "",
    check: false,
    lastPage: 0,
  };

  //Pagination functions
  mostLeft = () => {
    this.setState({ currentPage: 1 });
    this.cleanRadios();
  };

  mostRight = (pageNo) => {
    this.setState({ currentPage: pageNo, lastPage: pageNo });
    this.cleanRadios();
  };

  jumpToPage = (eachNum) => {
    this.setState({ currentPage: eachNum });
    this.cleanRadios();
  };

  moveLeft = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
    this.cleanRadios();
  };

  moveRight = (lastPage) => {
    const { currentPage } = this.state;
    if (currentPage < lastPage) {
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
    this.cleanRadios();
  };

  deleteMultipleRows = () => {
    console.log("Here");
    const { data } = this.state;
    const updatedData = data.filter((eachRow) => eachRow.radio === false);
    this.setState({ data: updatedData, check: false });
  };

  cleanRadios = () => {
    this.setState({ check: false });
    const { data } = this.state;
    const update = data;
    for (let i = 0; i < update.length; i++) {
      update[i].radio = false;
    }
    this.setState({ data: update });
  };

  //Popup functions
  removeBlur = () => {
    this.setState({ blur: "", show: "display" });
  };
  editUserDetails = (name, mail, role) => {
    const { data, editId } = this.state;
    console.log(data);
    const update = data;

    for (let i = 0; i < data.length; i++) {
      if (update[i].id === editId) {
        if (name !== "") {
          update[i].name = name;
        }
        if (mail !== "") {
          update[i].email = mail;
        }
        if (role !== "") {
          update[i].role = role;
        }
        break;
      }
    }

    this.setState({ data: update });
    this.removeBlur();
  };

  //TableRow functions
  deleteRow = (id) => {
    const { data } = this.state;
    const updatedData = data.filter((eachItem) => eachItem.id !== id);
    this.setState({ data: updatedData });
  };

  editClicked = (id) => {
    this.setState({ blur: "filter", show: "", editId: id });
  };

  changeRadioState = (id) => {
    const { data } = this.state;
    const update = data;
    console.log(id);
    for (let i = 0; i < data.length; i++) {
      if (update[i].id === id) {
        update[i].radio = !update[i].radio;
        break;
      }
    }

    this.setState({ data: update });
  };

  //Home functions
  selectAllCheckboxes = (indexOfFirstRow, indexOfLastRow) => {
    const { check, data, currentPage, pageLimit } = this.state;
    const update = data;
    const lastPage = Math.ceil(data.length / pageLimit);
    if (data.length > 0) {
      if (currentPage === lastPage) {
        indexOfLastRow = data.length;
      }

      for (let i = indexOfFirstRow; i < indexOfLastRow; i++) {
        update[i].radio = !check;
      }
    }

    this.setState((prevState) => ({
      check: !prevState.check,
    }));
  };

  getData = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const data = await response.json();
    const radioData = data.map((eachRow) => ({
      id: eachRow.id,
      name: eachRow.name,
      email: eachRow.email,
      role: eachRow.role,
      radio: false,
    }));
    this.setState({ data: radioData });
  };

  searchData = (event) => {
    this.setState({ searchTerm: event.target.value.toLowerCase() });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {
      data,
      currentPage,
      pageLimit,
      blur,
      show,
      searchTerm,
      check,
    } = this.state;

    const filteredData = data.filter(
      (eachItem) =>
        eachItem.name.toLowerCase().includes(searchTerm) ||
        eachItem.email.toLowerCase().includes(searchTerm) ||
        eachItem.role.toLowerCase().includes(searchTerm)
    );

    const indexOfLastRow = currentPage * pageLimit;
    const indexOfFirstRow = indexOfLastRow - pageLimit;
    const splitData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalRows = filteredData.length;

    return (
      <div className="mainContainer">
        <input
          onChange={this.searchData}
          className={`input ${blur}`}
          type="text"
          placeholder="Search by name,email or role"
        />
        <table className={`table ${blur}`}>
          <thead className="tableHead">
            <tr>
              <th>
                <input
                  checked={check}
                  type="checkbox"
                  onClick={() =>
                    this.selectAllCheckboxes(indexOfFirstRow, indexOfLastRow)
                  }
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {splitData.map((eachRow) => (
              <TableRow
                eachRow={eachRow}
                key={eachRow.id}
                deleteRow={this.deleteRow}
                editClicked={this.editClicked}
                changeRadioState={this.changeRadioState}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          filterState={blur}
          totalRows={totalRows}
          pageLimit={pageLimit}
          currentPage={currentPage}
          jumpToPage={this.jumpToPage}
          mostLeft={this.mostLeft}
          mostRight={this.mostRight}
          moveLeft={this.moveLeft}
          moveRight={this.moveRight}
          deleteMultipleRows={this.deleteMultipleRows}
        />
        <PopUp
          editUserDetails={this.editUserDetails}
          removeBlur={this.removeBlur}
          show={show}
        />
      </div>
    );
  }
}

export default Home;
