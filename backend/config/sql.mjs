import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.REACT_APP_DATABASE_URL;
// console.log(encodedDatabaseUrl)
// const connection = mysql.createConnection(database);

var connection = mysql.createConnection({
    host : process.env.REACT_APP_DATABASE_HOST,
    port : process.env.REACT_APP_DATABASE_PORT,
    user : process.env.REACT_APP_DATABASE_USER, //mysql의 id
    password : process.env.REACT_APP_DATABASE_PASSWORD, //mysql의 password
    database : process.env.REACT_APP_DATABASE_DB, //사용할 데이터베이스
});


export default connection.promise();

