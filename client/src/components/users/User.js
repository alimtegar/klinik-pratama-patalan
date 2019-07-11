import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const User = (props) => {
    // useState
    const [user, setUser] = useState({
        role: '',
        name: '',
        email: '',
    });
    const [res, setRes] = useState(null);

    const fetchUser = () => {
        const user_id = props.match.params.id;

        axios.get(`http://localhost:8000/users/${user_id}`)
            .then((res) => {
                const data = res.data.data;

                setUser(data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    // useEffect
    useEffect(fetchUser, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    };

    const updateUser = (user) => {
        axios.put(`http://localhost:8000/users/${user.id}`, user)
            .then((res) => {
                // props.history.push('/users');

                setRes(res.data);

                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const deleteUser = (user_id) => {
        axios.delete(`http://localhost:8000/users/${user_id}`)
            .then(() => {
                props.history.push('/users');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateUser(user);
    };

    return (
        <section id="users" className="h-100 overflow-hidden">
            <Header title="Profil Pengguna" description="Lorem ipsum dolor sit amet." />
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
                                <select name="role" id="role" className="form-control" required value={user.role} onChange={(e) => handleChange(e)}>
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
                                <input type="text" name="name" id="name" className="form-control" required value={user.name} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="x-small text-muted">
                                    Email / Nama Pengguna
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="email" id="email" className="form-control" readOnly value={user.email} onChange={(e) => handleChange(e)} />
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
                                    <i className="fa fa-pen mr-3" />
                                    Sunting Profil
                                </button>
                                <button type="button" className="btn btn-link btn-link-danger mx-1" onClick={() => deleteUser(user.id)}>
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

export default User;