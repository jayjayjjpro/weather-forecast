import express from 'express'
import cors from 'cors'            // <-- Import cors
import supabase from './db.js'

const app = express()

// Enable CORS for your frontend origin
app.use(cors({
  origin: 'frontend-one-tau-44.vercel.app', // frontend URL
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/weather', async (req, res) => {
  const city = req.query.city

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  const { data, error } = await supabase
    .from('WeatherForecast')
    .select('city, clicks')
    .eq('city', city)

  if (error) return res.status(500).json({ error: error.message })
  if (!data || data.length === 0) {
    return res.status(404).json({ error: `No weather data found for city: ${city}` })
  }

  res.json(data[0]) // Return a single result object
})

app.get('/weather/click', async (req, res) => {
  const city = req.query.city

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  // Fetch current clicks
  const { data, error: fetchError } = await supabase
    .from('WeatherForecast')
    .select('clicks')
    .eq('city', city)
    .single()

  if (fetchError) {
    return res.status(500).json({ error: fetchError.message })
  }

  if (!data) {
    return res.status(404).json({ error: `No data found for city: ${city}` })
  }

  const newClicks = data.clicks + 1

  // Update clicks
  const { error: updateError } = await supabase
    .from('WeatherForecast')
    .update({ clicks: newClicks })
    .eq('city', city)

  if (updateError) {
    return res.status(500).json({ error: updateError.message })
  }

  res.json({ message: `Clicks updated for ${city}`, clicks: newClicks })
})

app.listen(3000, () => console.log('Server running on port 3000'))
