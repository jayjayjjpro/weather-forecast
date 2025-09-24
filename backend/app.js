const express = require('express');
const { Pool } = require('pg'); // Import the Pool class

const app = express();
const port = 3000;

// Configure the database connection pool
let pool;
if (!process.env.DATABASE_URL) {
    pool = new Pool({
        user: process.env.PG_USER || 'postgres',
        host: process.env.PG_HOST || '127.0.0.1', 
        database: process.env.PG_DATABASE || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres',
        port: process.env.PG_PORT || 5432,
        ssl: process.env.PG_SSL === 'true' ? true : false,
    });
} else {
    // For production environments like Vercel
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => { 
    res.send('Hello from Node.js!'); 
});

// Weather endpoints
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const result = await pool.query(
            'SELECT city, clicks FROM WeatherForecast WHERE city = $1',
            [city]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `No weather data found for city: ${city}` });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.get('/weather/click', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        // Get current clicks
        const result = await pool.query(
            'SELECT clicks FROM WeatherForecast WHERE city = $1',
            [city]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `No data found for city: ${city}` });
        }

        const newClicks = result.rows[0].clicks + 1;

        // Update clicks
        const updateResult = await pool.query(
            'UPDATE WeatherForecast SET clicks = $1 WHERE city = $2 RETURNING *',
            [newClicks, city]
        );

        res.json({ message: `Clicks updated for ${city}`, clicks: newClicks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

// Export the app for testing
module.exports = app;