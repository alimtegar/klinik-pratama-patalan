import React from 'react';

const ResultsCount = (props) => {
    const { count } = props;

    return (
        <div className="d-flex align-items-center mb-4">
            <div className="x-small text-muted ml-1">
                <i className="fa fa-list mr-3" />
                Menampilkan <strong className="font-weight-bold text-primary">{count}</strong> data yang tidak ditemukan
            </div>
        </div>
    );
};

export default ResultsCount;