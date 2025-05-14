const express = require('express');
const startDB = require('./config/database'); 
const cookieParser=require('cookie-parser');
const router = require('./routes/auth-route');
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json())
app.use("/api",router)
startDB();


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
