import React, {useState} from 'react';
import axios from "axios"
import {createUser} from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [values, setValues] = useState({
        name: "",
        email: ""
    })

    const navigate = useNavigate()

    const handleCreateUser = async (event) => {
        event.preventDefault()

        try {
            await createUser(values)
            navigate("/")
        } catch (error) {
            console.log(`Error fetching data: ${error}`)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
            <div className="w-50 bg-white p-3">
                <form action="" onSubmit={handleCreateUser}>
                    <h2>Add Users</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="form-control"
                            onChange={event => setValues({...values, name: event.target.value})}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter email"
                            className="form-control"
                            onChange={event => setValues({...values, email: event.target.value})}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Create;