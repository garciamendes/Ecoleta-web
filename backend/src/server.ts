import express from 'express'

const app = express()

app.get('/users', (req, res) => {
  return res.json({ Message: 'Hello World'})
})

app.listen(3333)