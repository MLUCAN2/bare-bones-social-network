const router= require('express').Router();
const {getUsers,getSingleUser,updateUser,deleteUser,addFriend, removeFriend}= require('../../controllers/userController')

router.route('/').get(getUsers);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
