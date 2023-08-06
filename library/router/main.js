const express = require('express')
const { pinterest, wikimedia, dafont, wikipedia, quotes, quotesNime, youtubeDL, tiktokDL, soundcloud, mediafire, instaDL, y2mate } = require('@library/modules/scraper')

const router = express.Router()

// ========== [ HOME ] ========== \\
router.get('/', (req, res) => { res.render('home') })

// ========== [ SEARCHER ] ========== \\
router.get('/api/searcher/pinterest', async (req, res) => {
    let query = req.query.query
    let data = await pinterest(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/searcher/wikimedia', async (req, res) => {
    let query = req.query.query
    let data = await wikimedia(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/searcher/wikipedia', async (req, res) => {
    let query = req.query.query
    let data = await wikipedia(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/searcher/dafont', async (req, res) => {
    let query = req.query.query
    let data = await dafont(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})


// ========== [ DOWNLOADER ] ========== \\
router.get('/api/downloader/tiktok', async (req, res) => {
    let url = req.query.url
    let data = await tiktokDL(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/youtube', async (req, res) => {
    let url = req.query.url
    let data = await youtubeDL(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/soundcloud', async (req, res) => {
    let url = req.query.url
    let data = await soundcloud(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/mediafire', async (req, res) => {
    let url = req.query.url
    let data = await mediafire(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/instagram', async (req, res) => {
    let url = req.query.url
    let data = await y2mate(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/twitter', async (req, res) => {
    let url = req.query.url
    let data = await y2mate(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

// ========== [ RANDOM TEXT ] ========== \\
router.get('/api/random/quotes', async (req, res) => {
    let data = await quotes()

    if (!data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/random/quotesnime', async (req, res) => {
    let data = await quotesNime()

    if (!data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

module.exports = router