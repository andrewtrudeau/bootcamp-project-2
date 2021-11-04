const router = require('express').Router();
const { User, Artwork } = require('../../models');
const fetch = require('node-fetch');
let path = require('path')
let fs = require('fs');

// Username By Id //
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    const user = userData.get({ plain: true });

    res.status(200).json(user.name);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });

      return;
    }
    const user = userData.get({ plain: true });

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });

      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {

      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });

    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/create-user', async (req, res) => {
  try {

    let user = await User.create(req.body).catch((err) => { console.log(err) });

    res.json({ user: user, message: 'User Created' });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/upload', async (req, res) => {
  try {

    let artwork = await Artwork.create(req.body).catch((err) => { console.log(err) });

    res.json({ artwork: artwork, message: 'Artwork Posted!' });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/uploadFile', async (req, res) => {
  try {
    if (req.files) {
      let file = req.files.image;
      console.log(req.body);

      const fileName = path.parse(file.name).name

      let dir = './db/images/' + fileName;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      file.mv(dir + "/" + file.name);

      res.json({ status: "uploaded" });

    } else {
      res.status(400).json({ status: "No file found." });
    }

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
