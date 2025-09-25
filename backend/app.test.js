// app.test.js
const request = require('supertest');

let mockPool;
jest.mock('pg', () => {
  mockPool = { query: jest.fn() };
  return { Pool: jest.fn(() => mockPool) };
});

describe('API routes', () => {
  let app;

  beforeAll(() => {
    process.env.NODE_ENV = 'test';   // prevent app.listen
    jest.resetModules();
    app = require('./app');          // <- your Express app file
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET / responds with greeting', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/Hello from Node\.js!/);
  });

  test('GET /weather missing city => 400', async () => {
    const res = await request(app).get('/weather');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'City parameter is required' });
  });

  test('GET /weather not found => 404', async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/weather').query({ city: 'Atlantis' });
    expect(mockPool.query).toHaveBeenCalledWith(
      'SELECT city, clicks FROM WeatherForecast WHERE city = $1',
      ['Atlantis']
    );
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/No weather data found for city: Atlantis/);
  });

  test('GET /weather returns row => 200', async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [{ city: 'Tokyo', clicks: 5 }] });
    const res = await request(app).get('/weather').query({ city: 'Tokyo' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ city: 'Tokyo', clicks: 5 });
  });

  test('GET /weather/click missing city => 400', async () => {
    const res = await request(app).get('/weather/click');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'City parameter is required' });
  });

  test('GET /weather/click not found => 404', async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/weather/click').query({ city: 'Nowhere' });
    expect(mockPool.query).toHaveBeenCalledWith(
      'SELECT clicks FROM WeatherForecast WHERE city = $1',
      ['Nowhere']
    );
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/No data found for city: Nowhere/);
  });

  test('GET /weather/click increments => 200', async () => {
    mockPool.query
      .mockResolvedValueOnce({ rows: [{ clicks: 7 }] })             // SELECT
      .mockResolvedValueOnce({ rows: [{ city: 'Seoul', clicks: 8 }] }); // UPDATE RETURNING *

    const res = await request(app).get('/weather/click').query({ city: 'Seoul' });

    expect(mockPool.query).toHaveBeenNthCalledWith(
      1,
      'SELECT clicks FROM WeatherForecast WHERE city = $1',
      ['Seoul']
    );
    expect(mockPool.query).toHaveBeenNthCalledWith(
      2,
      'UPDATE WeatherForecast SET clicks = $1 WHERE city = $2 RETURNING *',
      [8, 'Seoul']
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Clicks updated for Seoul', clicks: 8 });
  });

  test('DB error => 500 on /weather', async () => {
    mockPool.query.mockRejectedValueOnce(new Error('db is down'));
    const res = await request(app).get('/weather').query({ city: 'Paris' });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'An internal server error occurred' });
  });
});
