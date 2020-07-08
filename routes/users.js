var express = require('express');
const functions = require('../database/functions');
var router = express.Router();
var app = express();

const fromUsers = 'users';
const fromOpp = 'opportunities';

app.use(express.json({}));

router.get('/', function(req, res, next)
{

  let all = functions.getAll(fromUsers);

  all.then(
    ok => res.send(Object.values(ok)),
    err => res.send(err)
  );

});

router.get('/:email', function(req, res, next)
{

  let client = functions.getOne(fromUsers, req.params.email);

  client.then(
    ok => res.send(ok),
    err => res.send(err)
  );

});

router.get('/opp/:email', function(req, res, next)
{

  let opp = functions.getOne(fromOpp, req.params.email);

  opp.then(
    ok => res.send(ok.opportunities),
    err => res.send(err)
  );

});

router.put('/opp/:email', function(req, res, next)
{

  let opp = functions.update(fromOpp, req.params.email, {"opportunities":req.body});

  opp.then(
    ok => res.send(ok),
    err => res.send(err)
  );

});

module.exports = router;