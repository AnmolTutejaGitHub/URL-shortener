const express = require('express');
const app = express();
require('./Database/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 6969;
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Routes 
const userRouter = require('./Database/Routes/user');
app.use(userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})