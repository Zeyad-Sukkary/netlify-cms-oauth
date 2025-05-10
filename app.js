require('dotenv').config({ silent: true })
const express = require('express')
const cors = require('cors')  // Import the CORS package
const middleWarez = require('./index.js')
const port = process.env.PORT || 3000

const app = express()

// Configure CORS options to allow only your GitHub Pages domain
const corsOptions = {
  origin: 'https://zeyad-sukkary.github.io',  // Allow only requests from this domain
  methods: ['GET', 'POST', 'OPTIONS'],       // Allow these methods
  allowedHeaders: ['Content-Type'],          // Allow these headers
}

// Use CORS middleware with the configured options
app.use(cors(corsOptions))

// Initial page redirecting to Github
app.get('/auth', middleWarez.auth)

// Callback service parsing the authorization token
// and asking for the access token
app.get('/callback', middleWarez.callback)

app.get('/success', middleWarez.success)
app.get('/', middleWarez.index)

app.listen(port, () => {
  console.log("Netlify CMS OAuth provider listening on port " + port)
})
