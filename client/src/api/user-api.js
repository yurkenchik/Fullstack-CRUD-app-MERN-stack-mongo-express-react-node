import axios from "axios"
const baseURL = "http://localhost:8081"

const api = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json"
    },
})

export const getAllUsers = async (data) => {
    try {
        const response = await api.get("/users/get-users", data)
        const usersData = response.data.allUsers
        console.log(usersData)

        return usersData

    } catch (error) {
        console.log(`Error fetching data: ${error}`)
        throw error
    }
}

export const createUser = async (createUserData) => {
    try {
        const response = await api.post("/users/add-user", createUserData)
        const newUser = response.data
        console.log(newUser)

        return newUser
    } catch (error) {
        console.log(`Error creating new user: ${error}`)
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/delete-user/${id}`, )
        const deletedUser = response.data

        return deletedUser
    } catch (error) {
        console.log(`Couldn\`t delete a user: ${error}`)
        throw error
    }
}

export const getOneUser = async (id) => {
    try {
        const response = await api.get(`/users/get-user/${id}`,)
        const user = response.data

        return user
    } catch (error) {
        console.log(`Couldn\`t find this user: ${error}`)
        throw error
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await api.put(`/users/update-user/${id}`, data)
        const updatedUser = response.data

        return updatedUser
    } catch (error) {

    }
}