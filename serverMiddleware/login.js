import axios from 'axios';

require('dotenv').config();

export default {
  path: '/api/login',
  async handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('HELLO', process.env.API_URL);

    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'OPTIONS, POST');
      res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.end();
    }

    console.log(req.method);
    if (req.method === 'POST') {
      console.log("POSTTT");
      axios.post(`${process.env.API_URL}/oauth/token`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'password',
        username: req.body.username,
        password: req.body.password,
      })
        .then((response) => {
          console.log('cool');
          res.end(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log("error", error);
          res.statusCode = error.response.status;
          res.end(JSON.stringify(error.response.data));
        });
    }
  },
};
