import {app} from './app.ts'
import connectDB from './utils/db.ts';
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs');
// create server

const swaggerDocument = yaml.load('/workspaces/learning-management-system/server/api.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT,()=>{
    console.log("server running on port 8000");
    connectDB()
})

