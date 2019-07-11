import React, { useState } from 'react';
import axios from 'axios';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const AddDoctor = (props) => {
    // useState
    const [doctor, setDoctor] = useState({
        name: '',
        specialty: '',
    });
    const [res, setRes] = useState(null);

    const addDoctor = () => {
        axios.post('http://localhost:8000/doctors', doctor)
        .then(() => {
            props.history.push(`/doctors`);
        })
        .catch((err) => {
            console.log(err);

            setRes(err.response.data);

            window.scrollTo(0, 0);
        });
    }

    const handleChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addDoctor();
    };

    return (
        <section id="doctors" className="h-100 overflow-hidden">
            <Header title="Tambah Dokter" description="Lorem ipsum dolor sit amet." />
            <div className="doctors-body h-100 p-4">
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {res && (<ErrorHandler res={res} />)}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="name" className="x-small text-muted">
                                    Nama Lengkap
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="name" id="name" className="form-control" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialty" className="x-small text-muted">
                                    Spesialis
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="specialty" id="specialty" className="form-control" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="d-flex mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-plus mr-3" />
                                    Tambah Dokter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddDoctor;