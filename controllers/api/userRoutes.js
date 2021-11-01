const router = require('express').Router();
const { User } = require('../../models');
const fetch = require('node-fetch');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      console.log("ERROR WRONG USER DATA");

      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      console.log("ERROR WRONG PASSWORD");

      return;
    }
    console.log("NAME, ID", userData.name, userData.id);

    // Create session variables based on the logged in user
    req.session.save(() => {

      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("logged in", req.session.logged_in);
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("logged in");

    });

  } catch (err) {
    console.log("ERROR", err);

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
