const connectDB = require('./db')
connectDB();

const express = require('express')
const app = express()

const PORT = 5000;

app.use(express.json());

const cors = require('cors');
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to eCampus')
})

//avaliable routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/student',require('./routes/student'))
app.use('/api/drive',require('./routes/drive'))

app.listen(PORT, () => {
    console.log(`eCampusDrive server is running on port http://localhost:${PORT}`)
})
