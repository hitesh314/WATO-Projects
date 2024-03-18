URL Shortener BACKEND APIS

These APIs allows users to shorten URLs and manage their shortened links.

### Routes

1. POST /api/auth/register
   - Registers a new user.
   - Request body:
     - name: User's name
     - email: User's email address
     - password: User's password
   - Response:
     - 201: User registered successfully, returns a token.
     - 400: Invalid email address format or error message.

2. POST /api/auth/login
   - Logs in a user.
   - Request body:
     - email: User's email address
     - password: User's password
   - Response:
     - 201: Login successful, returns a token.
     - 400: Invalid email or password.
     - 401: User does not exist.

3. GET /api/auth/user
   - Retrieves user details based on the authorization token.
   - Request header:
     - Authorization: User token
   - Response:
     - 200: Returns user details.
     - 401: Unauthorized or invalid token.
     - 403: Invalid token.

4. POST /api/url/generate
   - Shortens a URL.
   - Request body:
     - longerUrl: Original URL
     - userId: ID of the user who owns the URL
   - Response:
     - 201: URL shortened successfully, returns shortened URL details.
     - 400: Invalid input or URL already shortened.

5. POST /api/url/getDetailsUrl
   - Retrieves details of a shortened URL.
   - Request body:
     - longUrl: Original URL
   - Response:
     - 200: Returns details of the shortened URL.
     - 400: URL does not exist.

6. POST /api/url/getUserUrls
   - Retrieves all shortened URLs associated with a user.
   - Request body:
     - userId: ID of the user
   - Response:
     - 200: Returns details of all shortened URLs associated with the user.
     - 401: Unauthorized or error message.
     - 404: User not found.

### Controllers

1. authController.js
   - register: Registers a new user.
   - login: Logs in a user.
   - getUserAuth: Retrieves user details from authorization token.

2. urlController.js
   - generate: Shortens a URL.
   - getShortUrl: Retrieves details of a shortened URL.
   - getUserUrls: Retrieves all shortened URLs associated with a user.
