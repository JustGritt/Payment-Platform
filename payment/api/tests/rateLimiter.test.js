const { rateLimiter } = require('../middlewares/rateLimiter');
const { ratelimit } = require('../libs/redis');


jest.mock('../libs/redis', () => ({
  ratelimit: {
    limit: jest.fn(),
  },
}));

describe('rateLimiter', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      ip: '127.0.0.1',
      headers: {},
      socket: {
        remoteAddress: '127.0.0.1',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() when rate limit is not exceeded', async () => {
    // Arrange
    const mockLimitResult = {
      remaining: 10,
      reset: 1626930000,
      limit: 100,
      success: true,
      pending: Promise.resolve(),
    };
    ratelimit.limit.mockResolvedValueOnce(mockLimitResult);

    // Act
    await rateLimiter(req, res, next);

    // Assert
    expect(ratelimit.limit).toHaveBeenCalledWith('mw_rateLimit:127.0.0.1');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should send 429 status with error message and headers when rate limit is exceeded', async () => {
    // Arrange
    const mockLimitResult = {
      remaining: 0,
      reset: 1626930000,
      limit: 100,
      success: false,
      pending: Promise.resolve(),
    };
    ratelimit.limit.mockResolvedValueOnce(mockLimitResult);

    // Act
    await rateLimiter(req, res, next);

    // Assert
    expect(ratelimit.limit).toHaveBeenCalledWith('mw_rateLimit:127.0.0.1');
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Too many requests per minute',
      headers: {
        'Retry-After': mockLimitResult.reset,
        'X-RateLimit-Limit': mockLimitResult.limit,
      },
    });
    expect(next).not.toHaveBeenCalled();
  });
});
