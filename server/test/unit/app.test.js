const request = require('supertest');
const { app } = require('../../src/app');

describe('API: ping', () => {
  test('should respond with pong', async () => {
    const response = await request(app.callback()).get('/api/ping');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.code).toEqual('success');
    expect(response.body.message).toEqual('pong');
  });
});
