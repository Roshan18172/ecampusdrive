const connectDB = require('./db')
connectDB();
const express = require('express')
const app = express()
const PORT = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to eCampus')
})

app.listen(PORT, () => {
    console.log(`eCampus server is running on port http://localhost:${PORT}`)
})
