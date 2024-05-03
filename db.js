const mongoose = require('mongoose');
//const { MongoClient } = require('mongodb');
require('dotenv').config();

DB_PASSWORD = process.env.DB_PASSWORD;

const dbURI = `mongodb+srv://salmaelfadil:${DB_PASSWORD}@cluster0.lsglm1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err.message));
