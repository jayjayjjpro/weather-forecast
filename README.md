Weather Tracking App
Overview
The Weather Tracking App allows users to track the current weather conditions of various cities worldwide. The app provides an intuitive user interface that fetches live weather data, including temperature, humidity, and weather conditions, using a third-party weather API. The app displays weather information for cities and shows results on an interactive map, based on predefined or popular cities.

The app is built using Node.js for the backend, React.js for the frontend, and PostgreSQL for storing the most popular cities being tracked. The app is hosted in the cloud and supports automated deployments via GitHub Actions.

Key Features

Live Weather Information: Get real-time weather updates for cities around the globe.


Popular Cities Tracking: Track the most popular cities being searched by users.


Global Map Display: Visualize global weather data with an interactive map.

├── backend                # Express.js API + Supabase DB
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend               # React + Vite client
│   ├── template/
│   │   ├── public/
│   │   └── src/
│   ├── index.html
│   ├── vite.config.js

│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
├── .gitignore
└── README.md              # You are here
Contributing
We welcome contributions to the Weather Tracking App! Please feel free to fork the repository and submit a pull request.

How to Contribute:

Fork the repository.


Create a new branch for your feature or bugfix.


Make your changes.


Open a pull request with a description of your changes.
Porject Created by
Da jie
Kevin
Cuthbert
Pranav