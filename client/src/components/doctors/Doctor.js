import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const Doctor = (props) => {
    // useState
    const [doctor, setDoctor] = useState({
        name: '',
        specialty: '',
    });
    const [res, setRes] = useState(null);

    // useEffect
    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = () => {
        const doctor_id = props.match.params.id;

        axios.get(`http://localhost:8000/doctors/${doctor_id}`)
            .then((res) => {
                const data = res.data.data;

                setDoctor(data.doctor);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const updateDoctor = (doctor) => {
        axios.put(`http://localhost:8000/doctors/${doctor.id}`, doctor)
            .then(() => {
                // props.history.push('/doctors');

                setRes(res.data);

                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const deleteDoctor = (doctor_id) => {
        axios.delete(`http://localhost:8000/doctors/${doctor_id}`)
            .then(() => {
                props.history.push('/doctors');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const handleChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateDoctor(doctor);
    };

    return (
        <section id="doctors" className="h-100 overflow-hidden">
            <Header title="Detail Dokter" description="Lorem ipsum dolor sit amet." />
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
                                <input type="text" name="name" id="name" className="form-control" required value={doctor.name} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialty" className="x-small text-muted">
                                    Spesialis
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="specialty" id="specialty" className="form-control" required value={doctor.specialty} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="d-flex mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-pen mr-3" />
                                    Sunting Dokter
                                </button>
                                <button type="button" className="btn btn-link mx-1" onClick={() => deleteDoctor(doctor.id)}>
                                    Hapus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Doctor;