import {app} from './app.ts'
import connectDB from './utils/db.ts';
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });
// create server
app.listen(process.env.PORT,()=>{
    console.log("server running on port 8000");
    connectDB()
})

