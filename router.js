const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('./db.js');
const userMiddleware = require('./user.js');

const MYSQL_USER_TABLE = process.env.MYSQL_USER_TABLE;

router.get('/', userMiddleware.isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

router.get('/sign-up', (req, res) => {
  res.sendFile(__dirname + '/view/sign-up.html')
});

router.get('/sign-in', (req, res) => {
  res.sendFile(__dirname + '/view/sign-in.html')
});

router.get('/booking', userMiddleware.isLoggedIn,(req, res) => {
  //if (typeof req.headers.authorization == "undefined") res.send(emptyFile);
  res.sendFile(__dirname + '/view/booking.html')
});

router.get('/story', userMiddleware.isLoggedIn, (req, res, next) => {
  if (req.userData) console.log(req.userData);
  res.sendFile(__dirname + '/view/story.html')
});

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM ${MYSQL_USER_TABLE} WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        console.log('This username is already in use!');
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO ${MYSQL_USER_TABLE} (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                console.log('Registered!');
                return res.status(201).send({
                  msg: 'Registered!',
                  url: "/sign-in"
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/sign-in', (req, res, next) => {
  db.query(
    `SELECT * FROM ${MYSQL_USER_TABLE} WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "User or password is incorrect!"
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => { //wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].userid
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            
            db.query(
              `UPDATE ${MYSQL_USER_TABLE} SET last_login = now() WHERE id = '${result[0].id}'`
            );

            return res.status(200).send({
              msg: `Welcome ${result[0].username}`,
              token,
              user: result[0],
            });
          }

          return res.status(401).send({ //wrong username or password
            msg: 'Username or password is incorrect'
          });
        }
      );
    }
  );
});

module.exports = router;