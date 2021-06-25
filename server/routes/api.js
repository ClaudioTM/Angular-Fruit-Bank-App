const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Item = require('../models/item')


const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db = "mongodb+srv://dbuser:dbuserpw@cluster0.egwwy.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err => {
  if (err) {
    console.error('Error!' + err)
  } else {
    console.log('Connected to mongodb')
  }
})

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.get('/', (req, res) => {
  res.send('From API route')
})

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.points = 1;
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error)
    } else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token, role: user.role, points: user.points })

    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Passwrod')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          // console.log({ token, role: user.role })
          res.status(200).send({ token, role: user.role, points: user.points })
        }
    }
  })
})

router.post('/addItem', (req, res) => {
  let itemData = req.body
  let item = new Item(itemData)
  item.save((error, addedItem) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).send(addedItem)
    }
  })
})

router.get('/displayItems', (req, res) => {
  Item.find((error, item) => {
    if (error) {
      console.log(error)
    } else {
      res.json(item)
    }
  })
})

router.delete('/deleteItem/:id', async (req, res) => {

  // res.status(400).json({ message: "testing" })

  const { id } = req.params
  try {
    const removed = await Item.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong ')
    res.status(200).json(removed)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('updatePoints', (req, res) => {
  let user = req.user;
  user.points - 1;
})

// router.get('/getPoints', (req, res) => {
//   let userData = req.body

//   User.findOne({ token: userData.token }, (error, user) => {
//     if (error) {
//       console.log(error)
//     } else {
//       if (!token) {
//         res.status(401).send('Invalid User')
//       } else {
//           res.status(200).send({ points: user.points })
//         }
//     }
//   })
// })

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

module.exports = router
