var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var favicon = require('serve-favicon')
var path = require('path')
var cookieParser = require('cookie-parser')

const app = express()
const port1 = 3000; // First port (for frontend)

// Use bodyParser middleware to parse JSON data from requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(path.join(__dirname, 'public', 'favicon-32x32.png')));

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
mongoose.connect('mongodb+srv://alexgay929:1DsuExsvo8aX9vCX@cluster0.fsy3wif.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// Create Mongoose schema for Form datas
const Form1Schema = new mongoose.Schema({
    name : String,
    email : String,
    phone : String,
    address : String,
    location : String,
    guests : Number,
    arrival : String,
    departure : String,
    // Add other fields as needed for Form Datas
  });
  
  // Create Mongoose model for Form datas
  const Form1Model = mongoose.model('FormDatas', Form1Schema);
  
  // Create Mongoose schema for Sign Up Formdata
  const Form2Schema = new mongoose.Schema({
    fullname : String,
    signupEmail : String,
    signupPassword : String,
    // Add other fields as needed for Form2
  });
  
  // Create Mongoose model for Sign Up Formdata
  const Form2Model = mongoose.model('SignupformDatas', Form2Schema);
  
  // Route to handle Formdatas
  app.post('/bookings', (req, res) => {
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
    
  });

  
  // Route to handle Form2 data
  app.post('/sign_up', (req, res) => {
    // Create a new document for Form2 data
         var signupFullname = req.body.signupFullname;
         var signupEmail = req.body.signupEmail;
         var signupPassword = req.body.signupPassword;
    
         var data = {
             "name" : signupFullname,
             "email" :  signupEmail,
             "password" : signupPassword,
    }
    db.collection('signupformdatas').insertOne(data,(err,collection)=>{
                 if(err){
                     throw err;
                 }
                 console.log("Record Inserted Successfully!");
             });
        
             return res.redirect('/signupsuccess.html')
        });

  app.get("/", (req, res)=> {
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('index.html')
})

app.listen(port1, () => {
    console.log(`Frontend server is listening on port ${3000}`);
  });
  

  
