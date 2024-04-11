const express=require('express');
const router=express.Router();
const playlistController=require('../controllers/playlist_controller');
const passport = require('passport');

router.post(
            '/create',
            playlistController.create
        );
router.get(
        '/getplaylist/:playlistId',
        playlistController.getPlaylist
    );
router.get(
        '/artistplaylist/:artistId',
        playlistController.getArtistplaylist
    );
router.post(
        '/addsong',
        playlistController.addSong
    );


module.exports=router;