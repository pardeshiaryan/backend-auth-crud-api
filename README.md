# Backend Auth CRUD API - Full Stack Assignment

A secure, scalable REST API with authentication, role-based access control, and a functional frontend UI. This project demonstrates professional backend development practices including JWT authentication, CRUD operations, input validation, error handling, and comprehensive API documentation.

## 🎯 Core Features Implemented

### ✅ Authentication & Security
- **User Registration & Login** - Secure password hashing with bcryptjs
- **JWT Authentication** - Token-based stateless authentication
- **Role-Based Access Control** - User vs Admin differentiation
- **Input Validation & Sanitization** - Request payload validation
- **Secure Token Handling** - Bearer token implementation
- **Password Hashing** - bcryptjs with salt rounds
- **CORS Protection** - Configured for frontend integration

### ✅ API Features
- **RESTful Design** - Following industry standard HTTP methods and status codes
- **API Versioning** - `/v1/` versioning for backward compatibility
- **CRUD Operations** - Complete Create, Read, Update, Delete for Notes entity
- **Error Handling** - Global error handler with consistent response format
- **Request Logging** - Middleware for tracking API usage
- **Authorization Checks** - Role-based and ownership-based access control

### ✅ Frontend Integration
- **User Authentication UI** - Login and registration pages
- **Protected Dashboard** - JWT-protected routes
- **Note Management** - Create, read, update, delete notes
- **User Profile** - View authenticated user information
- **Error/Success Messages** - Real-time feedback from API responses
- **Token Storage** - Secure JWT token management in localStorage

### ✅ Database
- **MongoDB Integration** - NoSQL database with Mongoose ODM
- **Schema Design** - User and Note models with relationships
- **Data Validation** - Model-level validation
- **Indexing** - Email unique index for user lookups

## 📊 Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js + Express.js |
| **Frontend** | React.js + Vite |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | bcryptjs |
| **Dev Tools** | Nodemon, ESLint |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or Atlas cloud)
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/pardeshiaryan/backend-auth-crud-api.git
cd backend-auth-crud-api
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/auth-crud-api
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-crud-api

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development
```

#### 4. Start Backend Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

#### 5. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/v1
```

### Authentication Endpoints

#### Register User
```http
POST /user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "user"
}
```
**Response:** `201 Created`
```json
{
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```
**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get User Profile
```http
GET /user/profile
Authorization: Bearer {token}
```
**Response:** `200 OK`
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Notes CRUD Endpoints

#### Create Note
```http
POST /note
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note",
  "status": "pending"
}
```
**Response:** `201 Created`

#### Get All Notes
```http
GET /note
Authorization: Bearer {token}
```
**Response:** `200 OK`
```json
{
  "message": "Notes retrieved successfully",
  "count": 5,
  "notes": [...]
}
```

#### Get Note by ID
```http
GET /note/:id
Authorization: Bearer {token}
```
**Response:** `200 OK`

#### Update Note
```http
PUT /note/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "status": "completed"
}
```
**Response:** `200 OK`

#### Delete Note
```http
DELETE /note/:id
Authorization: Bearer {token}
```
**Response:** `200 OK`

## 🔐 Security Implementation

### JWT Authentication Flow
1. User logs in with email/password
2. Server validates credentials against hashed password
3. JWT token generated with user ID and role
4. Frontend stores token in localStorage
5. Subsequent requests include token in Authorization header
6. Middleware validates token before processing request

### Password Security
- Passwords hashed using bcryptjs (10 salt rounds)
- Original password never stored in database
- Password comparison uses secure bcrypt.compare()

### Authorization
- **User Role**: Can only access/modify their own notes
- **Admin Role**: Can access/modify all notes and view all users
- Role checked on every protected endpoint

### Input Validation
- Email format validation
- Password strength requirements
- Required field checks
- MongoDB injection prevention via Mongoose sanitization

## 🏗️ Project Structure

```
backend-auth-crud-api/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── user.js            # User auth logic
│   │   └── note.js            # Note CRUD logic
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── user.model.js      # User schema
│   │   └── note.model.js      # Note schema
│   ├── routes/
│   │   └── v1/
│   │       ├── index.js       # Route aggregator
│   │       ├── user.route.js  # User endpoints
│   │       └── note.route.js  # Note endpoints
│   ├── utils/
│   │   ├── bcrypt.js          # Password hashing utilities
│   │   └── jwt.js             # JWT utilities
│   ├── src/
│   │   ├── app.js             # Express app setup
│   │   └── index.js           # Server entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Login.jsx      # Login form
│   │   │   ├── Register.jsx   # Registration form
│   │   │   ├── Profile.jsx    # User profile
│   │   │   └── Notes.jsx      # Note management
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx           # Entry point
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  status: String (enum: ['pending', 'completed'], default: 'pending'),
  user: ObjectId (ref: 'User', required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🌐 Scalability & Architecture

### Current Architecture
The project is built with scalability in mind:

#### 1. **Modular Structure**
- Separated concerns: routes, controllers, models, middleware
- Easy to add new modules without affecting existing code
- Each entity (User, Note) can be extended independently

#### 2. **API Versioning**
- `/v1/` prefix allows future versions without breaking existing clients
- Supports multiple API versions running simultaneously

#### 3. **Middleware Pipeline**
- Authentication middleware validates all protected routes
- Error handler catches and formats all errors consistently
- CORS middleware controls cross-origin access

### Future Scalability Improvements

#### 1. **Microservices Architecture**
- Split into separate services: User Service, Note Service, Auth Service
- Independent deployment and scaling of services
- API Gateway for routing and load balancing

#### 2. **Caching Layer**
- Implement Redis for:
  - Session caching (JWT token blacklist)
  - User profile caching
  - Frequently accessed notes
  - Rate limiting

#### 3. **Database Optimization**
- Implement database indexing on frequently queried fields
- Database replication for high availability
- Connection pooling with Mongoose

#### 4. **Load Balancing**
- Nginx or HAProxy for distributing traffic
- Horizontal scaling with multiple server instances
- Session persistence with Redis

#### 5. **Logging & Monitoring**
- Winston/Morgan for structured logging
- ELK Stack (Elasticsearch, Logstash, Kibana) for log aggregation
- Prometheus + Grafana for metrics and monitoring

#### 6. **Docker & Kubernetes**
- Containerize application with Docker
- Kubernetes for orchestration and auto-scaling
- Docker Compose for development environment

#### 7. **Rate Limiting & DDoS Protection**
- Express rate limiter middleware
- Cloudflare for DDoS protection
- API quota management per user/role

#### 8. **CI/CD Pipeline**
- GitHub Actions for automated testing and deployment
- Automated testing on every commit
- Blue-green deployment strategy

### Performance Considerations
- Query optimization with lean() for read-only queries
- Pagination for large datasets
- Response compression with gzip
- Client-side caching with appropriate headers

## 🧪 Testing

### Running Tests
```bash
cd backend
npm test
```

### Manual Testing with Postman
1. Import `postman-collection.json` into Postman
2. Set base URL: `http://localhost:3000/v1`
3. Test endpoints in order: Register → Login → Create Note → Get Notes

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t backend-auth-crud-api .
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongo:27017/auth-crud-api \
  -e JWT_SECRET=your_secret_here \
  backend-auth-crud-api
```

## 📋 API Status Codes

| Code | Meaning | Common Use |
|------|---------|-----------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input, missing fields |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Authenticated but lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- Check MONGODB_URI in .env file
- Verify MongoDB is accessible

### CORS Errors
- Ensure frontend URL is in CORS allowed origins
- Check browser console for specific CORS error
- Verify Authorization header is being sent

### JWT Token Expired
- Tokens expire after 7 days by default
- User must log in again to get new token
- Can modify JWT_EXPIRE in .env

## 📞 API Support

### Common Errors

**"Invalid email or password"**
- User doesn't exist or password is incorrect
- Email is case-sensitive

**"Access denied. You can only view your own notes"**
- Non-admin users can only access their own notes
- Admin users can access all notes

**"Note not found"**
- Note ID is incorrect or note was deleted
- Verify note ID from get all notes endpoint

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create backend-auth-crud-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Deploy to Railway/Render
- Connect GitHub repository
- Set environment variables
- Deploy from main branch

## 📝 Environment Variables Reference

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| MONGODB_URI | String | - | MongoDB connection string (required) |
| JWT_SECRET | String | - | Secret key for JWT signing (required) |
| JWT_EXPIRE | String | 7d | JWT expiration time |
| PORT | Number | 3000 | Server port |
| NODE_ENV | String | development | Environment mode |

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [RESTful API Design](https://restfulapi.net/)

## 📄 License

ISC

## 👤 Author

Pardeshi Aryan - Backend Developer

## 📧 Contact & Submission

This project has been developed as per the Backend Developer Intern assignment requirements.

**Submission Details:**
- GitHub Repository: [backend-auth-crud-api](https://github.com/pardeshiaryan/backend-auth-crud-api)
- Features: ✅ Authentication, ✅ Role-Based Access, ✅ CRUD APIs, ✅ Frontend Integration
- Documentation: ✅ README, ✅ Postman Collection, ✅ Swagger docs (available at `/docs`)
- Scalability: ✅ Modular architecture, ✅ API versioning, ✅ Microservices ready

---

**Last Updated:** January 2025
