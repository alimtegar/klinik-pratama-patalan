import React from 'react';

const Pagination = () => {
    return (
        <ul className="pagination justify-content-center nav">
            <li className="nav-item">
                <a href="/" className="nav-link active">
                    1
            </a>
            </li>
            <li className="nav-item">
                <a href="/" className="nav-link">
                    2
            </a>
            </li>
            <li className="nav-item">
                <a href="/" className="nav-link">
                    3
            </a>
            </li>
        </ul>
    );
};

export default Pagination;