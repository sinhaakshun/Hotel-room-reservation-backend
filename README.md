# 🏨 Hotel Room Reservation – Backend

This is the backend service for the **Hotel Room Reservation System**, built using **Node.js**, **Express**, **TypeScript**, and **MongoDB Atlas**.  
It provides APIs for room listing, booking, and data management.

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Render (Deployment)**

---

## 📁 Project Structure
```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── db/
 ├── seeds/
 ├── app.ts
 └── server.ts
```

---

## ⚙ Environment Variables

Create a `.env` file in the backend root:

```
MONGO_URI=your_mongo_connection_string
PORT=3000
```

Make sure your MongoDB Atlas cluster has IP access configured:
- `0.0.0.0/0` (for Render)
- Your local IP (optional)

---

## 📦 Install Dependencies
```sh
npm install
# or
yarn install
```

---

## ▶ Run in Development
```sh
npm run dev
```

---

## 🏗 Build for Production
```sh
npm run build
```

---

## ▶ Run Production Build
```sh
node dist/app.js
```

---

## 🌍 API Endpoints

### **Rooms**
| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| GET    | `/rooms`     | Get all rooms          |
| POST   | `/rooms/book` | Book one or more rooms |

---

## 💾 Seed Script
To populate sample rooms:

```sh
npm run seed
```

---

## ☁ Deployment (Render)

### **Render Settings**
- Build Command:
  ```
  npm run build
  ```
- Start Command:
  ```
  node dist/app.js
  ```
- Environment Variables:  
  - `MONGO_URI`
  - `PORT`

### IMPORTANT
MongoDB Atlas must allow:
- `0.0.0.0/0` (Render will otherwise fail to connect)

---

## 🔐 CORS Configuration
```ts
app.use(cors({
  origin: "*", // allow all frontend URLs
}));
```

---

## 📌 Notes
- Backend auto-detects `PORT` from `.env` or Render.
- Works seamlessly with Vercel frontend.

---

## 📜 License
MIT License.
