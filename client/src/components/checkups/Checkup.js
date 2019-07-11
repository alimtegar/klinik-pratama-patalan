import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Helpers
import { formatNumber, unformatNumber } from '../../helpers';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const Patient = (props) => {
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
        fetchCheckup();
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

    const fetchCheckup = () => {
        const checkup_id = props.match.params.id;

        axios.get(`http://localhost:8000/checkups/${checkup_id}`)
            .then((res) => {                
                const data = res.data.data;
                
                setCheckup(data.checkup);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const updateCheckup = (checkup) => {
        axios.put(`http://localhost:8000/checkups/${checkup.id}`, checkup)
            .then(() => {
                // props.history.push('/checkups');

                setRes(res.data);

                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const deleteCheckup = (checkup_id) => {
        axios.delete(`http://localhost:8000/checkups/${checkup_id}`)
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

        updateCheckup(checkup);
    };

    return (
        <section id="patients" className="overflow-hidden">
            <Header title="Detail Pemeriksaan" description="Lorem ipsum dolor sit amet." />
            <div className="patients-body bg-light p-4">
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
                                    Pasien
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <select name="doctor_id" id="doctor_id" className="form-control" required value={checkup.doctor_id} onChange={(e) => handleChange(e)}>
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
                                <select name="room_id" id="room_id" className="form-control" required value={checkup.room_id} onChange={(e) => handleChange(e)}>
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
                                <input type="text" name="type" id="type" className="form-control" required value={checkup.type} onChange={(e) => handleChange(e)} />
                            </div>
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
                                    <input 
                                        type="text" 
                                        name="bill" 
                                        id="bill" 
                                        className="form-control" 
                                        value={formatNumber(checkup.bill)} 
                                        readOnly={!(authContext.user.role === 'admin' || authContext.user.role === 'cashier') ? true : false} 
                                        required 
                                        onChange={(e) => { 
                                            if (authContext.user.role === 'admin' || authContext.user.role === 'cashier') { 
                                                handleChange(e) 
                                            };
                                        }} />
                                </div>
                            </div>
                            <div className="d-flex mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-pen mr-3" />
                                    Sunting Pemeriksaan
                                </button>
                                <button type="button" className="btn btn-link btn-link-danger mx-1" onClick={() => deleteCheckup(checkup.id)}>
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

export default Patient;