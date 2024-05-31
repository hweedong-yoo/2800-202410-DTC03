<p align="center">
  <a href="" rel="noopener">
    <img width="200px" height="200px" src="public/images/logo.svg" alt="Project logo">
  </a>
</p>

<h3 align="center">BIOLINK</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE.txt)

</div>

---

<p align="center"> Team DTC-03 presents BioLink, an app that tackles potential health emergencies with preventative measures and precaution.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

We are DTC-03, a dedicated team from BCIT’s COMP2800 course, committed to transforming the landscape of health insights through our innovative application. 

At BioLink, our mission is to seamlessly integrate the latest in bio-technology with user-friendly digital solutions to empower individuals to take control of their health like never before. Our web app core features include Body Model Avatar, Vitals Tracking, Blood Analysis Tracking, and Body Composition Tracking. 
## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) installed on your machine.
- A text editor or an IDE such as [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/).

### Installing
Commands must be ran in the root folder of the project in your devices terminal.
1. **Clone the Repository**
Clone the github repository using this commmand in terminal or use your IDE's method.
   ```
   git clone https://github.com/hweedong-yoo/2800-202410-DTC03
   ```
2. **Install Dependencies**

Install all required libraries
   ```
   npm install
   ```
3. **Deploy locally**

Run the  following command to host the web app on your own machine. Double check that the `BASE_URL` in the `.env` file is the proper route your machine uses.
   ```
   nodemon server.js
   ```

## 🎈 Usage <a name="usage"></a>
The BioLink web app was designed with the future in mind; the future where every individual would be equipped with computer implants that would send their biological data to our app. For the purpose of this project, we had created a mockdata on MongoDB to act as such computer implant. Using our app today currently just requires either creating an account or logging in with an existing account. It should be noted that the mockdata established on our database on exists for the dummy account created for project assessment. 
#### Entering the web app
1. Create an account
   1. Verify email
   2. Set up security questions
   3. Add details to profile
2. Log in using existing account

#### Using the features

## ⛏️ Built Using <a name="built_using"></a>

### Frontend
- [Flowbite](https://flowbite.com/) - UI Components
- [Swiper](https://swiperjs.com/) - Slider Component
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [ApexCharts](https://apexcharts.com/) - Charting Library

### Backend
- [Express](https://expressjs.com/) - Server Framework
- [Joi](https://joi.dev/) - Schema Validation
- [MongoDB](https://www.mongodb.com/) - Database
- [Node.js](https://nodejs.org/en/) - Server Environment
- [EJS](https://ejs.co/) - Template Engine

### Other
- [Nodemailer](https://nodemailer.com/about/) - Email Sending




## ✍️ Authors <a name = "authors"></a>

- [@hweedong-yoo](https://github.com/hweedong-yoo) - [Email](jyoo33@my.bcit.ca)
- [@winsonl28](https://github.com/winsonl28) - [Email](mhockertz@my.bcit.ca )
- [@mariko13](https://github.com/mariko13) - [Email](wliang43@my.bcit.ca)
- [@err0l-g](https://github.com/err0l-g) - [Email](egalang6@my.bcit.ca)
- [@homy-khoshi](https://github.com/homy-khoshi) - [Email](hkhoshi@my.bcit.ca)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
Majority of front end design templates were from [Flowbite](https://flowbite.com/).
### 🤖 AI
Chat gpt was used in the following:
- Debugging code
- Creating mock data for when users first sign up
- Reformatting code to be more consistant
