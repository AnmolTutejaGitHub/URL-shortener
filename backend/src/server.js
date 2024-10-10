const express = require('express');
const app = express();
require('./Database/mongoose');

const PORT = process.env.PORT || 6969;

// Routes 
const userRouter = require('./Database/Routes/user');
app.use(userRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})