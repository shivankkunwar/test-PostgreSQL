const { Client} = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable"
})

async function createUsersTable(){
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
}

async function insertData (){
  try{
    await client.connect()
    const insertQuery = "INSERT INTO users (username, email,password) VALUES ('shivank','shivank@gmail.com','password')"
    const res = await client.query(insertQuery)
    console.log('insertion sucess:', res);
  }
  catch(err){;
    console.error(err)
  }
  finally{
    await client.end();
  }
}

createUsersTable()