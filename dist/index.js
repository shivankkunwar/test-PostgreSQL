"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client({
            host: "localhost",
            port: 5432,
            database: "postgres",
            user: "postgres",
            password: "mysecretpassword",
        });
        try {
            yield client.connect(); // Ensure client connection is established
            // Use parameterized query to prevent SQL injection
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
            const values = [username, email, password];
            const res = yield client.query(insertQuery, values);
            console.log("Insertion success:", res); // Output insertion result
        }
        catch (err) {
            console.error("Error during the insertion:", err);
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client({
            host: "localhost",
            port: 5432,
            database: "postgres",
            user: "postgres",
            password: "mysecretpassword",
        });
        try {
            yield client.connect();
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log("User found:", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No User found with the given email.");
                return null;
            }
        }
        catch (err) {
            console.log("Error during fetching user:", err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
getUser('user5@example.com').catch(console.error);
