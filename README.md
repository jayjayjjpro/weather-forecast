# 🌤 Weather Tracking App

**Live Demo:** [https://frontend-one-tau-44.vercel.app/](https://frontend-one-tau-44.vercel.app/)  

A full‑stack weather application to look up real‑time weather data for cities worldwide. Users can search cities, view current weather (temperature, humidity, conditions), and see an interactive global map displaying data.  

Built with **Node.js / Express** for backend, **React + Vite** for frontend, and **PostgreSQL** (via Neon) for persisting data about popular cities. Deployment is automated with GitHub Actions and supports cloud hosting.

---

## 🚀 Features

- **Current weather data** (temperature, humidity, etc.) via third‑party weather API  
- **Searchable city list** — fetch weather for any city  
- **Popular cities tracking** — record cities more frequently queried  
- **Global interactive map** — visualize weather data spatially  
- **Cloud deployment & CI/CD** using GitHub Actions  

---

## 📂 Project Structure

```
.
├── backend/             # Express API + Postgres DB logic
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
├── frontend/            # React + Vite client
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── README.md
├── Dockerfile
└── docker-compose.yml
```

- **backend/** — handles API endpoints, database connection, and business logic  
- **frontend/** — React UI, mapping, UI components, fetching from backend  
- **Docker & docker-compose** — containerization for easy setup  

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)  
- PostgreSQL (or a Neon DB instance)  
- Docker & docker-compose (if using container setup)  
- Weather API key (e.g. OpenWeatherMap, etc.)

### Local Setup (without Docker)

1. **Clone repo**  
   ```bash
   git clone https://github.com/jayjayjjpro/weather-forecast.git
   cd weather-forecast
   ```

2. **Backend setup**  
   ```bash
   cd backend
   npm install
   # set environment variables (e.g. DB connection, API key)
   npm run dev
   ```

3. **Frontend setup**  
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Access frontend at `http://localhost:5173` (or other port as specified)  

### Using Docker & Docker Compose

1. Copy `.env.example` (if provided) to `.env` and fill in variables  
2. Run:
   ```bash
   docker-compose up --build
   ```
3. This should launch both the backend and frontend containers, and you can access via the mapped ports.

---

## 📐 Environment Variables

You’ll need to configure:

| Variable               | Purpose                                |
|------------------------|----------------------------------------|
| `DB_HOST`, `DB_USER`, `DB_PASS` | PostgreSQL connection                   |
| `DB_NAME`              | Name of the database                   |
| `WEATHER_API_KEY`      | API key for fetching weather data      |
| (Optional) `PORT`      | Port for backend server                |

Add these to a `.env` file in the `backend` folder (or root, depending on setup).

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

1. Fork this repo  
2. Create a feature branch (`git checkout -b feature/your-feature`)  
3. Make your changes and test  
4. Commit with clear message, push branch  
5. Open a Pull Request describing your changes  

Before submitting, ensure:
- Your code follows the existing style  
- New features are documented  
- Functionality is tested  

---

## 📋 To Do / Future Enhancements

- Add **user authentication** and personalized city lists  
- Support **forecast data** (5‑day, hourly)  
- Add **unit settings** (Celsius / Fahrenheit)  
- Improve **map interactivity** and clustering  
- Add **tests** (unit, integration)  
- Better error handling and fallback flows  
- Add **mobile responsiveness / PWA features**

---

## 🧑‍💻 Authors & Credits

- Kevin  
- Da Jie  
- Cuthbert  
- Pranav  

Developed by the team behind this project.

---

## 📄 License & Acknowledgements

(Insert license here, e.g. MIT)

Thanks to the weather API provider and any open source libraries used (React, Express, Vite, Leaflet/Mapbox, etc).