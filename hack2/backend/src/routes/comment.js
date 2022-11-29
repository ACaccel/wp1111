// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ comment.js ]
// * PackageName  [ server ]
// * Synopsis     [ Apis of comment ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Comment from '../models/comment'

exports.GetCommentsByRestaurantId = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.restaurantId
    /****************************************/
    // TODO Part III-3-a: find all comments to a restaurant

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    try {
        const cmt = await Comment.find({ restaurantId: id });
        if (cmt) {
            console.log(cmt)
            let result = cmt.map((obj) => {
                return { name: obj.name,
                        rating: obj.rating,
                        content: obj.content }
            })
            res.status(200).send({ message: 'success', contents: result });
        }
        else {
            res.status(200).send({ message: 'error', contents: 'not found' });
        }
    } catch(err) {
        res.status(403).send({ message: 'error', contents: err });
    }
}

exports.CreateComment = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    const newComment = new Comment({ 
        restaurantId: body.restaurantId, 
        name: body.name, 
        rating: body.rating,
        content: body.content });
    console.log('created newComment', newComment);
    newComment.save();
}
