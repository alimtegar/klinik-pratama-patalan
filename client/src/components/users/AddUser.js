import React, { useState } from 'react';
import axios from 'axios';

// Components
import ErrorHandler from '../layout/ErrorHandler';

const AddUser = (props) => {
    // useState
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
    });
    const [res, setRes] = useState(null);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/users', user)
            .then(() => {
                props.history.push(`/users`);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    return (
        <section id="users" className="h-100 overflow-hidden">
            <div className="users-header position-relative bg-white p-4 border-bottom">
                <h5 className="font-weight-bold mb-1">
                    Daftarkan Pengguna
                </h5>
                <p className="text-muted x-small mb-0">
                    Lorem ipsum dolor sit amet.
                </p>
            </div>
            <div className="users-body h-100 p-4">
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {res && (
                            <div className="mb-3">
                                <ErrorHandler res={res} />
                            </div>
                        )}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="access" className="x-small text-muted">
                                    Akses
                                <span className="text-danger ml-1">
                                        *
                                </span>
                                </label>
                                <select name="role" id="role" className="form-control" required onChange={(e) => handleChange(e)}>
                                    <option>-</option>
                                    <option value="admin">Admin</option>
                                    <option value="cashier">Kasir</option>
                                    <option value="registrar">Registrar</option>
                                </select>
                            </div>
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
                                <label htmlFor="email" className="x-small text-muted">
                                    Email / Nama Pengguna
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="email" id="email" className="form-control" required onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="x-small text-muted">
                                    Kata Sandi
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="password" name="password" id="password" className="form-control" required onChange={(e) => handleChange(e)} />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="confirm-password" className="x-small text-muted">
                                    Konfirmasi Kata Sandi
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="password" name="confirmPassword" id="confirm-password" className="form-control" onChange={(e) => handleChange(e)} />
                            </div> */}
                            <div className="mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-plus mr-3" />
                                    Daftarkan Pengguna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddUser;