import { Redis } from "ioredis";
import path from 'path'
require("dotenv").config({path:path.resolve(__dirname, '.env')})

const redisClient = ()=>{
    if(process.env.REDIS_URL){
        console.log('redis connected');
        return process.env.REDIS_URL
    }
    throw new Error('Redos connection failed')
}

export const redis = new Redis(redisClient())