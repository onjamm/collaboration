import express from "express";

const app = express();

//new port number different from the ones we have used
const PORT = 5000;

//middlware that allows express to read form data
//and store it in the req.body
app.use(express.urlencoded({ extended: true }));

//create a temp array to store submitted appointments
const appointments = [];

//define a default route
app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//submit order route
app.post("/submit-app", (req, res) => {
  //create JSON object to store the appointment data
  const appointment = {
    fname: req.body.fname,
    lname: req.body.lname,
    date: req.body.date,
    time: req.body.time,
    timestamp: new Date(),
  };

  //add app to appointments array
  appointments.push(appointment);

  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//admin route
app.get("/admin", (req, res) => {
  res.send(appointments);
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
