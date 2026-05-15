const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let users = []
let orders = []

// Test server
app.get("/", (req, res) => {
    res.send("SERVER OK")
})

// Đăng ký
app.post("/register", (req, res) => {
    users.push(req.body)

    res.json({
        success: true,
        users
    })
})

// Tạo đơn
app.post("/orders", (req, res) => {
    orders.push(req.body)

    res.json({
        success: true
    })
})

// Xem đơn
app.get("/orders", (req, res) => {
    res.json(orders)
})

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000")
})