import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const Patient = (props) => {
    // useState
    const [patient, setPatient] = useState({
        name: '',
        nik: '',
        birth_date: '',
        gender: '',
        province: '',
        city: '',
        district: '',
        subdistrict: '',
        rw: '',
        rt: '',
        address: '',
        religion: '',
        education: '',
        profession: '',
        phone_number: '',
        type: '',
    });
    const [res, setRes] = useState(null);

    const fetchPatient = () => {
        const patient_id = props.match.params.id;

        axios.get(`http://localhost:8000/patients/${patient_id}`)
            .then((res) => {
                const data = res.data.data;

                const convertedPatient = {
                    ...data.patient,
                    birth_date: data.patient.birth_date.split('-').reverse().join('/'),
                };

                setPatient(convertedPatient);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    // useEffect
    useEffect(fetchPatient, []);

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        })
    };

    const updatePatient = (patient) => {
        const convertedPatient = {
            ...patient,
            birth_date: patient.birth_date.split('/').reverse().join('-'),
        };

        axios.put(`http://localhost:8000/patients/${patient.id}`, convertedPatient)
            .then((res) => {
                // props.history.push('/patients');

                setRes(res.data);

                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const deletePatient = (patient_id) => {
        axios.delete(`http://localhost:8000/patients/${patient_id}`)
            .then(() => {
                props.history.push('/patients');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updatePatient(patient);
    };

    return (
        <section id="patients" className="overflow-hidden">
            <Header title="Profil Pasien" description="Lorem ipsum dolor sit amet" />
            <div className="patients-body bg-light p-4">
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {res && (
                            <div className="mb-3">
                                <ErrorHandler res={res} />
                            </div>
                        )}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="name" className="x-small text-muted">
                                    Nama Lengkap
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="name" id="name" className="form-control" required value={patient.name} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nik" className="x-small text-muted">
                                    NIK (Nomor Induk Kependudukan)
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="nik" id="nik" className="form-control" required value={patient.nik} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birth_date" className="x-small text-muted">
                                    Tanggal Lahir
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="birth_date" id="birth_date" className="form-control datepicker" data-date-format="dd/mm/yyyy" value={patient.birth_date} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender" className="x-small text-muted">
                                    Gender
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <select name="gender" id="gender" className="form-control" required value={patient.gender} onChange={(e) => handleChange(e)} >
                                    <option>-</option>
                                    <option value="male">Pria</option>
                                    <option value="female">Wanita</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="form-row my-min-2">
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="province" className="x-small text-muted">
                                            Provinsi
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="province" id="province" className="form-control" required value={patient.province} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="city" className="x-small text-muted">
                                            Kota / Kabupaten
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="city" id="city" className="form-control" required value={patient.city} onChange={(e) => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row my-min-2">
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="district" className="x-small text-muted">
                                            Kecamatan
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="district" id="district" className="form-control" required value={patient.district} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="subdistrict" className="x-small text-muted">
                                            Kelurahan
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="subdistrict" id="subdistrict" className="form-control" required value={patient.subdistrict} onChange={(e) => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row my-min-2">
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="rw" className="x-small text-muted">
                                            RW
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="rw" id="rw" className="form-control" required value={patient.rw} onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="col-lg-6 my-2 mb-lg-0">
                                        <label htmlFor="rt" className="x-small text-muted">
                                            RT
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input type="text" name="rt" id="rt" className="form-control" required value={patient.rt} onChange={(e) => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="x-small text-muted">
                                    Alamat Lengkap
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <textarea name="address" id="address" cols="30" rows="5" className="form-control" required value={patient.address} onChange={(e) => handleChange(e)}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="religion" className="x-small text-muted">
                                    Agama
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="religion" id="religion" className="form-control" required value={patient.religion} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="education" className="x-small text-muted">
                                    Pendidikan
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="education" id="education" className="form-control" required value={patient.education} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profession" className="x-small text-muted">
                                    Pekerjaan
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="profession" id="profession" className="form-control" required value={patient.profession} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number" className="x-small text-muted">
                                    No. Telepon
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="phone_number" id="phone_number" className="form-control" required value={patient.phone_number} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type" className="x-small text-muted">
                                    Jenis Pasien
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="type" id="type" className="form-control" required value={patient.type} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="d-flex mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-pen mr-3" />
                                    Sunting Pasien
                                </button>
                                <button type="button" className="btn btn-link btn-link-danger mx-1" onClick={() => deletePatient(patient.id)}>
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