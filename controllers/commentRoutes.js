const router = require('express').Router();
const { User, Artwork } = require('../models');
const withAuth = require('../utils/auth');


// add CRUD function
    // add comment
    // edit comment
    // delete comment
    // read comment - find all comments

router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment)
    } catch(err) {
        res.status(400).json(err);
    }
})

//remove me 

// router.get('/', withAuth, async (req, res) => {

// })

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!commentData){
            res.status(404).json({message: 'No Commet found with this id!'});
            return
        }
        res.status(200).json(commentData)
    } catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;