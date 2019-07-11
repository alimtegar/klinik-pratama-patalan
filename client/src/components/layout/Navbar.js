import React, { useContext, useState, useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// Context
import { AuthContext } from '../../contexts-provider/contexts';

const Navbar = (props) => {
    const authContext = useContext(AuthContext);

    // useState
    const [isDropdownShow, setIsDropdownShow] = useState(false);

    // useEffect
    useEffect(() => {
        document.querySelector('#main').addEventListener('click', hideDropdown);
    }, []);

    const hideDropdown = () => {
        setIsDropdownShow(false);
    };

    const toggleDropdown = () => {
        setIsDropdownShow(!isDropdownShow);
    };

    const logout = () => {
        authContext.removeAuth();

        props.history.push('/login');
    };

    // const search = authContext.user.id ? (
    //     <form className="navbar-form search col-6 mx-min-2 px-0">
    //         <div className="input-group bg-white rounded-3 shadow-sm">
    //             <div className="input-group-prepend z-plus-1">
    //                 <div className="input-group-text square bg-transparent mr-min-3 border-0">
    //                     <i className="fa fa-search" />
    //                 </div>
    //             </div>
    //             <input type="text" className="form-control" />
    //         </div>
    //     </form>
    // ) : null;

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-primary p-2 z-plus-1 shadow-sm">
            <a href="/" className="navbar-brand font-weight-bold col-3 mr-auto px-0">
                {/* <i className="fa fa-clinic-medical mr-3"/> */}
                <i className="fa fa-clinic-medical ml-2 mr-3" />
                Klinik Pratama Patalan
            </a>
            {authContext.user.id ? (
                <div className="d-flex justify-content-end col-3 ml-auto px-0">
                    <ul className="navbar-nav justify-content-end col-3 ml-auto px-0">
                        <li className="nav-item dropdown">
                            <span id="navbar-dropdown" className="more nav-link dropdown-toggle square px-0" role="button" aria-haspopup="true" aria-expanded="false" onClick={toggleDropdown}>
                                <i className="fa fa-ellipsis-v" />
                                {isDropdownShow ? (
                                    <div className="dropdown-menu m-0 py-0 border rounded-0 shadow-sm" aria-labelledby="navbar-dropdown">
                                        {/* <button className="dropdown-item my-1" onClick={logout}>
                                            <i className="fa fa-cog mr-3" />
                                            Pengaturan
                                        </button> */}
                                        <button className="dropdown-item my-1" onClick={logout}>
                                            <i className="fa fa-sign-out-alt mr-3" />
                                            Keluar
                                        </button>
                                    </div>
                                ) : null}
                            </span>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="d-flex justify-content-end col-3 ml-auto px-0">
                    <ul className="navbar-nav justify-content-end col-3 ml-auto px-0">
                        <li className="nav-item dropdown">
                            <span id="navbar-dropdown" className="more nav-link dropdown-toggle square px-0" role="button" aria-haspopup="true" aria-expanded="false" onClick={toggleDropdown}>
                                <i className="fa fa-ellipsis-v" />
                                {isDropdownShow ? (
                                    <div className="dropdown-menu m-0 py-1 border rounded-0 shadow-sm" aria-labelledby="navbar-dropdown">
                                        <NavLink exact to="/login" className="dropdown-item">
                                            <i className="fa fa-sign-in-alt mr-3" />
                                            Masuk
                                        </NavLink>
                                        <NavLink exact to="/register" className="dropdown-item">
                                            <i className="fa fa-user-plus mr-3" />
                                            Daftar
                                        </NavLink>
                                    </div>
                                ) : null}
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default withRouter(Navbar);