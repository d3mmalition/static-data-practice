const express = require("express");
const app = express();

const users = require("./data/users-data");

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.use("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundUser = users.find((users) => users.id === Number(userId));

  if (foundUser) {
    res.json({ data: foundUser });
  } else {
    next(`User ID not found: ${userId}`);
  }
});

// Array of all states from /states in the form of { data: Array }
app.use("/users", (req, res) => {
  res.json({ data: users });
});


const states = require("./data/states-data");
// Array of users from /users in form of { data: Array }
app.use("/states", (req, res) => {
  res.json({ data: states });
});
// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }

app.use("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;
  const foundState = states.find((states) => states.id === Number(stateCode));

  if (foundState) {
    res.json({ data: { name: foundState, stateCode: stateCode}});
  } else {
    next(`State code not found: ${stateCode}`);
}
});


// TODO: add not-found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
