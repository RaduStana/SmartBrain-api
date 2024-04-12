const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const postgres = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {	res.send('success') })
app.post('/signin', signin.handleSignin(postgres,bcrypt))
app.post('/register', (req,res) => {register.handleRegister(req, res, postgres,bcrypt)})
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,postgres)})
app.put('/image', (req,res) => { image.handleImage(req,res,postgres)})
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

// process.env.PORT = 3000;
app.listen(3000 || process.env.PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
