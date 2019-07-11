import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import ErrorHandler from '../layout/ErrorHandler';

const Login = () => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [res, setRes] = useState(null);

    // Route guard
    if (authContext.user.id) {
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

        axios.post('http://localhost:8000/login', user)
            .then((res) => {
                setRes(res.data);

                window.scrollTo(0, 0);

                authContext.setAuth(res.data.data);
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
                        <div className="card border border-0 rounded-3 shadow-sm overflow-hidden">
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
                                        <label htmlFor="email" className="x-small text-muted">
                                            Email / Nama Pengguna
                                            <span  className="text-danger ml-1">
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
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="x-small text-muted mr-auto">
                                            <span className="text-danger">*</span> Kolom wajib untuk diisi
                                        </div>
                                        <div className="mx-min-1">
                                            <button className="btn btn-primary mx-1">
                                                {/* <i className="fa fa-sign-in-alt mr-3" /> */}
                                                Masuk Sekarang
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

export default Login;