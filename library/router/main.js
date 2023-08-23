const axios = require('axios')
const express = require('express')
const { stickerpack, pinterest, wikimedia, dafont, wikipedia, quotesNime, ssWeb, removeBg, upscale, youtubeDL, tiktokDL, soundcloud, mediafire, twitter, y2mate, facebook, getMole, getPLN, aiSlogan, aiName } = require('@library/modules/scraper')

const router = express.Router()

// ========== [ HOME ] ========== \\
router.get('/', (req, res) => { res.render('home') })

// ========== [ GAME ] ========== \\
router.get('/api/game/caklontong', async (req, res) => {
    let data = require('@library/db/caklontong.json')
    let result = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/game/family100', async (req, res) => {
    let data = require('@library/db/family100.json')
    let result = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/game/susunkata', async (req, res) => {
    let data = require('@library/db/susunkata.json')
    let result = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/game/tebakkata', async (req, res) => {
    let data = require('@library/db/tebakkata.json')
    let result = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/game/tebakkalimat', async (req, res) => {
    let data = require('@library/db/tebakkalimat.json')
    let result = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

// ========== [ SEARCHER ] ========== \\
router.get('/api/searcher/dafont', async (req, res) => {
    let query = req.query.query
    let data = await dafont(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/searcher/stickerpack', async (req, res) => {
    let query = req.query.query
    let data = await stickerpack(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    await axios.get(data.result[Math.floor(Math.random() * data.result.length)], { responseType: 'arraybuffer' })
        .then(result => {
            res.set({ 'Content-Type': 'image/webp' })
            return res.send(result.data)
        })
        .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
})

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
    let data = await twitter(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/downloader/facebook', async (req, res) => {
    let url = req.query.url
    let data = await facebook(url)

    if (!url || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

// ========== [ RANDOM TEXT ] ========== \\
router.get('/api/random/quotes', async (req, res) => {
    let data = require('@library/db/quotes.json')
    let quotes = data[Math.floor(Math.random() * data.length)]

    return res.status(200).json({ status: true, creator: '@shanndev28', result: { name: quotes.author, quote: quotes.quotes } })
})

router.get('/api/random/quotesnime', async (req, res) => {
    let data = await quotesNime()

    if (!data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

// ========== [ CONVERTER ] ========== \\
router.get('/api/converter/towebp', async (req, res) => {
    let img = req.query.img
    if (!img) return res.status(422).json({ status: false, creator: '@shanndev28' })

    await axios.get(img, { responseType: 'arraybuffer' })
        .then(result => {
            if (!/image/.test(result.headers['content-type'])) return res.status(422).json({ status: false, creator: '@shanndev28' })

            res.set({ 'Content-Type': 'image/webp' })
            return res.send(result.data)
        })
        .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
})

router.get('/api/converter/topng', async (req, res) => {
    let img = req.query.img
    if (!img) return res.status(422).json({ status: false, creator: '@shanndev28' })

    await axios.get(img, { responseType: 'arraybuffer' })
        .then(result => {
            if (!/image/.test(result.headers['content-type'])) return res.status(422).json({ status: false, creator: '@shanndev28' })

            res.set({ 'Content-Type': 'image/png' })
            return res.send(result.data)
        })
        .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
})

router.get('/api/converter/removebg', async (req, res) => {
    let img = req.query.img
    if (!img) return res.status(422).json({ status: false, creator: '@shanndev28' })

    await axios.get(img, { responseType: 'arraybuffer' })
        .then(async (result) => {
            if (!/image/.test(result.headers['content-type'])) return res.status(422).json({ status: false, creator: '@shanndev28' })

            let file = `data:${result.headers['content-type']};base64,${result.data.toString('base64')}`
            let data = await removeBg(file)

            if (!data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })

            await axios.get(data.result, { responseType: 'arraybuffer' })
                .then(({ data }) => {
                    res.set({ 'Content-Type': 'image/png' })
                    return res.send(data)
                })
                .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
        })
        .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
})

router.get('/api/converter/remini', async (req, res) => {
    let img = req.query.img
    if (!img) return res.status(422).json({ status: false, creator: '@shanndev28' })

    await axios.get(img, { responseType: 'arraybuffer' })
        .then(async (result) => {
            if (!/image/.test(result.headers['content-type'])) return res.status(422).json({ status: false, creator: '@shanndev28' })

            let file = `data:${result.headers['content-type']};base64,${result.data.toString('base64')}`
            let data = await upscale(file)

            if (!data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })

            await axios.get(data.result, { responseType: 'arraybuffer' })
                .then(({ data }) => {
                    res.set({ 'Content-Type': 'image/png' })
                    return res.send(data)
                })
                .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
        })
        .catch(() => { return res.status(422).json({ status: false, creator: '@shanndev28' }) })
})

router.get('/api/converter/ssweb', async (req, res) => {
    let url = req.query.url
    let width = req.query.w
    let height = req.query.h
    let data = await ssWeb({ width, height, url })

    if (!url || !width || !height || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    res.set({ 'Content-Type': 'image/jpeg' })
    return res.send(Buffer.from(data.result.replace('data:image/jpeg;base64,', ''), 'base64'))
})

// ========== [ GENERATOR ] ========== \\
router.get('/api/generator/halah', async (req, res) => {
    let text = req.query.text
    let result = text.replace(/a|i|u|e|o/g, 'a')

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/generator/hilih', async (req, res) => {
    let text = req.query.text
    let result = text.replace(/a|i|u|e|o/g, 'i')

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/generator/huluh', async (req, res) => {
    let text = req.query.text
    let result = text.replace(/a|i|u|e|o/g, 'u')

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/generator/heleh', async (req, res) => {
    let text = req.query.text
    let result = text.replace(/a|i|u|e|o/g, 'e')

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

router.get('/api/generator/holoh', async (req, res) => {
    let text = req.query.text
    let result = text.replace(/a|i|u|e|o/g, 'o')

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result })
})

// ========== [ AI ] ========== \\
router.get('/api/checker/mobile-legend', async (req, res) => {
    let { id, zone } = req.query
    let data = await getMole({ user_id: id, zone_id: zone })

    if (!id || !zone || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/checker/pln-subscribe', async (req, res) => {
    let { id } = req.query
    let data = await getPLN(id)

    if (!id || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

// ========== [ AI ] ========== \\
router.get('/api/generator/openai', async (req, res) => {
    let text = req.query.text
    let { Configuration, OpenAIApi } = require('openai')

    const configuration = new Configuration({ apiKey: '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' })
    const openai = new OpenAIApi(configuration)

    if (!text) return res.status(422).json({ status: false, creator: '@shanndev28' })
    const chatCompletion = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: text }] })

    if (chatCompletion.status !== 200) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json({ status: true, creator: '@shanndev28', result: chatCompletion.data.choices[0].message })
})

router.get('/api/generator/slogan', async (req, res) => {
    let query = req.query.query
    let data = await aiSlogan(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

router.get('/api/generator/name', async (req, res) => {
    let query = req.query.query
    let data = await aiName(query)

    if (!query || !data || !data.status) return res.status(422).json({ status: false, creator: '@shanndev28' })
    return res.status(200).json(data)
})

module.exports = router