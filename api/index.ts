import express from 'express'
const app = express()
const port = 4000

app.get('/', (_req , res) => {
  res.send('First request ')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})