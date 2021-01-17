const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weather = require("./utils/weather-service");

//create express app
const app = express();
const port = process.env.PORT || 3000;
console.log("PORT", port);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
//partials are pages shared across the app
const partialsPath = path.join(__dirname, "../templates/partials");

//set the directory for the routes
app.use(express.static(publicDirectoryPath));

//render dynamic views using hbs
app.set("view engine", "hbs");
//point the views folder to template
app.set("views", viewsPath);
//partials are files that can be reused across the app (header, menu, ..)
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  //renders the view with filename index
  res.render("index", { title: "Weather", name: "Reem Kalot" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Reem Kalot" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page",
    name: "Reem Kalot",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address should be provided" });
  }
  weather.getWeatherForecast(
    req.query.address,
    ({ forecast, location } = {}, err) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send({ forecast, location, address: req.query.address });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article Not Found",
    message: "Error code 404, Help Article Page Not Found",
    name: "Reem Kalot",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Error code 404, Page Not Found",
    name: "Reem Kalot",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
