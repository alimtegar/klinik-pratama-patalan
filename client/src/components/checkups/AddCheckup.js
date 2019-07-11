import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

// Helpers
import { formatNumber, unformatNumber } from '../../helpers';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const AddCheckup = (props) => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [checkup, setCheckup] = useState({
        patient_id: '',
        doctor_id: '',
        room_id: '',
        type: '',
        bill: 0,
    });
    const [res, setRes] = useState(null);

    // useEffect
    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchRooms();

        const params = queryString.parse(props.location.search);
        const patient_id = params.patient_id;

        setCheckup({
            ...checkup,
            patient_id: patient_id,
        });
    }, []);
    

    const fetchPatients = () => {
        axios.get('http://localhost:8000/patients')
            .then((res) => {
                const data = res.data.data;

                setPatients(data.patients);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const fetchDoctors = () => {
        axios.get('http://localhost:8000/doctors')
            .then((res) => {
                const data = res.data.data;

                setDoctors(data.doctors);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const fetchRooms = () => {
        axios.get('http://localhost:8000/rooms')
            .then((res) => {
                const data = res.data.data;

                setRooms(data.rooms);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const addCheckup = () => {
        axios.post('http://localhost:8000/checkups', checkup)
            .then(() => {
                props.history.push('/checkups');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const handleChange = (e) => {
        if (e.target.name === 'bill') {
            const bill = unformatNumber(e.target.value);

            setCheckup({
                ...checkup,
                [e.target.name]: bill,
            });
        } else {
            setCheckup({
                ...checkup,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addCheckup();
    };

    return (
        <section id="checkups" className="overflow-hidden">
            <Header title="Catat Pemeriksaan" description="Lorem ipsum dolor sit amet." />
            <div className="checkups-body bg-light p-4">
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {res && (<ErrorHandler res={res} />)}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="type" className="x-small text-muted">
                                    Pasien
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <select name="patient_id" id="patient_id" className="form-control" required value={checkup.patient_id} onChange={(e) => handleChange(e)}>
                                    <option>-</option>
                                    {patients.map((patient) => (
                                        <option value={patient.id} key={patient.id}>
                                            {patient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type" className="x-small text-muted">
                                    Dokter
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <select name="doctor_id" id="doctor_id" className="form-control" required onChange={(e) => handleChange(e)}>
                                    <option>-</option>
                                    {doctors.map((doctor) => (
                                        <option value={doctor.id} key={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type" className="x-small text-muted">
                                    Kamar
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <select name="room_id" id="room_id" className="form-control" required onChange={(e) => handleChange(e)}>
                                    <option>-</option>
                                    {rooms.map((room) => (
                                        <option value={room.id} key={room.id}>
                                            {room.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="x-small text-muted">
                                    Jenis Pemeriksaan
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="type" id="type" className="form-control" required onChange={(e) => handleChange(e)} />
                            </div>
                            {(authContext.user.role === 'admin' || authContext.user.role === 'cashier') ? (
                                <div className="form-group">
                                <label htmlFor="name" className="x-small text-muted">
                                    Tagihan Pembayaran
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            Rp.
                                        </div>
                                    </div>
                                    <input type="text" name="bill" id="bill" className="form-control" value={formatNumber(checkup.bill)} required onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            ) : null}
                            <div className="d-flex mx-min-1">
                                <button className="btn btn-primary mx-1">
                                    <i className="fa fa-plus mr-3" />
                                    Catat Pemeriksaan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddCheckup;