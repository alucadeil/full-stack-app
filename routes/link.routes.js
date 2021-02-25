const {Router} = require('express')
const Link = require('../models/Link')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = new Router()

router.post('/generate', auth, async (req, res) => {
  let re;
  try {
    const baseUrl = config.get("baseUrl")
    let {from, _id} = req.body
    console.log(_id)
    
    const code = shortid.generate()
    
    re = new RegExp(/^([a-zA-Z]+):\/\//)
    if (!from.match(re)) {
      from = `https://${from}`
    }
    
    const existing = await Link.findOne({from, _id})
    if (existing) {
      return res.json({link: existing})
    }
    
    const to = baseUrl + '/t/' + code
    
    const link = new Link({
      code, to, from, owner: req.user.userId
    })
    
    await link.save()
    res.status(201).json({link})
    
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId})
    res.json(links)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id) // ???
    res.json(link)
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router
