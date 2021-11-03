const router = require('express').Router();
const { User, Artwork, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // const userData = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    // });

    // const users = userData.map((user) => user.get({ plain: true }));

    const artData = await Artwork.findAll();

    const art = artData.map((art) => art.get({ plain: true }));

    res.render('homepage', {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      artworks: art,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/upload', withAuth, async (req, res) => {
  try {

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    const user = userData.get({ plain: true });

    res.render('upload', { user: user });

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

  res.render('login', { message: "Welcome" });
});

router.get('/create-user', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { create: true, message: "Create User" });
});

router.get('/artwork/:id', withAuth, async (req, res) => {
  try {
    const artworkData = await Artwork.findOne({
      where: {
        id: req.params.id,
      },
    });

    const artwork = artworkData.get({ plain: true });

    const userData = await User.findOne({
      where: {
        id: artwork.user_id,
      },
    });

    const user = userData.get({ plain: true });

    let comments = [];
    const commentIdList = artwork.comments;

    commentIdList.forEach(async element => {
      const commentData = await Comment.findOne({
        where: {
          id: element,
        },
      });

      const comment = commentData.get({ plain: true });
      comments.push(comment);
    });

    res.render('specific-art-page', { artwork: artwork, user: user, comments: comments });
  } catch (err) {

    console.log(err)
    res.status(400).json(err);

  }
})

router.get('/artwork/:id', (req, res) => {

})
module.exports = router;
