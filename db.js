const { Client } = require('pg');

const Database = {};

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'todos',
  password: 'begemotik',
  port: 5432,
});
client.connect();

Database.getTodos = () => new Promise((resolve, reject) => {
  client.query('Select * from listoftodos', (err, res) => {
    if (err) return reject(err);
    return resolve(res.rows);
  })
});

Database.addTodo = (value) => {
  return new Promise((resolve, reject) => {
    client.query(`insert into listoftodos (todo, active) values('${value}', 1)`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  });
};

Database.update = (id, value) => {
  return new Promise((resolve, reject) => {
    client.query(`update listoftodos set todo='${value}' where id=${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
};

Database.delete = (id) => {
  //client.query(`delete from listoftodos where id=${id}`, (err, res) => { // if we want to delete todo
  //change active to 0
  return new Promise((resolve, reject) => {
    client.query(`update listoftodos set active=0 where id=${id}`, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  })
};

module.exports = Database;
