var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var favicon = require('serve-favicon')
var path = require('path')
var cookieParser = require('cookie-parser')
const session = require('express-session');

const app = express()
const port1 = 3000; // First port (for frontend)

// Use bodyParser middleware to parse JSON data from requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// // Middleware to parse form data and set up session
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'AmariKanoahGay0616', // Change this to a secure secret
  resave: false,
  saveUninitialized: true
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory to the 'views' folder
app.set('views', path.join(__dirname, 'views'));


//  Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is logged in
    return next();
  }
    // User is not logged in, redirect to the login page
   // Redirect to the home page with the alert JavaScript
   return res.send(`
   <script>
     alert('ERROR! You need to sign up and log in before booking!');
     window.location.href = '/';
   </script>
 `);
};



// Home Route
// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: 'public'});
// })


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
  app.post('/bookings', isAuthenticated, (req, res) => {
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
  app.post('/sign_up',  (req, res) => {
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


  // Endpoint to get the login status
app.get('/api/login-status', (req, res) => {
    res.json({ isLoggedIn: req.session.isLoggedIn || false });
  });


app.post("/login", (request, response)=> {
    try{
        // get data from index.html form

        const loginEmail = request.body.loginEmail;
        const loginPassword = request.body.loginPassword;

        // get data from database
        const usermail = db.collection('signupformdatas').findOne({ email: loginEmail }, (err, res) => {
            if (err) {
              throw err;
            }
          
            if (!res) {
              // The user with the specified email was not found.
              response.send("Information Invalid. Please create an account first");
            } else {
              // User found, now check the password.
              if (res.password === loginPassword) {
                // Set the user as logged in by setting the session property
                request.session.user = res;
                request.session.isLoggedIn = true;
                console.log("Login Successful!");
                response.redirect("/loginsuccess.html");
              } else {
                console.log("Password does not match");
                response.send("Password does not match");
              }
            }
          });
          
     }catch(error){

        console.log("Invalid Information");
     }
});


app.get('/', (req, res) => {
  res.render('index'); // Assumes there's an 'index.ejs' file in the 'views' folder
});

app.get('/book', isAuthenticated, (req, res) => {
  res.render('book'); // Assumes there's a 'book.ejs' file in the 'views' folder
});

app.get('/about', (req, res) => {
  res.render('about'); // Assumes there's an 'about.ejs' file in the 'views' folder
});

app.get('/package', (req, res) => {
  res.render('package'); // Assumes there's a 'package.ejs' file in the 'views' folder
});

/// Route for profile page (accessible only if authenticated)
app.get('/profile', isAuthenticated, (req, res) => {
  // Render the profile.ejs template and pass the login status and user information
  res.render('profile', { isLoggedIn: true, password: req.session.user.password, email: req.session.user.email  });
});

/// Route for profile page (accessible only if authenticated)
app.get('/dashboard', isAuthenticated, (req, res) => {
  // Render the profile.ejs template and pass the login status and user information
  res.render('dashboard', { isLoggedIn: true, password: req.session.user.password, email: req.session.user.email  });
});

// Function to destroy a session
function destroySession(req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Error destroying session');
        }
  
        // Session is destroyed successfully
        // Redirect the user to the desired page (e.g., the home page or login page)
        res.redirect('/');
      });
    } else {
      // If there is no session, nothing to destroy
      // Redirect the user to the desired page (e.g., the home page or login page)
      res.redirect('/');
    }
  }
  
  // Example route to handle session destruction (e.g., in a logout route)
  app.post('/logout', (req, res) => {
    destroySession(req, res);
    console.log('Session destroyed!');
  });
  
