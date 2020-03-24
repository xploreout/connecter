const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

let profile = {};

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Server Error' });
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skill is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      skills,
      bio,
      status,
      githubusername,
      social,
      // education,
      experience
    } = req.body;

    let profileFields = {};
    let socialFields = {};
    //   // educationFields,
    //   // experienceFields

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    const { youtube, twitter, instagram, linkedin, facebook } = social;
    // const { school, degree } = education;
    // const { title, company, website, location, from, to, current, description } = experience;

    socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // educationFields = { school, degree };

    profileFields = {
      user: req.user.id,
      company,
      website,
      location,
      status,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => skill.trim()),
      bio,
      social: socialFields
      // education: educationFields
    };

    try {
      profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.');
    }
  }
);

//@delete profile and user
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json('User and profile deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is needed')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      title,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      company,
      title,
      website,
      location,
      from,
      to,
      current,
      description
    };

    try {
      profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { experience } = profile;

    profile.experience = profile.experience.filter(
      id => id._id.toString() !== req.params.exp_id
    );

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree } = req.body;
    const eduFields = { school, degree };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(eduFields);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter(
      edu => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();

    res.json(profile);
  } catch (error) {}
});

module.exports = router;
