const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//see doc express-validator.gitbub.io/docs
const gravatar = require('gravatar')
const User = require('../../models/User');
const bcrypt = require('bcryptjs')

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
    console.log(req.body); //need bodyparser or express.json() to get req.body
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

    //return json web token
    
    res.send('User saved');
    } catch(err) {
      console.error(err.message);
      res.status(500).send('server error')
    }

    
  }
);

module.exports = router;
