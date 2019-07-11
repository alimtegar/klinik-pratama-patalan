import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Filter = () => {
    // useState
    const [filter, setFilter] = useState({
        q: '',
        from: '',
        to: '',
    });

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        return (<Redirect to="/xxx" />)
    };

    return (
        <form className="form-inline d-flex align-items-center mx-min-2" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group d-inline-flex flex-column align-items-start mx-2">
                <label htmlFor="q" className="x-small text-muted mb-1">
                    Pencarian
                </label>
                <input type="text" name="q" id="q" className="form-control form-control-sm" onChange={(e) => handleChange(e)} />
            </div>
            <div className="form-group d-inline-flex flex-column align-items-start mx-2">
                <label htmlFor="" className="x-small text-muted mb-1">
                    Rentang Waktu Rekapitulasi
                </label>
                <div className="input-group input-daterange">

                    <input type="date" name="to" id="to" className="form-control form-control-sm text-left" onChange={(e) => handleChange(e)} />
                    <div className="input-group-append">
                        <div className="input-group-text square square-sm border-left-0">
                            -
                        </div>
                    </div>
                    <input type="date" name="from" id="from" className="form-control form-control-sm text-left" onChange={(e) => handleChange(e)} />

                </div>
            </div>
            <div className="form-group ml-auto">
                <button type="submit" className="btn btn-primary square mx-2 rounded-circle" aria-label="Cari">
                    <i className="fa fa-search" />
                </button>
            </div>
        </form>
    );
};

export default Filter;