### Chat Room App
This can be found at http://209.151.157.48

# Build Steps
* First run npm i to install all dependencies. You may also need to do this in the client-react directory (since create-react-app creates its own package.json with its own dependencies).

* Run mongod --dbpath=./data or mongod to start the database. This assumes you have created a directory called data (it won't be there when you clone the repo because it is in the .gitignore file. If you would like to see a nice interface use MongoDBCompass

* Run npm start in the root directory to start the server.

* To start the fronted, cd into client-react and then run npm start.
