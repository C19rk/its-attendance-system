# Intern Attendance Management System<br>

### For OTP to work

- Create a **Gmail account**
- Next, go to **Manage you Google Account**
- After, click on **Security & sign-in**
- Fourthly go to, **2-Step Verification**
- On the fifth step, click the **App passwords**
- Then after, type your desired **App name** and click **Create** once you are done
- Lastly, copy the **Generated app password** app password code and paste it on the **server's .env**<br>

### For Database

- Open pgAdmin or psql and connect to your PostgreSQL server.
- Create the database its-attttendance-system if it doesn't exist under "Databases" in your postgresql username.
- Right-click its-attendance-system database and select Query Tool.
- Copy and paste the following SQL code below into the Query Editor and execute it.

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

**Reset Password add in its-attttendance-system database using Query Tool.**
ALTER TABLE users
ADD COLUMN reset_token TEXT,
ADD COLUMN reset_token_expiry TIMESTAMP;
