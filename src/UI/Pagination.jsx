/* eslint-disable jsx-a11y/anchor-is-valid */
//API_KEY=d298c2f8a69adb09ede30e0112c1fbe1
import React from "react";

const Pagination = ({ handleRight, pages, handleLeft, handleMiddlePage }) => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={handleLeft}>
              Previous
            </a>
          </li>
          {pages.map((value, id) => (
            <li className="page-item" key={id}>
              <a className="page-link" onClick={() => handleMiddlePage(value)}>
                {value}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" onClick={handleRight}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
