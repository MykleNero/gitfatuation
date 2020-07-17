var axios = require("axios");
var express = require("express");
var cors = require("cors");
var app = express();

require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));

const CLIENT_ID = process.env.GH_CLIENT_ID;
const CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

console.log({ CLIENT_ID, CLIENT_SECRET });
const PORT = 4000;

app.get("/github/access_token", function (req, res) {
  const code = req.query.code;

  return axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      scope: "user repos",
    },
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      console.log(response.data);
      //   res.redirect("http://myjsapp/" + response.data);
      //   console.log("Success " + response);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error("Error " + error.message);
    });
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
