import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import "./index.css";

const selectedPage = (eachNum, currentPage) => {
  if (eachNum === currentPage) {
    return "listItem listItemSelected";
  } else {
    return "listItem";
  }
};

const Pagination = (props) => {
  const {
    pageLimit,
    totalRows,
    jumpToPage,
    currentPage,
    mostLeft,
    mostRight,
    moveLeft,
    moveRight,
    filterState,
    deleteMultipleRows,
  } = props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / pageLimit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginationContainer">
      <button onClick={deleteMultipleRows} type="button" className="deleteBtn">
        Delete Selected
      </button>

      <div className={`barContainer ${filterState}`}>
        <div className="arrowContainer">
          <BsArrowBarLeft onClick={mostLeft} className="arrow" />
        </div>
        <div className="arrowContainer">
          <AiOutlineArrowLeft className="arrow" onClick={moveLeft} />
        </div>

        <ul className="list">
          {pageNumbers.map((eachNum) => {
            const res = selectedPage(eachNum, currentPage);

            return (
              <li
                onClick={() => jumpToPage(eachNum)}
                className={res}
                key={eachNum}
              >
                {eachNum}
              </li>
            );
          })}
        </ul>

        <div className="arrowContainer">
          <AiOutlineArrowRight onClick={() => moveRight(pageNumbers.length)} />
        </div>
        <div className="arrowContainer">
          <BsArrowBarRight onClick={() => mostRight(pageNumbers.length)} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
