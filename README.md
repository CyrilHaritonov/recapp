### This app is deployed at https://cyrilharitonov.azurewebsites.net/
### Notice that app works only for users who have been manually added in the white list since spotify application is set in devepopment mode

###This webapp has following features:
* creating playlists(with form validation for playlist name length)
* deleting playlists
* adding songs using search from spotify library
* changing order of songs in a playlist
* deleting songs from a playlist
* getting recommendations on what songs you might would like to add into the playlist when editing playlist
* renaming playlists(with form validation)
* exporting playlists in your spotify account
* playing any track using spotify api web player

### Following technologies were used:
* React + Redux toolkit
* NodeJs +  Express + JsonServer
* reactstrap for styling
* spotify-web-api-node for spotify api calls from client and server
* react-spotify-web-playback for web player
* fontawesome for icons
* both axios and fetch for api calls from client
* react-router-dom for routing
