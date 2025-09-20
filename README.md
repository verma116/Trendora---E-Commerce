# 🛍️ Trendora – MERN E-Commerce Store

Trendora is a **full-stack e-commerce web application** built with the **MERN stack (MongoDB, Express, React, Node.js)**. It provides a modern online shopping experience with product listings, cart management, user authentication, order processing, and an admin dashboard for managing products and users.



## ✨ Features

* 🔐 **User Authentication** (JWT-based login/register)
* 🛒 **Shopping Cart & Checkout**
* 📦 **Order Placement & Payment Integration (PayPal/Stripe-ready)**
* ⭐ **Product Reviews & Ratings**
* 🛍️ **Product Categories** (Mobiles, Laptops, Consoles, Appliances, etc.)
* 🖼️ **Image Upload for Products**
* ⚙️ **Admin Panel** (Manage users, products, orders)
* 📱 **Responsive UI with Bootstrap**
* 🚀 **REST API with Express & MongoDB**



## 🛠️ Tech Stack

* **Frontend:** React, Redux, React-Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Token)
* **Payments:** PayPal/Stripe Integration
* **Deployment Ready:** Heroku / Vercel / Render



## 📂 Project Structure

```
proshop_mern-master/
│── backend/         # Express API & MongoDB models
│── frontend/        # React + Redux frontend
│── uploads/         # Product images
│── .env             # Environment variables
│── package.json     # Scripts & dependencies
│── README.md        # Documentation
```



## ⚡ Installation & Setup

1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/trendora.git
cd trendora
```

2️⃣ Install dependencies:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3️⃣ Add environment variables in `.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

4️⃣ Run the app:

```bash
# Run backend + frontend (concurrently)
npm run dev

# Run backend only
npm run server

# Run frontend only
cd frontend
npm start
```



## 🗄️ Sample Data

You can load sample products & users into MongoDB:

```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```



## 🚀 Deployment

* Frontend can be deployed on **Vercel/Netlify**
* Backend + DB can be deployed on **Render/Heroku/Atlas**
* Update `.env` for production configs



## 📸 Screenshots

## Home Page
<img width="1893" height="981" alt="image" src="https://github.com/user-attachments/assets/149f98d4-097c-40c0-ac40-65aac04b3c7e" />

---

## Profile Page
<img width="1908" height="986" alt="image" src="https://github.com/user-attachments/assets/f3b0e05a-e2a7-4ab4-8618-08ccc6005fe2" />

---

## Cart Page
<img width="1902" height="969" alt="image" src="https://github.com/user-attachments/assets/f099b098-95a0-4a75-bc92-85947748b3cb" />

---

## Reviews & Recommended Products
<img width="1878" height="970" alt="image" src="https://github.com/user-attachments/assets/d45d5ac1-4d23-45c6-97ef-76bf756b70c1" />

---

## Order Page
<img width="1902" height="967" alt="image" src="https://github.com/user-attachments/assets/856f1ac9-4093-48a0-823b-48fe69f98f3f" />

---

## Payment Page
<img width="1907" height="973" alt="image" src="https://github.com/user-attachments/assets/e555856a-80b5-4664-8f56-3a2abc5b0a29" />





## 🤝 Contributing

1. Fork the repo 🍴
2. Create a feature branch 🌱
3. Submit a Pull Request 🎉
