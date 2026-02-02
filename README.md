# Intern Attendance Management System<br>

### Project Overview

This project is an **Attendance Management System** web application made with Express (backend) and React (frontend).<br>
It uses Prisma in connecting the backend to the database.<br><br><br>

### Install packages on both **client** and **server**!

**For client**<br><br>
cd client<br>
npm install<br><br>

**For server**<br><br>
cd server<br>
npm install<br><br><br>

### For OTP to work

- Create a **Gmail account**
- Next, go to **Manage you Google Account**
- After, click on **Security & sign-in**
- Fourthly go to, **2-Step Verification**
- On the fifth step, click the **App passwords**
- Then after, type your desired **App name** and click **Create** once you are done
- Lastly, copy the **Generated app password** app password code and paste it on the **server's .env**<br><br><br>

### Local testing database guide

- Open pgAdmin or psql and connect to your PostgreSQL server.
- Create the database its-attttendance-system if it doesn't exist under "Databases" in your postgresql username.
- Right-click its-attendance-system database and select Query Tool.
- Copy and paste the following SQL code below into the Query Editor and execute it.<br><br>

CREATE TABLE IF NOT EXISTS users (<br>
id SERIAL PRIMARY KEY,<br>
username VARCHAR(50) UNIQUE NOT NULL,<br>
email VARCHAR(100) UNIQUE NOT NULL,<br>
password VARCHAR(255) NOT NULL,<br>
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
);<br><br>

**Reset Password add in its-attttendance-system database using Query Tool.**<br><br>
ALTER TABLE users<br>
ADD COLUMN reset_token TEXT,<br>
ADD COLUMN reset_token_expiry TIMESTAMP;<br><br><br>

### Production database template

- Just simply copy the following<br><br>

CREATE TABLE IF NOT EXISTS playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);<br>
INSERT INTO playing_with_neon(name, value)<br>
SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);<br>
SELECT * FROM playing_with_neon;<br>

ALTER TABLE "Attendance"<br>
DROP CONSTRAINT "Attendance_userId_fkey",<br>
ADD CONSTRAINT "Attendance_userId_fkey"<br>
FOREIGN KEY ("userId") REFERENCES "User"(id)<br>
ON DELETE CASCADE;<br>

ALTER TABLE "TimeAdjustment"<br>
DROP CONSTRAINT "TimeAdjustment_userId_fkey",<br>
ADD CONSTRAINT "TimeAdjustment_userId_fkey"<br>
FOREIGN KEY ("userId") REFERENCES "User"(id)<br>
ON DELETE CASCADE;<br>

ALTER TABLE "UserSchedule"<br>
DROP CONSTRAINT "UserSchedule_userId_fkey",<br>
ADD CONSTRAINT "UserSchedule_userId_fkey"<br>
FOREIGN KEY ("userId") REFERENCES "User"(id)<br>
ON DELETE CASCADE;<br>
