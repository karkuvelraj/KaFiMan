# [Building Applications in React and Redux]( Casestudy Airline Management)

## Users Credentials:

**Staff Role**

1. Email : staff_svuwtdu_member@tfbnw.net
2. Password: LoginPassword

**Admin Role**

1. Email : admin_xksjqsu_member@tfbnw.net
2. Password: LoginPassword

**React Application running on https://localhost:3000**

## Commands

1. Run application in dev mode 'npm start' ( Webpack dev server )
2. Run application in prod mode 'npm run build' ( http-server )
3. Test application 'npm test'

**Mock Backend Running on 3001 NodeJs Jsonserver**

1. Data in Json file **tools/db.json**

## Additional Features / Test cases After 1st evaluation

1. There are three types of services per flight: amcillary services, shopping items and meals. You have two of them per flight. Shopping items are missing.

   > Shop Items was not visible without scrolling modified the design

2. If I add new services from the list of services or meals, it seems the changes are reflected only during the runtime. The changes shoukd be persisted.

   > Changed the behaviour as expected, data will be persisted in db.json in tools dir

3. There is no eays way of navigation from any feature back to dashboard. No links provided, rather need to use back button of browser...that's bad

   > A click on logo will navigate to home/dashboard
   > Added back button for navigation

4. while adding new passenger for a flight, why should someone enter a seat number manually?? it is suposed to be selected from a seat map or at leadt from a drop dpwn list, since otherwise how do someone knows that which seat is empty and which one is not.

   > Added Seat Map popup for selecting seats for passengers while adding passengers

5. while adding a passenger even why should someone enter a flight number manually, since I have already selected a flight from the list of flights and adding new passenger for the same. So it should be automatically selected.

   > Flight Name will auto populate in the form

6. You have made entering passport, date of birth and address mandatory, so what's the point of having filtration of passengers missing thoe mandatory requirements?

   > Removed mandatory rule for Passport , Date of birth , Address

7. Not a PWA

   > Implemented PWA in **PROD**, can be able to access offline files will be cached by ServiceWorker , test it by stopping http-server by single **CTRL C**.
   > In Firefox PWA will work smoothly.
   > In Chrome Due to self signed certificate ServiceWorker will not register ,we need to tweek the chrome settings **C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:3000**

8. Test cases/Sanpshots (**Jest/Enzyme**)

   > Covered Most of the test cases with **35 Test cases**

9. Action types should have been created separately in case of Redux
   > Created new file **actions.js** to define actions , Action types are not hard coded in components
