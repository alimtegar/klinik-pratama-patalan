import React, { useContext, useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// Helpers
import { translateRole } from '../../helpers';

// Context
import { AuthContext } from '../../contexts-provider/contexts';

const Sidebar = (props) => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [navLinks, setNavLinks] = useState([
        {
            id: 1,
            to: '/dashboard',
            icon: 'fa-home',
            name: 'Beranda',
            exact: true,
        },
        {
            id: 2,
            to: '/patients',
            icon: 'fa-user-injured',
            name: 'Pasien',
            exact: false,
        },
        {
            id: 3,
            to: '/doctors',
            icon: 'fa-user-md',
            name: 'Dokter',
            exact: false,
        },
        {
            id: 4,
            to: '/rooms',
            icon: 'fa-bed',
            name: 'Kamar',
            exact: false,
        },
        {
            id: 5,
            to: '/checkups',
            icon: 'fa-stethoscope',
            name: 'Pemeriksaan',
            exact: false,
        },
    ]);

    // useEffect
    useEffect(() => {
        if (authContext.user.role === 'admin') {
            setNavLinks([
                ...navLinks,
                {
                    id: 6,
                    to: '/users',
                    icon: 'fa-id-card-alt',
                    name: 'Pengguna',
                    exact: false,
                },      
            ]);
        }
    }, []);
    
    return (
        <nav id="sidebar" className="bg-white h-100 shadow-sm border-right shadow-sm">
            <div className="sidebar-account d-flex p-4 mb-min-4">
                <div>
                    <h5 className="font-weight-bold mb-1">
                        {props.user.name}
                    </h5>
                    <p className="x-small text-muted mb-0">
                        Masuk sebagai <span className="font-weight-bold text-primary text-capitalize">{translateRole(props.user.role)}</span>
                    </p>
                </div>
            </div>
            <ul className="nav flex-column my-min-1 p-3">
                {navLinks.map((navLink) => (
                    <li className="nav-item my-1" key={navLink.id}>
                        <NavLink className="nav-link" to={navLink.to} exact={navLink.exact}>
                            <i className={`fa ${navLink.icon} text-center mr-3`} style={{width: 20}} />
                            {navLink.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default withRouter(Sidebar);