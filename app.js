const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mu712576:WRWvJIM0l3kka7A8@bookstore-clustor.hktp40l.mongodb.net/?retryWrites=true&w=majority&appName=bookstore-clustor")

const User = require('./model/userModel')

server.listen(3000, function() {
    console.log('Server is running on port 3000');
});
 