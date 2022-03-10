const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json', {host: "0.0.0.0"})
const middlewares = jsonServer.defaults()
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

server.use(middlewares)
server.use(router)
server.listen(2000, () => {
    console.log('JSON Server is running')
});

app.post("/refresh", (req, res) => {
   const refreshToken = req.body.refreshToken;
   const spotifyApi = new SpotifyWebApi({
       redirectUri: "http://localhost:3000",
       clientId: "5c74110a77af40ac94d6f1130c58b87e",
       clientSecret: "1d71028631064a72b0353c560e9f2a49",
       refreshToken,
   })

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
});

app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "5c74110a77af40ac94d6f1130c58b87e",
        clientSecret: "1d71028631064a72b0353c560e9f2a49",
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
})

app.listen(3001);