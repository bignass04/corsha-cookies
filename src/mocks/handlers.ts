import { rest } from 'msw'

// 2. Describe network behavior with request handlers.
export const handlers = [
  rest.get('https://api.mnasser.com/cookies', async (_, res, ctx) =>
    res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json(cookieList)
    )
  ),
]

export const cookieList = [
  {
    label: 'Chocolate Chip',
    value: 'chocolate',
  },
  {
    label: 'Shortbread',
    value: 'shortbread'
  },
  {
    label: 'Macaroon',
    value: 'macaroon',
  }
]
