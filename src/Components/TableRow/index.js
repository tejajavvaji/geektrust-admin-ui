import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";

import "./index.css";

const TableRow = (props) => {
  const { eachRow, deleteRow, editClicked, changeRadioState } = props;
  return (
    <>
      <tr>
        <td>
          <input
            onClick={() => changeRadioState(eachRow.id)}
            type="checkbox"
            checked={eachRow.radio}
          />
        </td>
        <td>{eachRow.name}</td>
        <td>{eachRow.email}</td>
        <td>{eachRow.role}</td>
        <td className="iconTableRow">
          <FaEdit
            onClick={() => editClicked(eachRow.id)}
            className="editIcon"
          />
          <RiDeleteBin7Line
            className="deleteIcon"
            onClick={() => deleteRow(eachRow.id)}
          />
        </td>
      </tr>
    </>
  );
};

export default TableRow;
