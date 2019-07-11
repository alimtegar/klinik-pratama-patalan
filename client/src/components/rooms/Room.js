import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Header from '../layout/Header';
import ErrorHandler from '../layout/ErrorHandler';

const Room = (props) => {
    // useState
    const [room, setRoom] = useState({
        name: '',
    });
    const [res, setRes] = useState(null);
    
    // useEffect
    useEffect(() => {
        fetchRoom();
    }, []);

    const fetchRoom = () => {
        const room_id = props.match.params.id;

        axios.get(`http://localhost:8000/rooms/${room_id}`)
            .then((res) => {
                const data = res.data.data;

                setRoom(data.room);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const updateRoom = (room) => {
        axios.put(`http://localhost:8000/rooms/${room.id}`, room)
            .then(() => {
                props.history.push('/rooms');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const deleteRoom = (room_id) => {
        axios.delete(`http://localhost:8000/rooms/${room_id}`)
            .then(() => {
                props.history.push('/rooms');
            })
            .catch((err) => {
                console.log(err);

                setRes(err.response.data);

                window.scrollTo(0, 0);
            });
    };

    const handleChange = (e) => {
        setRoom({
            ...room,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateRoom(room);
    };

    return (
        <section id="rooms" className="h-100 overflow-hidden">
            <Header title="Detail Kamar" description="Lorem ipsum dolor sit amet." />
            <div className="rooms-body h-100 p-4">
                <div className="card border rounded-0 overflow-hidden shadow-sm">
                    <div className="card-body p-4">
                        {res && (<ErrorHandler res={res} />)}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="name" className="x-small text-muted">
                                    Nama Lengkap
                                    <span className="text-danger ml-1">
                                        *
                                    </span>
                                </label>
                                <input type="text" name="name" id="name" className="form-control" required value={room.name} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="d-flex mx-min-1">
                                <button type="submit" className="btn btn-primary mx-1">
                                    <i className="fa fa-pen mr-3" />
                                    Sunting Kamar
                                </button>
                                <button type="button" className="btn btn-link btn-link-danger mx-1" onClick={() => deleteRoom(room.id)}>
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

export default Room;