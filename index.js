var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const app = express()
const port1 = 3000; // First port (for frontend)

// Use bodyParser middleware to parse JSON data from requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'public'});
})
// About 
app.get('/about', (req, res) => {
    res.sendFile('about.html', {root: 'public'});
})

// Package
app.get('/package', (req, res) => {
    res.sendFile('package.html', {root: 'public'});
})
// Book
app.get('/book', (req, res) => {
    res.sendFile('book.html', {root: 'public'});
})

// Connect to MongoDB (replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI)
mongoose.connect('mongodb+srv://alexgay929:1DsuExsvo8aX9vCX@cluster0.fsy3wif.mongodb.net/formdatasDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/bookings", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var location = req.body.location;
    var guests = req.body.guests;
    var arrival = req.body.arrival;
    var departure = req.body.departure;

    var data = {
        "name" : name,
        "email" : email,
        "phone" : phone,
        "address" : address,
        "location" : location,
        "guests" : guests,
        "arrival" : arrival,
        "departure" : departure
    }

    db.collection('formdatas').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully!");
    });

    return res.redirect('/success.html')
})

app.get("/", (req, res)=> {
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('index.html')
})

app.listen(port1, () => {
    console.log(`Frontend server is listening on port ${3000}`);
  });
  

  
