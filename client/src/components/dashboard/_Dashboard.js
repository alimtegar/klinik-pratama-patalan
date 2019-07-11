import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

const Dashboard = () => {
    // useContext
    const authContext = useContext(AuthContext);

    const pages = [
        {
            id: 1,
            name: 'Pasien',
            icon: 'fa-user-injured',
            to: '/patients',
        },
        {
            id: 2,
            name: 'Dokter',
            icon: 'fa-user-md',
            to: '/patients',
        },
        {
            id: 3,
            name: 'Kamar',
            icon: 'fa-bed',
            to: '/patients',
        },
        {
            id: 4,
            name: 'Pemeriksaan',
            icon: 'fa-stethoscope',
            to: '/checkups',
        },
    ];
    let mainPage = null;

    switch (authContext.user.role) {
        case 'admin':
            mainPage = {
                name: 'Daftarkan Pasien',
                description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
                icon: 'fa-user-plus',
                to: '/patients/add-patient',
            } ;
            break;
        case 'registrar':
            mainPage = {
                name: 'Daftarkan Pasien',
                description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
                icon: 'fa-user-plus',
                to: '/patients/add-patient',
            } ;
            break;
        case 'cashier':
            mainPage = {
                name: 'Tagih Pembayaran',
                description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
                icon: 'fa-money-bill-wave-alt',
                to: '/checkups',
            } ;
            break;
        default:
            mainPage = null;
            break;
    }

    return (
        <section id="dashboard" className="h-100 overflow-hidden">
            <div className="dashboard-header position-relative bg-white p-4 border-bottom">
                <h5 className="font-weight-bold mb-1">
                    Beranda
                </h5>
                <p className="text-muted x-small mb-0">
                    Lorem ipsum dolor sit amet.
                </p>
            </div>
            <div className="dashboard-body h-100 p-4">
                <div className="dashboard-pages my-min-2">
                    <div className="row mx-min-2">
                        {mainPage && (
                            <div className="col-12 p-2">
                                <div className="d-flex align-items-center bg-primary text-white p-4 rounded-3">
                                    <div>
                                        <div className="square square-lg bg-white text-primary rounded-circle mr-3">
                                            <i className={`fa ${mainPage.icon} fa-lg`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-weight-bold mb-1">
                                            {mainPage.name}
                                        </h5>
                                        <p className="x-small mb-0">
                                            {mainPage.description}
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <NavLink to={mainPage.to} className="btn btn-link btn-sm square square-sm">
                                            <i className="fa fa-chevron-right" />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                        {pages.map((page) => (
                            <div className="col-lg-6 px-2" key={page.id}>
                                <div className="dashboard-pages-item card my-2 border-0 rounded-0 overflow-hidden">
                                    <div className="card-body d-flex align-items-center text-center p-4">
                                        <div className="square square-lg bg-primary text-white rounded-circle mr-3">
                                            <i className={`fa ${page.icon} fa-lg`} />
                                        </div>
                                        <div className="text-left">
                                            <h5 className="font-weight-bold mb-1">
                                                {page.name}
                                            </h5>
                                            <p className="x-small text-muted mb-0">
                                                Lorem ipsum dolor sit amet.
                                        </p>
                                        </div>
                                        <div className="ml-auto">
                                            <NavLink to={page.to} className="btn btn-link btn-sm square square-sm">
                                                <i className="fa fa-chevron-right" />
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;