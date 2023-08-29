/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const FavoritePagination = ({ pagesarr, handlePageChange }) => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pagesarr.map((page) => (
            <li className="page-item" key={page}>
              <a className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FavoritePagination;
