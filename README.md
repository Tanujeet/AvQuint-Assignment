# AvQuint-Assignment
# 📝 Task Manager — MERN Stack

A full-stack Task Management Web Application built with MongoDB, Express.js, React.js, and Node.js. Features JWT authentication, full CRUD operations, search, filter, and pagination.

---

## 🚀 Features

- 🔐 User Registration & Login with JWT Authentication
- ✅ Create, Read, Update, Delete Tasks
- 🔄 Toggle task status (Pending / Completed)
- 🔍 Search tasks by title
- 🎯 Filter by status (All / Pending / Completed)
- 📄 Pagination (6 tasks per page)
- 🛡️ Protected routes with middleware
- 📱 Responsive UI

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js, React Router DOM, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs |
| Dev Tools | Vite, Nodemon, dotenv |

---

## 📁 Folder Structure

```
task-manager/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Navbar, TaskCard, TaskModal
│   │   ├── context/         # Auth context
│   │   ├── pages/           # Login, Register, Dashboard
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
├── server/                  # Express backend
│   ├── config/              # DB connection
│   ├── controllers/         # Auth & Task logic
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # User & Task schemas
│   ├── routes/              # API routes
│   ├── server.js
│   └── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_here
```

> **MongoDB Atlas Setup:**
> 1. Go to [atlas.mongodb.com](https://atlas.mongodb.com)
> 2. Create a free M0 cluster
> 3. Add a database user under **Database Access**
> 4. Allow all IPs under **Network Access** (`0.0.0.0/0`)
> 5. Copy the connection string and paste in `.env`

Start the backend:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs on `http://localhost:5173`

---

## 🔗 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user, returns JWT |

### Task Routes — `/api/tasks` *(Protected)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all tasks (search, filter, paginate) |
| POST | `/` | Create new task |
| PUT | `/:id` | Update task |
| DELETE | `/:id` | Delete task |

**Query Params for GET `/api/tasks`:**
```
?search=keyword&status=pending&page=1&limit=6
```

---

## 🗃️ Database Schemas

### User
```js
{
  name:      String (required),
  email:     String (required, unique),
  password:  String (hashed with bcryptjs),
  timestamps: true
}
```

### Task
```js
{
  title:       String (required),
  description: String,
  status:      String (enum: ['pending', 'completed'], default: 'pending'),
  userId:      ObjectId (ref: User),
  timestamps:  true
}
```

---

## 📸 Screenshots

> *(Add screenshots here after deployment)*

| Page | Preview |
|------|---------|
| Login  |<img width="1127" height="900" alt="image" src="https://github.com/user-attachments/assets/0fed7d4b-e613-4b7f-bcbd-39ca0c8c07e8" />
| Register |<img width="1128" height="904" alt="image" src="https://github.com/user-attachments/assets/685ace6d-0606-4b55-9fd5-33b3880baaa8" />
| Dashboard |<img width="1128" height="899" alt="image" src="https://github.com/user-attachments/assets/24663149-eeaa-4e70-8643-3729050961df" />


---

## 🌐 Deployment

| Layer | Platform |
|-------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | MongoDB Atlas |

---

## 👤 Author

**Tanujeet Singh**
- GitHub: [@Tanujeet](https://github.com/Tanujeet)
- LinkedIn: [linkedin.com/in/tanujeetsingh](https://linkedin.com/in/tanujeetsingh)
- Portfolio: [portfolio-eu3a.vercel.app](https://portfolio-eu3a.vercel.app)
