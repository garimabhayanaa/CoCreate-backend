# CoCreate Backend

CoCreate's backend is built using **Node.js, Express, MongoDB**, and **Socket.IO** for real-time collaboration. It provides **user authentication, document management, live updates, and AI assistance.**

## 🚀 Live API  
Backend: [CoCreate API (Render)](https://cocreate-el2b.onrender.com)  

---

## 📂 Project Structure
```
backend/ 
│── src/ │ 
├── models/ # Mongoose models (User, Document, Changelog) 
│ ├── routes/ # API routes (Auth, Documents, Collaboration) 
│ ├── controllers/ # Business logic 
│ ├── index.js # Main Express server 
│── .env # Environment variables 
│── package.json # Dependencies & scripts 
└── README.md
```

---

## 🔧 **Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/cocreate-backend.git
cd cocreate-backend
```
### **2️⃣ Install Dependencies**
```sh
npm install
```
### **3️⃣ Create a .env File**
Create a .env file in the root directory and add:

PORT=5001
MONGO_URI=mongodb+srv://your-db-uri
FRONTEND_URL=https://cocreatecolab.netlify.app
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
### **4️⃣ Run Locally
```sh
npm start
```
### **5️⃣ Deployment (Render)**
Push changes to GitHub, and Render will auto-deploy.
To restart manually:
```sh
render redeploy backend-service
```
## Features
* ✅ Real-time collaboration with Socket.IO
* ✅ Document management (Create, Read, Update, Delete)
* ✅ Role-based access control (Owner, Editor, Viewer)
* ✅ Change tracking (Changelog with user email & timestamp)
* ✅ AI-powered assistance with Gemini API
* ✅ Authentication via Firebase

## Tech Stack
* Backend: Node.js, Express, MongoDB

* Real-time: Socket.IO

* Auth: Firebase

* AI Integration: Gemini API

* Deployment: Render

## License
This project is open-source under the MIT License.
