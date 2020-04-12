const express = require('express');
const connectDB = require('./config/db');

const app = express();


const PORT = process.env.PORT || 5000;
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// const cors = require('cors');
 
// app.use(cors({'origin': 'http://localhost:3000'}));

connectDB();

//init middleware 
//oldway: app.use(bodyparser.json())
app.use(express.json({extended: false})); //new way 

app.get('/', (req,res)=> res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
