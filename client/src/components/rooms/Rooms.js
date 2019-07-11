import React, { Fragment, useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Helpers
import { getId } from '../../helpers';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

// Components
import Header from '../layout/Header';
import ResultsCount from '../layout/ResultsCount';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

const Rooms = () => {
    // useContext
    const authContext = useContext(AuthContext);

    // useState
    const [rooms, setRooms] = useState(null);

    const fetchRooms = () => {
        axios.get('http://localhost:8000/rooms')
            .then((res) => {
                const data = res.data.data;

                setRooms(data.rooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const floatingActionButton = authContext.user.role === 'admin' ? (
        <NavLink to="/rooms/add-room" className="btn btn-primary btn-float square rounded-circle shadow-sm">
            <i className="fa fa-plus" />
        </NavLink>
    ) : null;

    return (
        <section id="rooms" className="overflow-hidden h-100">
            <Header title="Kamar" description="Lorem ipsum dolor sit amet." floatingActionButton={floatingActionButton} />
            <div className="rooms-body p-4 h-100">
                <ResultsCount count={rooms ? rooms.length : 0} />
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {rooms ? (
                            <Fragment>
                                {rooms.length ? (
                                    <table className="table mt-min-2 mb-0">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Kamar</th>
                                            <th><div className="square-sm"></div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms.map((room, key) => (
                                            <Fragment key={room.id}>
                                                <tr>
                                                    <td>{getId(room.id)}</td>
                                                    <td>{room.name}</td>
                                                    <td className="text-right">
                                                        <NavLink to={`/rooms/${room.id}`} className="btn btn-link btn-sm square square-sm mx-1">
                                                            <i className="fa fa-chevron-right" />
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                                {(key + 1) < rooms.length && (
                                                    <tr className="divider">
                                                        <td></td>
                                                    </tr>
                                                )}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                ) : (<Alert type="warning" message="Tidak ditemukan data untuk ditampilkan!" />)}
                            </Fragment>
                        ) : (<Spinner />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rooms;