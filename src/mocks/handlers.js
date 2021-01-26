import { rest } from 'msw'

const getAbsoluteAPIUrl = (path) => new URL(path, process.env.REACT_APP_API_URL).toString()

export const mockedRecommendations = [
  {
    "type": "PRIVATE_LIABILITY",
    "price": {
      "amount": 4.3,
      "periodicity": "MONTH"
    }
  },
  {
    "type": "HOME_CONTENT",
    "price": {
      "amount": 103.32,
      "periodicity": "YEAR"
    }
  },
  {
    "type": "HEALTH_INSURANCE",
    "price": {
      "amount": 320.32,
      "periodicity": "MONTH"
    }
  }
]

export const handlers = [
  // Handles a POST /user request
  rest.post(getAbsoluteAPIUrl('user'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        jwt: 'authenticate-me-token'
      })
    )
  }),
  // Handles a GET /recommendation request
  rest.get(getAbsoluteAPIUrl('recommendation'), (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = req.headers.map.authorization === 'Bearer authenticate-me-token'
    if (!isAuthenticated) {
      // If not authenticated, respond with a 401 error
      return res(
        ctx.status(401),
        ctx.json({
          error: {
            message: 'Not authorized',
          }
        }),
      )
    }
    // If authenticated, return a mocked recommendation list
    return res(
      ctx.status(200),
      ctx.json(mockedRecommendations),
    )
  }),
]