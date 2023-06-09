const express = require("express")
const app = express()
var bodyParser = require('body-parser')
const PORT = 5000
const cors = require(`cors`)
app.use(cors())
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const userRoute = require(`./routes/user.route`)
const mejaRoute = require(`./routes/meja.route`)
const menuRoute = require(`./routes/menu.route`)
const transaksiRoute = require(`./routes/transaksi.route`)



app.use("/user", userRoute)
app.use("/meja", mejaRoute)
app.use("/menu", menuRoute)
app.use("/transaksi", transaksiRoute)


app.use(express.static(__dirname))
app.listen(PORT, () => {
    console.log(`PORT ${PORT}`)
    })