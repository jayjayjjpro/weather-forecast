# 🌦️ Weather Tracking App

Live view: https://frontend-one-tau-44.vercel.app/

## Overview

The **Weather Tracking App** allows users to track current weather conditions of various cities worldwide. It provides an intuitive user interface that fetches live weather data — such as temperature, humidity, and weather conditions — using a third-party weather API. Weather information is displayed on an interactive global map, focusing on predefined or popular cities.

The app is built using **Node.js** for the backend, **React.js** with **Vite** for the frontend, and **PostgreSQL** (via Neon) for storing data about the most popular tracked cities. The app is cloud-hosted and supports automated deployments via **GitHub Actions**.

---

## 🔑 Key Features

- **Live Weather Information**  
  Get real-time weather updates for cities around the globe.

- **Popular Cities Tracking**  
  Track the most popular cities being searched by users.

- **Global Map Display**  
  Visualize global weather data with an interactive map.

---

## 📁 Project Structure
```
backend/ # Express.js API + Postgres DB
├── app.js
├── db.js
├── package.json
└── package-lock.json

frontend/ # React + Vite client
│── public/
│── src/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
└── README.md

.gitignore
README.md
```

---

## 🤝 Contributing

We welcome contributions to the **Weather Tracking App**! Feel free to fork the repository and submit a pull request.

### How to Contribute

1. **Fork** the repository  
2. **Create a new branch** for your feature or bugfix  
3. **Make your changes**  
4. **Open a pull request** with a description of your changes  

---

## 👨‍💻 Project Created By

- Kevin
- Da Jie
- Cuthbert
- Pranav
