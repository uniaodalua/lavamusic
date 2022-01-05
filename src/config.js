module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    prefix: process.env.PREFIX || "l.", // bot prefix
    ownerID: process.env.OWNERID || "441367221105852416", //your discord id
    SpotifyID: process.env.SPOTIFYID || "", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "", // spotify client secret
    mongourl: process.env.MONGO_URI || "", // MongoDb URL
    embedColor: process.env.COlOR || "#0045f7", // embed colour
    logs: process.env.LOGS || "928131404221526048", // channel id for guild create and delete logs 

    nodes: {

      host: "disbotlistlavalink.ml",
      id: "local",
      port: 443,
      password: "LAVA",
      secure: true
    
    },
 
}
