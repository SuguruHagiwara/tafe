1. How to install an app

	Upon iOS devices, PWA currently works only upon Safari Browsers.
	
	On safari, 
	Make sure that you have cleared the browsing data.
	Visit the PWA website
	Tap the Share button (at the browser options)
	From the options tap the Add to Homescreen option, you can notice an icon of the website or 	screenshot of website added to your devices homescreen instantly.
	Tap the icon from homescreen, then the Progressive Web App of your website will be loaded.



	Upon Android device, open Chrome Chrome.

Go to a website you want to install. Tap Add to home screen. Follow the onscreen instructions to install.
	



	Admin panel

	1. Go to your command line
	2. Change directory to the file called "my-app" which is the React file
	3. Type "npm start" inside "my-app" file
	4. The admin panel will show up on your browser




2. What I completed
	
	An app for buying a ticket (Soccer game).

	
	2 CRUDs implemented.
	
	a) Create
	
	Registration form for new users. (Insert)
	Buying a ticket from ticket page. (Insert)	


	b) Read
	
	Select a match from the database and display it in the home page.
	Select a match information from the database and it will display when more information button 		  is clicked.
	Select a team from the database and display it in the team page.
	Select a user information from the database and display it in the profile page.
	Select a purchased ticket from the database and display it in the profile page.


	c) Update
	
	Update an user information from profile page. (Update)
	Update a favorite team by clicking a team from team page. (Update)
	* If the favorite team already exists, it will update, if not it will insert the team information.

	
	d) Delete
	
	Delete an user account from profile page.
	Delete a favorite team from liked page.
	Delete a purchased ticket from profile page.



3. What tech I used

	

	Used languages are

	HTML
	CSS
	JavaScript
	PHP
	MySQL


	The places for each languages were used

	HTML		(index.html)
	CSS  		(style.css)
	JavaScript	(script.js, js.js, sw.js)
	PHP		(api.php, db.php, se.php)
	MySQL		(db.php)
	React		(my-app) entire file
	ANT Design	(Panel.jsx) UI design for the form


	Versions I recommend for each languages

	HTML 5
	CSS 3
	JavaScript ECMAScript 2020
	PHP 7.4.11
	MySQL 8.0
	React 17.0.1
	ANT Design 4.x


4. What framework I used

	For Project2,3 and UX2

	3rd party framework that I used is UIKIT.

	3rd party framework for Javascript that I used is React.js (recommended version 17.0.1)




5. UserName and the Password

	
	For the app
	
	User name: Suguru
	Password: Suguru


	For the admin panel
	
	User name: Suguru
	Password: Suguru

6. UI


-------------------- For the app ----------------------

Login
	On login page, you can enter the user name and the password to login.
	Sign up link will lead you to registration page where you can register for the app.
	Admin button will lead you to Admin login page which only permitted admin can access.


Header
	On the header part, You will see a hamburger menu, logo and logout icon.


Hamburger menu

	Hamburger menu will allow to show the menus which is 
	

	HOME (Goes back to the home page)

	PROFILE (Goes to the profile page)

	TEAM (Goes to the team page where you can select your favorite team) 
	*Only one team can be selected. Whenever you click twice, your favorite team will be updated.

	LIKED (Goes to the your favorite team page.)
	* In this page, you can delete your favorite team.

	SETTINGS (Goes to the settings page)
	* In this page, you can change the logo, 2 options for background image, dark mode and change the color for the footer.



Logo
	When you click the logo, the page will go back to home page.



logout
	When you click the logout icon, you will be logged out.	





Home page

	Home page will display a soccer match information. Inside the each match, there are two 	buttons which are "MORE INFORMATION" and "BUY A TICKET".
	when you click "MORE INFORMATION" button, the modal will popup and show details of the particular match.
	When you click "BUY A TICKET" button, it will jump to a ticket page where you can buy a ticket.



Buy a ticket page

	Buy a ticket page will allow users to purchase a ticket.
	You can select the ticket amount, seat number and payment method.
	Whenever the selection is made, press "BUY A TICKET" button to execute the purchase.


Team page

	Team page will display all the teams which is stored in the database.
	You can click the heart icon to like the specific team. When your favorite is not selected yet, it will insert your favorite team to the liked page. On the other hand, if you already clicked and inserted your favorite team, it will update to the team which you last clicked.



Profile page

	Profile page will allows to display the user information.
	You can either edit the information or delete the user account in this page.
	
	Purchased ticket information will display in here as well.
	You also can delete the purchased ticket in this page.


Liked page
	
	This page will display your favorite team.
	You can delete your favorite team in this page.


Settings page

	Change to dark mode
	When you check the check box, the background color will change to dark mode.

	Change the background image
	Two options for the background image are allowed.

	Change the logo
	When you check the check box, the logo will change.

	Change the color of footer menu
	When you check the check box, the color of the footer will change to gray.

	


Footer	
	On the footer part, You will see 4 icons

	First one from the left(Soccer ball icon), will lead you to the team page.
	Second one from the left(Profile icon), will lead you to the profile page.
	Third one from the left(Heart icon), will lead you to the favorite team page.
	The last one(Cognition icon), will lead you to the settings page.






-------------------- For the admin panel ----------------------






	On the header part you will see
	
	Admin: logo

	ID INFO: Information table for TeamID and Stadium ID (Whenever you want to insert, update a team or matches, you need this as a reference to input TeamID and StadiumID)

	View Team: You can view the whole team which is in the database. You can update or delete a particular team from here

	Create Team: You can create a new team from here

	View Match: You can view the whole match is in the database. You can update or delete a match from here.

	Create Match: You can create a match from here

	Login: You can login from here. To view all the menu content, you have to login from here.

	Logout: When the admin is logged in, Logout menu will show up in the same location as Login menu





7. File structure


-------------------- For the app ----------------------

|-- api
|    |
|    |-- api.php
|    |-- db.php
|    |-- se.php
|    |-- sw.js
|
|-- index.html
|-- script.js
|-- manifest.json
|-- ReadMe.md
|-- view
      |-- style.css
      |-- js
      |   |-- js.js
      |   |-- sw.js
      |
      |-- images
             |
             |-- admin-logo.png
             |-- logo.png
             |-- logo2.png
             |-- profile.png
             |-- profileImage.png
             |-- seat.jpeg
             |-- soccer1.png
             |-- soccer2.png
             |-- stadium.png
             |-- admin.logo
             |
             |-- logo
                   |
                   |-- 20 logo images for each team 



