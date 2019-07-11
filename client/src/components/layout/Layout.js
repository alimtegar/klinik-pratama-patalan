import React, { Fragment, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import Home from '../home/Home';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Patients from '../patients/Patients';
import AddPatient from '../patients/AddPatient';
import Patient from '../patients/Patient';
import Doctors from '../doctors/Doctors';
import AddDoctor from '../doctors/AddDoctor';
import Doctor from '../doctors/Doctor';
import Rooms from '../rooms/Rooms';
import AddRoom from '../rooms/AddRoom';
import Room from '../rooms/Room';
import Checkups from '../checkups/Checkups';
import AddCheckup from '../checkups/AddCheckup';
import Checkup from '../checkups/Checkup';
import Users from '../users/Users';
import AddUser from '../users/AddUser';
import User from '../users/User';

const Layout = () => {
    // userContext
    const authContext = useContext(AuthContext);

    const validateApiToken = () => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        
        if (auth) {
            axios.post('http://localhost:8000/validate-api-token', { api_token: auth.api_token, })
                .then((res) => {
                    authContext.setAuth(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // useEffect
    useEffect(() => {
        validateApiToken();
    }, []);

    const sidebar = authContext.user.id ? (
        <div className="col-lg-3 px-0">
            <Sidebar user={authContext.user} />
        </div>
    ) : null;

    return (
        <Fragment>
            <Navbar />
            <main id="main">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        {sidebar}
                        <div className={`${authContext.user.id ? 'col-lg-9' : 'col-lg-12'} px-0`}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/dashboard" component={Dashboard} />
                                <Route exact path="/patients" component={Patients} />
                                <Route exact path="/patients/add-patient" component={AddPatient} />
                                <Route exact path="/patients/:id" component={Patient} />
                                <Route exact path="/doctors" component={Doctors} />
                                <Route exact path="/doctors/add-doctor" component={AddDoctor} />
                                <Route exact path="/doctors/:id" component={Doctor} />
                                <Route exact path="/rooms" component={Rooms} />
                                <Route exact path="/rooms/add-room" component={AddRoom} />
                                <Route exact path="/rooms/:id" component={Room} />
                                <Route exact path="/checkups" component={Checkups} />
                                <Route exact path="/checkups/add-checkup" component={AddCheckup} />
                                <Route exact path="/checkups/:id" component={Checkup} />
                                <Route exact path="/users" component={Users} />
                                <Route exact path="/users/add-user" component={AddUser} />
                                <Route exact path="/users/:id" component={User} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Layout;