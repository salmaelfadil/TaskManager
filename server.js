const express = require('express');
require('./db');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser')


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
