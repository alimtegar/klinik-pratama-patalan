import React, { Fragment, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Helpers
import { getId } from '../../helpers';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Header from '../layout/Header';
import ResultsCount from '../layout/ResultsCount';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

const Doctors = () => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [doctors, setDoctors] = useState(null);

    const fetchDoctors = () => {
        axios.get('http://localhost:8000/doctors')
            .then((res) => {
                const data = res.data.data;

                setDoctors(data.doctors);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const floatingActionButton = authContext.user.role === 'admin' ? (
        <NavLink to="/doctors/add-doctor" className="btn btn-primary btn-float square rounded-circle shadow-sm">
            <i className="fa fa-plus" />
        </NavLink>
    ) : null;

    return (
        <section id="doctors" className="h-100 overflow-hidden">
            <Header title="Dokter" description="Lorem ipsum dolor sit amet." floatingActionButton={floatingActionButton} />
            <div className="doctors-body h-100 p-4">
                <ResultsCount count={doctors ? doctors.length : 0} />
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {doctors ? (
                            <Fragment>
                                {doctors.length ? (
                                    <table className="table mt-min-2 mb-0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Lengkap</th>
                                            <th>Spesialis</th>
                                            <th><div className="square-sm"></div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doctors.map((doctor, key) => (
                                            <Fragment key={doctor.id}>
                                                <tr>
                                                    <td>{getId(doctor.id)}</td>
                                                    <td>{doctor.name}</td>
                                                    <td>{doctor.specialty}</td>
                                                    <td className="text-right">
                                                        <NavLink to={`/doctors/${doctor.id}`} className="btn btn-link btn-sm square square-sm mx-1">
                                                            <i className="fa fa-chevron-right" />
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                                {(key + 1) < doctors.length && (
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

export default Doctors;