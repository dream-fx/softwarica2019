const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer')


const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());


require('./dbconfig/db');
const Guest = require('./model/guest');
const Host = require('./model/host');
const Home = require('./model/home');
const Booking = require('./model/booking');
const auth = require('./middleware/auth');






