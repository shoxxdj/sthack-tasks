# Firebase challenge 

## How to setup : 
- git clone this repository 
- Create an account on Firebase 
- Create a project / application
- Go to authentication 
- Create an admin user and get the uid (admin@sthack.fr / wjT0PefHfJ4uV-SvJ9wYwjT0PefHfJ4uV-SvJ9wY ) OR custom creds
- edit the uid in "adminUserId" variable in server/code/app.js
- Go to settings / Global Settings
- In "your app", copy the firebaseConfig values and past them into : client/code/src/main.js : firebase.initializeApp
- Go back to settings / Service Accounts / SDK Admin Firebase clic on generate new private key 
- Paste the content in : server/code/config/sthack-sthack-firebase-adminsdk-52eh6-2b9cab5d21.json
- If you define custom creds go to admin/code/cypress/integration/chall.spec.js and edit the creds. 
- Edit the nginx/nginx.conf file to match with your domain
- docker-compose build && docker-compose up 

## Writeups : 

## Other ressources : 
