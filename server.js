const express = require('express')
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

const users = [
  { name: 'Marcos', email: 'nvmarcosalex@gmail.com', pass: '123' },
  { name: 'Andre', email: 'andre@gmail.com', pass: '123' },
  { name: 'Java', email: 'java@gmail.com', pass: '123' }
];

app.get('/users', (req, res) => {
  res.json(users);
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.pass, 10);
    console.log(hashedPassword);
    const user = { ...req.body, pass: hashedPassword };
    console.log(user)
    users.push(user);
    res.status(201).send();
  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }

})

app.post('/users/login', async (req, res) => {
  try {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
      res.status(400).send("Cannot find user")
    }

    console.log(req.body.pass);
    console.log(user.pass);

    if (await bcrypt.compare(req.body.pass, user.pass)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }

  }
  catch (error) {
    console.log(error);
    res.status(500).send();
  }
})

app.listen(3000);