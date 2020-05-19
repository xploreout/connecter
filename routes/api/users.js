const express = require('express');
const router = express.Router();
//see doc express-validator.gitbub.io/docs
const gravatar = require('gravatar')
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password need 6 is required').isLength({ min: 6 })
  ],
   async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password} = req.body;

    try {
      //see if user exist
      let user = await User.findOne({email});

      if (user) {
        return res.status(400).json({errors: [{ msg: 'user already exist'}]})
      } 
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
