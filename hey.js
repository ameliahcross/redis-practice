import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.REDIS_PASS)
console.log(process.env.REDIS_HOST)
console.log(process.env.REDIS_PORT)