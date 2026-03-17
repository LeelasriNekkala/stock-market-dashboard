# 📈 Stock Market Dashboard (Express.js + Finnhub API)

A **Stock Market Dashboard Backend Application** built using **Node.js, Express.js, MongoDB, and EJS**.

The application allows users to:

* Register and login securely
* View real-time stock prices
* Buy stocks
* Manage their portfolio
* Access admin and user dashboards

This project demonstrates **REST API development, authentication, third-party API integration, and server-side rendering with EJS**.

---

# 🚀 Features

* User Registration & Login
* JWT Authentication
* Real-time Stock Data
* Buy Stocks
* Portfolio Management
* Admin Dashboard
* User Dashboard
* Finnhub API Integration
* Server-side Rendering with EJS
* MongoDB Database Integration

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt (Password Hashing)

## Database

* MongoDB
* Mongoose

## External API

* Finnhub Stock API

## Frontend Rendering

* EJS Templates

---

# 📂 Project Structure

```
stock-backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── portfolioController.js
│   └── stockController.js
│
├── middlewares
│   └── auth.middleware.js
│
├── models
│   ├── User.js
│   ├── Stock.js
│   └── Portfolio.js
│
├── routes
│   ├── stockRoutes.js
│   └── viewRoutes.js
│
├── services
│   ├── finnhubService.js
│   └── stockService.js
│
├── utils
│   └── apiClient.js
│
├── views
│   ├── admin
│   │   └── dashboard.ejs
│   │
│   ├── auth
│   │   ├── login.ejs
│   │   └── register.ejs
│   │
│   └── portfolio
│       └── buy.ejs
│
├── scripts
│   └── createAdmin.js
│
├── .env
├── server.js
├── package.json
└── package-lock.json
```

---

# 🔐 Authentication

The application implements **JWT-based authentication**.

### Features

* Secure user registration
* Password hashing using bcrypt
* JWT token generation
* Protected routes using middleware

### Roles

* Admin
* User

---

# ⚙ Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FINNHUB_API_KEY=your_finnhub_api_key
JWT_SECRET=your_jwt_secret
```

---

# 📊 Finnhub API Integration

This project integrates the **Finnhub Stock API** to fetch real-time stock market data.

Example API Request

```
GET https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY
```

Example API Response

```
{
  "c": 189.45,
  "h": 190.20,
  "l": 188.60,
  "o": 189.00,
  "pc": 187.80,
  "t": 1712000000
}
```

### Response Fields

| Field | Meaning        |
| ----- | -------------- |
| c     | Current Price  |
| h     | High Price     |
| l     | Low Price      |
| o     | Open Price     |
| pc    | Previous Close |

---

# 🚀 Running the Project

## Clone Repository

```
https://github.com/LeelasriNekkala/stock-market-dashboard.git
```

```
cd stock-backend
```

---

## Install Dependencies

```
npm install
```

---

## Start the Server

```
node server.js
```

or

```
npm start
```

Server runs at:

```
http://localhost:5000
```

---

# 🧪 API Testing Using cURL

## Register User

```
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Leela","email":"leela@gmail.com","password":"123456"}'
```

Response

```
{
 "success": true,
 "message": "User registered successfully"
}
```

---

## Login User

```
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"leela@gmail.com","password":"123456"}'
```

Response

```
{
 "success": true,
 "token": "jwt_token_here"
}
```

---

## Get Stock Price

```
curl http://localhost:5000/api/stocks/AAPL
```

Response

```
{
 "symbol": "AAPL",
 "price": 189.45,
 "high": 190.20,
 "low": 188.60
}
```

---

## Buy Stock

```
curl -X POST http://localhost:5000/api/buy \
-H "Content-Type: application/json" \
-d '{"symbol":"AAPL","quantity":5}'
```

Response

```
{
 "success": true,
 "message": "Stock purchased successfully"
}
```

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected routes middleware
* Input validation

---

# 📚 Learning Outcomes

This project demonstrates:

* Node.js backend architecture
* Express REST API development
* Third-party API integration (Finnhub)
* JWT authentication
* MongoDB schema design
* MVC architecture
* Server-side rendering with EJS

---

# 👨‍💻 Author


**Leelasri Nekkala**
MERN Stack Developer
