require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// Get environment variables
const mongodbHost = process.env.MONGODB_HOST;
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbCluster = process.env.MONGODB_CLUSTER;
const mongodbDatabase = process.env.MONGODB_DATABASE;
const mongodbSessionSecret = process.env.MONGODB_SESSION_SECRET;
const nodeSessionSecret = process.env.NODE_SESSION_SECRET;

const expireTime = 60 * 60 * 1000;

// Create an instance of Express app
const port = process.env.PORT || 3000;
const app = express();

// Use ejs view engine
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true&w=majority&appName=${mongodbCluster}`,
    crypto: {
        secret: mongodbSessionSecret
    }
})

app.use(session({
    secret: nodeSessionSecret,
    store: mongoStore,
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: expireTime }
}
));

module.exports = {
    expireTime,
};

// Middleware for session validation
const sessionValidationMiddlewares = require('./middlewares/sessionValidation');
const accountSetUpMiddlewares = require('./middlewares/accountSetUp');
const emailVerification = accountSetUpMiddlewares.emailVerification;
const sessionValidation = sessionValidationMiddlewares.sessionValidation;
const hasSecurityAnswer = sessionValidationMiddlewares.hasSecurityAnswer;

// Define routes
const landingPageRoute = require('./routes/landingPage');
const homePageRoute = require('./routes/home');
const signupRoute = require('./routes/signupPage');
const loginRoute = require('./routes/loginPage');
const profilePageRoute = require('./routes/profilePage');
const securityQuestionRoute = require('./routes/securityQuestionPage.js')
const recoverPageRoute = require('./routes/recoverPage');
const editProfilePageRoute = require('./routes/editProfilePage');
const bodyModelRoute = require('./routes/bodyModelPage');
const NotFoundController = require('./routes/404Page');
const contactPageRoute = require('./routes/contactPage');
const aboutPageRoute = require('./routes/aboutPage');
const termsPageRoute = require('./routes/termsPage');
const logoutRoute = require('./routes/logout');
const emailVerificationRoute = require('./routes/emailVerificationPage');


// Use routes
app.use('/', landingPageRoute);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/contact', contactPageRoute)
app.use('/about', aboutPageRoute);
app.use('/terms', termsPageRoute);
app.use('/security_question', securityQuestionRoute);
app.use('/recover', recoverPageRoute);
app.use('/verify', emailVerificationRoute);
app.use('/home',emailVerification , sessionValidation, hasSecurityAnswer, homePageRoute);
app.use('/profile', sessionValidation, hasSecurityAnswer, profilePageRoute);
app.use('/edit_profile', sessionValidation, hasSecurityAnswer, editProfilePageRoute);
app.use('/bodyModel', sessionValidation, hasSecurityAnswer, bodyModelRoute);
app.use('/logout', sessionValidation, hasSecurityAnswer, logoutRoute);
app.use('*', NotFoundController);

// Start the server
async function main() {
    await mongoose.connect(`mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true&w=majority&appName=${mongodbCluster}`);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// run main and catch any errors
main().catch(err => console.log(err));
