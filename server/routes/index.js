const router = require('express').Router()
const cache = require('../middlewares/cache')
const axios = require('axios')
const jsonPasar = require('../db.json')['pasar']
const jsonCategories = require('../db.json')['categories']
var Scraper = require('images-scraper')

router.get('/', function(req, res) {
  res.status(200).json({
    msg: 'app is running!'
  })
})

// scrap and save to json server
router.post('/pasar', function(req, res) {
  let pasar = req.body.pasar
  axios.post('http://localhost:3000/pasar', JSON.parse(pasar))
    .then(() => {
      res.status(200).json({
        'oke': 'oke'
      })
    })
})

router.get('/pasar', function(req, res) {
  res.status(200).json({
    msg: 'app is running!',
    data: jsonPasar
  })
})

router.get('/pasar/:id', function(req, res) {
  let idPasar = req.params.id
  let searchQuery = req.query.q
  let data = `draw=1&columns[0][data]=0&columns[0][name]=&columns[0][searchable]=true&columns[0][orderable]=true&columns[0][search][value]=&columns[0][search][regex]=false&columns[1][data]=1&columns[1][name]=&columns[1][searchable]=true&columns[1][orderable]=true&columns[1][search][value]=&columns[1][search][regex]=false&columns[2][data]=2&columns[2][name]=&columns[2][searchable]=true&columns[2][orderable]=true&columns[2][search][value]=&columns[2][search][regex]=false&columns[3][data]=3&columns[3][name]=&columns[3][searchable]=true&columns[3][orderable]=true&columns[3][search][value]=&columns[3][search][regex]=false&order[0][column]=0&order[0][dir]=asc&start=0&length=50&search[value]=${searchQuery}&search[regex]=false&hid_idPasar=${idPasar}`
  axios({
    url: 'http://103.43.129.76:4321/homer/ajax-data-covid19.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data
  })
    .then(({data}) => {
      let arr = []
      data.data.forEach(el => {
        let obj = {
          pasar: el[0],
          contactName: el[1].split(' - ')[0],
          contactNumber: el[1].split(' | ')[0].split(' - ')[1],
          category: el[1].split(' | ').slice(1),
          location: el[3]
        }
        arr.push(obj)
      })
      return res.status(200).json({
        msg: 'app is running!',
        data: arr
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
})

router.get('/categories', function(req, res) {
  res.status(200).json({
    msg: 'app is running!',
    data: jsonCategories
  })
})

router.get('/news', cache(10), function(req, res) {
  axios({
    url: `http://newsapi.org/v2/everything?q=pangan&sortBy=publishedAt&apiKey=${process.env.APIKEY_NEWS}`,
    method: 'GET'
  })
    .then(({data}) => {
      return res.status(200).json({
        msg: 'app is running!',
        data
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
})

router.get('/search-image/:image', cache(60), function(req, res) {
  const keyword = req.params.image

  const google = new Scraper({
    puppeteer: {
      headless: true,
      limit: 3
    }
  })

  google.scrape(keyword, 10)
    .then(results => {
      return res.status(200).json({
        msg: 'app is running!',
        keyword,
        results
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        err
      })
    })
  
})

module.exports = router