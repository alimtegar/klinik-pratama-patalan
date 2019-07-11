import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import ErrorHandler from '../layout/ErrorHandler';

const Register = () => {
    // useContext
    const context = useContext(AuthContext);

    // useState
    const [user, setUser] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [res, setRes] = useState(null);

    // Route guard
    if(context.user.id) {
       return (<Redirect to="/dashboard" />);
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/register', user)
            .then((res) => {
                setRes(res.data);

                window.scrollTo(0, 0);

                context.setAuth(res.data.data);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    return (
        <section id="login" className="h-100 overflow-hidden">
            <div className="login-body h-100 p-4">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-lg-6">
                        <div className="card border-0 rounded-0 shadow-sm overflow-hidden">
                            <div className="card-header bg-primary text-white p-4 text-center border-bottom-0">
                                <h3 className="font-weight-bold mb-1">
                                    Klinik Pratama Patalan
                                </h3>
                                <p className="x-small mb-0">
                                    Jl. Parangtritis KM 15 Gaduh, Patalan, Jetis, Bantul
                                </p>
                            </div>
                            <div className="card-body border border-top-0 p-4">
                                {res && (<ErrorHandler res={res} />)}
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
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="x-small text-muted mr-auto">
                                            <span className="text-danger">*</span> Kolom wajib untuk diisi
                                        </div>
                                        <div className="mx-min-1">
                                            <button type="submit" className="btn btn-primary mx-1">
                                                {/* <i className="fa fa-user-plus mr-3" /> */}
                                                Daftar Sekarang
                                                <i className="fa fa-chevron-right ml-3" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;