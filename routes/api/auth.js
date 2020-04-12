const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const config = require('config')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.get('/', auth, async (req,res) => {
  try {
    const user =  await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.err(err.message);
    res.status(500).send('Server Error')
  }
});

//auth user and get token
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
   async (req, res) => {
    console.log(req.body); //need bodyparser or express.json() to get req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password} = req.body;

    try {
      //see if user exist
      let user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({errors: [{ msg: 'Invalid credentials'}]})
      } 
    
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
          .status(400)
          .json({errors: [{ msg: 'Invalid Credentials'}]});
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 }, 
        (err, token)=>{
          if(err) throw err;
          res.json({ token })
        });

    //can check token from postman and paste to jwt.io
    
    // res.send('User saved');
    } catch(err) {
      console.error(err.message);
      res.status(500).send('server error')
    }
  }
);

module.exports = router;