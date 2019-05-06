const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const routeHandlers = require('./routes');
routeHandlers(app);

app.listen(3000, () => console.log('Server is running on http://localhost:3000'))
