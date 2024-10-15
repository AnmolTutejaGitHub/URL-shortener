const express = require('express');
const app = express();
require('./Database/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}` || '*',
    credentials: true, // allowed cookies
};


const PORT = process.env.PORT || 6969;
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes 
const userRouter = require('./Database/Routes/user');
const urlRouter = require('./Database/Routes/url');
app.use(userRouter);
app.use(urlRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})