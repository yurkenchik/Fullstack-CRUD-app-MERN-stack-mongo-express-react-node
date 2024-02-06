import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import { getOneUser } from "../../api/user-api.js";
import { useNavigate } from "react-router-dom";


const Read = () => {

    const { id } = useParams()

    const [oneUserData, setOneUserData] = useState(null)
    const navigate = useNavigate()


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

    if (!oneUserData) {
        return <div style={{fontSize: "72px"}} className="bg-primary d-flex justify-content-center vh-100 vw-100 align-items-center">Loading...</div>
    }

    console.log(oneUserData.user.name)

    return (
        <div className="d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2 style={{fontSize: "48px"}}>User details</h2>
                <h2><span className="text-primary">ID: </span>{oneUserData.user._id}</h2>
                <h2><span className="text-primary">Name: </span>{oneUserData.user.name}</h2>
                <h2><span className="text-primary">Email: </span>{oneUserData.user.email}</h2>
                <button onClick={() => navigate("/")}>{"<- Back"}</button>
            </div>
        </div>
    );
};

export default Read;