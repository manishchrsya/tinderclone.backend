- Create a repository -->
- Initialize the repository -->
- node modules, package.json, package-lock.json -->
- Install express -->
- Listen to port 7777 -->
- write req handlers for /test, /hello -->
- Install nodemon and update scripts inside package.json -->
- Diff between (^ vs ~) -->
- What are dependencies and dev dependencies -->`
- Whats is the use of -g while npm install



- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to the remote origin
- Play with routes and route extensions ex. /hello, /, /hello/2, .xyz
- Order of the routes matter a lot
- Install postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST , PATCH, PUT, DELETE and test on postman
- Explore routing and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the querry params in the routes
- Reading the dynamic routes



- Multiple route handlers
- next()
- next function and errors along with res.send()
- app.use("/routes", rh, [rh2, rh3, rh4, rh5])
- what is middleware and why do we need it.
- How express js basically handles requests behind the scenes
- Diff between app.use() vs app.all()
- error handling using the app.use("/", (err, req, res, next) => {})


- Create cluster on mongodb atlas
- install mongoose
- Connect the application to the database using <connection-url/tinder-clone>
- Call the connect db function before the server is started on the configured port    number
- Create a userSchema and UserModel
- Create POST /signup api to add data to the database
- Push some data using the api call from postman
- Error handling using try and catch

- JS Object vs json
- Add the express.json middleware to your app
- Make your signup api dynamic to recieve data from the end user
- user.findone with duplicate email ids, which object is retruned
- API get user by email
- API Feed API - GET /feed - get all the users from the database
- API GET user by id
- Create a Delete user api 
- Difference between patch and put
- API Update the user
- Explore the mongoose documentation for model api
- What are options in a Model.findoneandupdate method explore more about it
- API - update the user with email id

- Explore schema type options from the documentation
- add required, unique , lowercase, min, minLength, trim
- Add Default
- Create a custom validate func for gender
- Improve the db schema - PUT all the appropriate on each field in schema
- Add timestamp to the user schema
- Add API level validation on Patch request and signup post API
- Data Sanitization - Add API validation for each fields
- Explore validator library