Auth server for local testing (Express + MySQL)

Quick start

1. Copy `.env.example` to `.env` and fill in your database credentials and `JWT_SECRET`.

2. Install dependencies (Node.js >= 16):

```bash
cd server
npm install
```

3. Create the database and users table. You can run the SQL in `migrations.sql` using your MySQL client (or run the statements inside your DB admin).

4. Start the server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

5. The server listens on port set in `.env` (default 3000). Endpoints:
- `POST /auth/signup`  { name, username, email, password }
- `POST /auth/signin`  { identifier, password } (identifier = username or email)

Response example (success):
```json
{ "user": { "id": 1, "name": "Alice", "username": "alice", "email": "a@b.com" }, "token": "<jwt>" }
```

Notes
- Passwords are hashed with `bcrypt`.
- The server issues a JWT signed with `JWT_SECRET`.
- For production, add rate-limiting, input validation, HTTPS, and secure secret management.
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" reverse tcp:3000 tcp:3000 for usb debugging, run this in terminal before testing