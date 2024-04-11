const express=require('express');
const router=express.Router();
const songController=require('../controllers/songs_controller');
const passport = require('passport');


router.post(
        '/create',
        songController.crete
    );
router.get(
        '/mysong',
        songController.mySong
    );
router.get(
        '/artistsong/:artistid',
        songController.artistSongs
    );
router.get(
        '/songname/:songName',
        songController.songName
    );

module.exports=router;