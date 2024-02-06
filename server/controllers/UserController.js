const User = require("../models/User")
const { validationResult } = require("express-validator")
const ApiError = require("./../exceptions/api-error")


module.exports = {
    create: async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(`Error when creating a user: `, errors.array()))
            }
            const { name, email } = req.body
            const emailCandidate = await User.findOne({email})

            if (emailCandidate) {
                 next(ApiError.BadRequest("User with this email already exists", errors.array()))
            }

            await User.create({name, email})
            return res.status(200).json({message: "You added new user"})
        } catch (error) {
            next(error)
        }
    },

    getOne: async (req, res, next) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            if (!user) {
                return next(ApiError.BadRequest("User is not found", errors.array()))
            }
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedUser = await User.findOneAndDelete({_id: id})
            if (!deletedUser) {
                return next(ApiError.BadRequest("User is not found", errors.array()))
            }
            res.status(200).json({message: "User was deleted", deletedUser})
        } catch (error) {
            next(error)
        }
    },

    getAll: async (req, res, next) => {
        try {

            const allUsers = await User.find()
            res.status(200).json({allUsers})
        } catch (error) {
            next(error)
        }

    },

    update: async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(`Incorrect data: ${errors}`))
            }
            const { id } = req.params
            const { name, email } = req.body
            if (name.length === 0) {
                throw new Error("Incorrect name")
            }
            const result = await User.replaceOne({_id: id}, req.body)
            console.log(result)
            res.status(200).json({updatedCount: result.modifiedCount, changes: req.body})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}

