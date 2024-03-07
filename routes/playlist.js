const express=require('express');
const router=express.Router();
const playlistController=require('../controllers/playlist_controller');
const passport = require('passport');

router.post(
            '/create',
            passport.authenticate('jwt',{session:false}),
            playlistController.create
        );
router.get(
        '/getplaylist/:getplaylisId',
        passport.authenticate('jwt',{session:false}),
        playlistController.getPlaylist
    );
router.get(
        '/artistplaylist/:artistId',
        passport.authenticate('jwt',{session:false}),
        playlistController.getArtistplaylist
    );
router.post(
        '/addsong',
        passport.authenticate('jwt',{session:false}),
        playlistController.addSong
    );


module.exports=router;