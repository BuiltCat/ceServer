const express = require('express')
const router = express.Router()
const baseServicse = require('../servicse/base_servicse')
const apiRes = require('../tool/api_response')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    })
})

router.post('/setBase', (req, res, next) => {
    (async () => {
        const {
            eqnum,
            eqtime,
            longitude,
            latitude,
            magnitude,
            depth,
            type,
            state
        } = req.body[0]
        
        console.log(req.body)
        return baseServicse.setBase(
            eqtime,
            longitude,
            latitude,
            magnitude,
            depth,
            type,
            state)
    })().then(r => {
            res.data = r
            apiRes(req, res)
        })
        .catch(e => {
            next(e)
        })

})

router.get('/getBase', (req, res, next) => {
    (async () => {
        const a = await baseServicse.getBase()
        return a
    })().then(r => {
        res.data = r
        apiRes(req, res)
    }).catch(e => {
        next(e)
    })
})

router.get('/getBaseByYear', (req, res, next) => {
    (async () => {
        const a = await baseServicse.getBaseByYear()
        return a
    })().then(r => {
        res.data = r
        apiRes(req, res)
    }).catch(e => {
        next(e)
    })
})

router.get('/getLevelData', (req, res, next) => {
    (async () => {
        const a = await baseServicse.getNumByYearAndMag()
        return a
    })().then(r => {
        res.data = r
        apiRes(req, res)
    }).catch(e => {
        next(e)
    })
})
module.exports = router;