import React, {useState, useEffect} from 'react';
import {getOneUser, updateUser} from "../../api/user-api.js";
import {useParams, useNavigate} from "react-router-dom";

const Edit = () => {

    const [oneUserData, setOneUserData] = useState(null)
    const [userData, setUserData] = useState({
        name:  "",
        email: ""
    })

    const navigate = useNavigate()


    const { id } = useParams()

    useEffect(() => {

        const getOneUserFetcher = async () => {
            try {
                const readUserInfo = await getOneUser(id)
                setOneUserData(readUserInfo)
                console.log(readUserInfo)

            } catch (error) {
                console.log(`Error fetching data: ${error}`)
            }
        }

        getOneUserFetcher()
    }, [id]);
    //
    // const handleInputChange = (event) => {
    //     const { name, value } = event.target
    //     setUserData({...userData, [name]: value})
    // }

    const handleUserUpdate = async () => {
        event.preventDefault()
        try {
            const updatingUser = await updateUser(id, userData)
            console.log("User was successfuly updated", updatingUser)
            navigate("/")
        } catch (error) {
            console.log(`Error fetching data: ${error}`)
        }
    }

    // useEffect(() => {
    //     if (oneUserData) {
    //         setUserData({
    //             name: oneUserData.student.name,
    //             email: oneUserData.student.email
    //         })
    //     }
    // }, [oneUserData]);

    if (!oneUserData) {
        return <div className="d-flex vh-100 vw-100 justify-content-center align-items-center fs-5 bg-primary">Loading...</div>
    }


    return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-primary">
            <form action="" className="bg-white rounded-3 w-50 p-3">
                <h2>Edit User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={event => setUserData({...userData, name: event.target.value})}
                        placeholder={oneUserData.user.name}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={event => setUserData({...userData, email: event.target.value})}
                        placeholder={oneUserData.user.email}
                    />
                </div>
                <button className="btn btn-success" onClick={handleUserUpdate}>Submit</button>
            </form>
        </div>
    );
};

export default Edit;