const UserController = require("../controllers/UserController")
const Router = require("express")
const router = new Router()
const { check } = require("express-validator")


router.post("/add-user", [
    check("name", "Enter correct name").notEmpty(),
    check("email", "Enter correct email").isEmail()
], UserController.create)
router.get("/get-users", UserController.getAll)
router.get("/get-user/:id", UserController.getOne)
router.delete("/delete-user/:id", UserController.delete)
router.put("/update-user/:id", [
    check("name", "Enter correct name").notEmpty(),
    check("email", "Enter correct email").isEmail()
], UserController.update)

module.exports = router