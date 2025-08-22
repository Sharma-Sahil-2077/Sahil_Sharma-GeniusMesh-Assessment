const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Server Working')
})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})
