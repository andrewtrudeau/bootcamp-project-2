const router = require('express').Router();
const { Comment, Artwork } = require('../../models');

// add CRUD function
// add comment
// edit comment
// delete comment
// read comment - find all comments

// Create New Comment //
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        const comment = newComment.get({ plain: true });

        res.status(200).json(comment.id);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Edit Existing Comment //
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update({
            comment_text: req.body.comment_text,
        },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                }
            });

        res.status(200).json(commentData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Add comment to post //
router.put('/:id/add-to-artwork/:artworkID', async (req, res) => {
    try {
        const artworkData = await Artwork.findOne({
            where: {
                id: req.params.artworkID,
            }
        });
        const artwork = artworkData.get({ plain: true });

        let newComments = artwork.comments;
        newComments.push(req.params.id);

        artworkData.update({
            comments: newComments,
        });

        res.status(200).json(artwork)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No Comment found with this id!' });
            return;
        }
        res.status(200).json(commentData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;