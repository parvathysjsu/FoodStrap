# FoodStrap
A portal where extra food can be donated

## Project Description
America wastes roughly 40 percent of its food. Of the estimated 125 to 160 billion pounds of food that goes to waste every year, much of it is perfectly edible and nutritious. Uneaten food puts unneeded strain on the environment by wasting valuable resources like water and farmland. At a time when 12 percent of American households are food insecure, reducing food waste by just 15 percent could provide enough sustenance to feed more than 25 million people, annually. Currently, only 10 percent of edible wasted food is recovered each year, in the US. Barriers to recovering food are liability concerns, distribution and storage logistics, and funds needed for gleaning, collecting, packaging, and distribution.<br>
An enormous amount of food is wasted or thrown out at restaurants across the country every single day. US restaurants generate an estimated 22 to 33 billion pounds of food waste each year. Kitchen culture and staff behavior such as over-preparation of food, improper ingredient storage and failure to use food scraps and trimmings contribute to food loss. All-you-can-eat buffets are particularly wasteful. The first step toward reducing the amount of food wasted is to change the behavior of the public, as well as chefs and workers at these restaurants, by finding better and smarter ways to use this food in the kitchen and diverting the food to the homeless shelters.<br>
FoodStrap, a web application, aims to bridge the gap between hunger and food waste. It makes it easy to donate leftover and surplus food. The application provides a platform where all the stakeholders for food donation can participate and make the process easy. Through the application, restaurants can donate leftover food at the end of each day and connect with homeless shelters and volunteers in its community. Homeless shelters can sign up in the application and claim food donated by restaurants. Philanthropic people can register themselves as volunteers for homeless shelters and can drive for them. They can pick up the food from restaurants and deliver them to the shelters.<br>
A restaurant manager can sign up for his restaurant in the app. At the end of each day or whenever a food audit is done, the manager can assess the quality and quantity of left-over food. If the food is edible and of a good grade, he can donate this to homeless shelters in his locality. He can weigh, package and log the food. All the food items should be individually packed and clearly labeled for ingredients and allergy information. Then he can submit a donation in the app specifying all the details like menu, portion count, pick up time, and address. Allergy information and any special notes for pick up can also be mentioned. He can then track the status of the donation through history in the app. Later a volunteer picks up the food from the restaurant. The manager can see all the donations from the past. He can update the profile of the restaurant and also see the detailed steps for donating. To provide a good user experience, charts are present in the dashboard and history views to show the number of people fed by the restaurant through the donations.<br>
Homeless shelters that provide food assistance to people in need, can sign up in the application. The shelter manager can search in the application for food donations in the locality. If any donation matches the manager’s criteria for menu and portion count, he can then claim the donation. He updates the status of the donation in the app to claimed. The manager should consider the allergy information and pick notes if any. Later the food is delivered to the shelter from the restaurant by volunteers. The manager can check maps and charts to get an idea about the number of donations received, the donor restaurant location, etc. He can update his profile information also.<br>
Altruistic people can sign up in the application to be volunteers for a homeless shelter. They will drive for the homeless shelters picking up food donations from restaurants and delivering it to shelters. A volunteer willing to drive, can sign into his dashboard and check for any donations claimed by his shelter. He can then update the status of the donation to pick up if he can pick up and deliver that donation. The volunteer can see all the required information for pick up from the donation form like pick up time and address and notes if any. He can see the map showing the pickup address of the donor restaurant.<br>
The application is developed using NodeJS. For the front end, EJS Embedded JavaScript templates with HTML5 and CSS3 are used. Libraries like jQuery, Bootstrap, Google Maps, and Google Charts are also used to enhance the UI. APIs are developed using Express.js and MongoDB is the database used. It is hosted on AWS EC2 instances. Test case automation for APIs is done using Mocha. Selenium automation is done for the overall flow. Load and performance testing is done using JMeter. Profiling is done using Chrome tools like CPU profiling and heap snapshot. Cross-browser compatibility is also verified. The application was designed using MVC pattern with each layer separated from one another. Search engine optimization techniques are implemented to make it easy to search for the application on the web. The application is developed with localization support for English, Hindi, and French locales.<br>

## Personas
- Jim Sanders, Sam ‘s Pizzeria Restaurant Manager<br>
Jim Halls is the manager in Sam’s Pizzeria restaurant.  In Sam’s Pizzeria, several pounds of food are leftover at the end of each day. Jim decides to donate the leftover food to homeless shelters. By using FoodStrap, he connects with shelters and volunteers easily.
<br>
- Sally Sands, Manager, Home for Good Homeless Shelter<br>
Home for Good Homeless Shelter provides assistance to hundreds of homeless people. Sally, the manager, connects with local restaurants and grocery stores to obtain food donations to feed the people in the shelter. She uses the FoodStrap app to connect with local restaurants and obtains their surplus food.
<br>
- Patrick Jane, Volunteer at Home for Good <br>
Patrick is a volunteer at Home for Good shelter. He spends quality time at the shelter helping the inmates with their tasks. He drives around town and collects donations for the shelter. He uses the FoodStrap app to keep track of all the donations. He typically spends few hours every week volunteering.
<br>

# Application Set Up Instructions
## Pre-requisites
• A machine with NodeJS installed<br>
• MongoDB installed and service running

## Steps to run
1. Git clone
2. cd .\foodstrap\
3. npm install
4. npm start

Service running in http://hostname:5000/
  <br><br>
Run Mocha Test Cases <br>
• npm test<br>
Run Selenium test cases<br>
• Detailed instructions are provided in Selenium Automation section<br><br>

# Technology Stack
Front end<br>
  - NodeJS and EJS Embedded JavaScript
  - HTML5
  - CSS3
  - Library: JQuery, BootStrap, D3JS, Google maps, Google Charts
<br>Back end<br>
  - NodeJS Express.js
  - Library: mongod, node-geocoder, node-fetch, http-errors, debug, morgan, client-sessions, cookie-parser
<br>Database <br>
- MongoDB
<br>Cloud Deployment <br>
- AWS EC2
<br>Test Automation <br>
- Mocha
	- NodeJS
	- Library: Chai, Cheerio, Request
- Selenium
	- Selenium-webdriver
	- Chrome driver
