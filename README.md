### This app is deployed at https://cyrilharitonov.azurewebsites.net/
### Notice that app works only for users who have been manually added in the white list since spotify application is set in devepopment mode

### This webapp has following features:
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

### Docker intructions for client + JSON Server build
```
FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 2000

CMD ["node", "server.js"]
```
### Docker instuctions for API express server
```
FROM node:alpine

WORKDIR /usr/app

COPY server.js .
COPY package.json .
COPY package-lock.json .

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]
```
### Pictures
![List of playlists](https://sun9-14.userapi.com/impg/xLK5YL9ahC7gmEXOzz-ujf-HU0Z7TG2vSQ7GoQ/chVGjOi7xAo.jpg?size=1919x919&quality=96&sign=95847b6574b9131c81e61f12a9d16f75&type=album "List of playlists")
![Create new playlist](https://sun9-65.userapi.com/impg/lOH6mUD7q5msIgs85MjG388U61v6GbjmhqWEUA/mpAvunMR5AM.jpg?size=1919x917&quality=96&sign=a7dad5c0236dc07a4def5d7fbc460e32&type=album "Create new playlist")
![View inside of playlist](https://sun9-17.userapi.com/impg/8-o3TP6Z9ePeFwAZe2rTetBBcShITeiuv7iadw/a9o48pBwI-0.jpg?size=1901x917&quality=96&sign=af32a70fb90bf85bad5b83cb7fb0c2f8&type=album "View inside of playlist")
![View inside of playlist when editing](https://sun9-15.userapi.com/impg/yNP1SKJ_joghk6ArA0s4HMbUBGTE5YlR4caojQ/H6v8POr9IqM.jpg?size=1903x917&quality=96&sign=ff1371518a43fc8c051e6f668ca4b506&type=album "View inside of playlist when editing")
