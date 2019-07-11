import React, { Fragment, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';
import 'moment/locale/id';

// Helpers
import { getId, downloadPdf, downloadXlsx } from '../../helpers';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Header from '../layout/Header';
import ResultsCount from '../layout/ResultsCount';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

const Patients = (props) => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [patients, setPatients] = useState(null);
    const [filter, setFilter] = useState({
        q: '',
        from: '',
        to: '',
    });

    // useEffect
    useEffect(() => {
        fetchPatients(props.location.search);

        const params = queryString.parse(props.location.search);
        const q = params.q;
        const from = params.from;
        const to = params.to;

        setFilter({
            ...filter,
            q: q,
            from: from,
            to: to,
        });
    }, []);

    const fetchPatients = (params = '') => {
        axios.get(`http://localhost:8000/patients${params}`)
            .then((res) => {
                const data = res.data.data;

                setPatients(data.patients);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = `?${queryString.stringify(filter)}`;

        props.history.push(`/patients${params}`);
        
        fetchPatients(params);
    };

    const floatingActionButton = authContext.user.role === 'admin' || authContext.user.role === 'registrar' ? (
        <div className="btn-float mx-min-1">
            <button className="btn btn-primary square rounded-circle shadow-sm mx-1" onClick={() => downloadPdf(patients, 'patients')}>
                <i className="fa fa-file-pdf fa-lg" />
            </button>
            <button className="btn btn-primary square rounded-circle shadow-sm mx-1" onClick={() => downloadXlsx(patients, 'patients')}>
                <i className="fa fa-file-excel fa-lg" />
            </button>
            <NavLink to="/patients/add-patient" className="btn btn-primary square rounded-circle shadow-sm mx-1">
                <i className="fa fa-plus" />
            </NavLink>
        </div>
    ) : null;
    
    return (
        <section id="patients" className="h-100 overflow-hidden">
            <Header title="Pasien" description="Lorem ipsum dolor sit amet." floatingActionButton={floatingActionButton} />
            <div className="patients-body h-100 p-4">
                <ResultsCount count={patients ? patients.length : 0} />
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4 border-bottom">
                        <form className="form-inline d-flex align-items-center mx-min-2" onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group d-inline-flex flex-column align-items-start mx-2">
                                <label htmlFor="q" className="x-small text-muted mb-1">
                                    Pencarian
                                </label>
                                <input type="text" name="q" id="q" className="form-control form-control-sm" value={filter.q} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group d-inline-flex flex-column align-items-start mx-2">
                                <label htmlFor="" className="x-small text-muted mb-1">
                                    Rentang Waktu Rekapitulasi
                                </label>
                                <div className="input-group input-daterange">

                                    <input type="date" name="from" id="from" className="form-control form-control-sm text-left" value={filter.from} onChange={(e) => handleChange(e)} />
                                    <div className="input-group-append">
                                        <div className="input-group-text square square-sm border-left-0">
                                            -
                                        </div>
                                    </div>
                                    <input type="date" name="to" id="to" className="form-control form-control-sm text-left" value={filter.to} onChange={(e) => handleChange(e)} />

                                </div>
                            </div>
                            <div className="form-group ml-auto">
                                <button type="submit" className="btn btn-primary square mx-2 rounded-circle" aria-label="Cari">
                                    <i className="fa fa-search" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-body p-4">
                        {patients ? (
                            <Fragment>
                                {patients.length ? (
                                    <table className="table mt-min-2 mb-0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Lengkap</th>
                                            <th>NIK</th>
                                            <th>Waktu Pendaftaran</th>
                                            <th><div className="square-sm"></div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((patient, key) => (
                                            <Fragment key={patient.id}>
                                                <tr>
                                                    <td>{getId(patient.id)}</td>
                                                    <td>{patient.name}</td>
                                                    <td>{patient.nik}</td>
                                                    <td>{moment(patient.created_at).format('LLL')}</td>
                                                    <td className="text-right">
                                                        <NavLink to={`/patients/${patient.id}`} className="btn btn-link btn-sm square square-sm mx-1">
                                                            <i className="fa fa-chevron-right" />
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                                {(key + 1) < patients.length && (
                                                    <tr className="divider">
                                                        <td></td>
                                                    </tr>
                                                )}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                ) : (<Alert type="warning" message="Tidak ditemukan data untuk ditampilkan!" />)}
                            </Fragment>
                        ) : (<Spinner />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Patients;