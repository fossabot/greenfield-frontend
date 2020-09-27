import axios from 'axios';

require('dotenv').config();

export default {
  path: '/api/login',
  async handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'OPTIONS, POST');
      res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.end();
    }

    if (req.method === 'POST') {
      const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'password',
        username: req.body.username,
        password: req.body.password,
      };

      axios.post(`${process.env.API_URL}/oauth/token`, data)
        .then((response) => {
          res.end(JSON.stringify(response.data));
        })
        .catch((error) => {
          res.statusCode = error.response.status;
          res.end(JSON.stringify(error.response.data));
        });
    }
  },
};
