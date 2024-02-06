import React, {useState, useEffect} from 'react';
import axios from "axios"
import { Link } from "react-router-dom"
import {deleteUser, getAllUsers} from "../../api/user-api.js";


const Home = () => {

    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getAllUsers()
                setIsLoaded(true)
                setData(usersData)
            } catch (error) {
                console.log(`Error fetching data: ${error}`)
            }
        }

        fetchData()
    }, []);

    const deleteUserFromDB = async (userId) => {
        try {
            await deleteUser(userId)
            location.reload()
        } catch (error) {
            console.log(`Error fetching data: ${error}`)
        }
    }


    return (
        <div className="d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Users List</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/create" className="btn btn-success">Create +</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {isLoaded ? data.map((user, index) => {
                        return <tr key={index + 1}>
                            <td style={{fontSize: "10px"}}>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/read/${user._id}`} className="btn btn-sm btn-info">Read</Link>
                                <Link to={`/edit/${user._id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteUserFromDB(user._id)}>Delete</button>
                            </td>

                        </tr>
                    }) : <div style={{fontSize: "48px", textAlign: "center"}}>Loading...</div>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;