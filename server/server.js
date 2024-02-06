const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routers/userRouter")
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = 8081

const app = express()
app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use(errorMiddleware)

app.set("view engine", "hbs")

const DB_URL = "mongodb+srv://yurailchyshyn06:register06@crud.lmu8ltr.mongodb.net/?retryWrites=true&w=majority"


const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("Connected to database")
        app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`))
    } catch (error) {
        console.log(`something went wrong: ${error}`)
    }
}

start()