const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    console.log("REDIRECTED")
    return;
  }

  res.render('login');
});

router.get('/create-user', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('create-user');
});

router.get('/artwork', withAuth, async (req, res) => {
  try {
    const artworkData = await Artwork.findAll({
      include: [{ 
        model: User,
        attributes: ['name'],
      }],
    })
  
  
  
  
  } catch {
    res.status(500).json(err);
  }
})

router.get('/artwork/:id',  (req, res) => {

})
module.exports = router;
