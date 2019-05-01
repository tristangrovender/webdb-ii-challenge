const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then( zoos => {res.status(200).json(zoos)})
  .catch((err) => {
    res.status(500).json({ error: 'could not load zoos', err });
  });
});

 server.get('/api/zoos/:id', (req, res) => {
  const zooID = req.params.id;

   db('zoos')
  .where({ id: zooID })
  .then( zoo => {
    res.status(200).json(zoo);
  })
  .catch( err => {
    res.status(500).json({ error: 'could not load zoo', err })
  })
});

 // POST
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

   db.insert(zoo)
  .into('zoos')
  .then( zoo => {
    res.status(201).json({ message: 'successfully created zoo' })
  })
  .catch( err => {
    res.status(500).json({ error: 'could not create new zoo', err })
  })
});

 // DELETE
server.delete('/api/zoos/:id', (req, res) => {
  const zooID = req.params.id;

   db('zoos')
  .where({ id: zooID })
  .delete()
  .then( zoo => {
    res.status(200).json({ message: 'successfully deleted zoo', zoo })
  })
  .catch( err => {
    res.status(500).json({ error: 'could not delete zoo', err })
  })
});

 // PUT
server.put('/api/zoos/:id', (req, res) => {
  const zooID = req.params.id;
  const body = req.body;

   db('zoos')
  .where({ id: zooID })
  .update(body)
  .then( zoo => {
    res.status(200).json({ message: 'successfully updated zoo', zoo })
  })
  .catch( err => {
    res.status(500).json({ error: 'could not update zoo', err })
  })
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


// const knexConfig = {
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   connection: {
//     filename: 'data/lambda.sqlite3',
//   },
// };

// const db = knex(knexConfig);
