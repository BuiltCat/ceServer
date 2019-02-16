const mongoose = require('mongoose')

const baseSchame = mongoose.Schema({
    eqtime: {
        type: Date,
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    magnitude: {
        type: Number,
    },
    depth: {
        type: Number,
    },
    type: {
        type: String,
    },
    state: {
        type: Number,
    }
})

const uri = `mongodb://127.0.0.1:27017/could`

mongoose.connect(uri, {
    useNewUrlParser: true
})

const db = mongoose.connection

const baseModel = mongoose.model('base', baseSchame)

class Base {
    constructor(eqtime, longitude, latitude, magnitude, depth, type, state) {
        this.eqtime = eqtime
        this.longitude = longitude
        this.latitude = latitude
        this.magnitude = magnitude
        this.depth = depth
        this.type = type
        this.state = state
    }

    //  添加地震条目
    static async setBase(eqtime, longitude, latitude, magnitude, depth, type, state) {
        const newBase = new Base(eqtime, longitude, latitude, magnitude, depth, type, state)
        const base = new baseModel(newBase)
        await base.save()
        return base
    }
    // 获得地震条目
    static async getBase() {
        const query = baseModel.find({
            magnitude: {
                $gt: 5
            }
        })
        return await query.then()
    }
    // 根据年获得地震条目
    static async getBaseByYear(year) {
        const query = baseModel.find({
            eqtime: {
                $gte: new Date(`${year}-1-1`),
                $lte: new Date(`${year}-12-31`)
            },
            magnitude: {
                $gte: 5
            }
        })
        return await query.then()
    }
    // 根据年和震级获得地震条数
    static async getNumByYearAndMag(year, mag){
        const query = baseModel.count({
            eqtime: {
                $gte: new Date(`${year}-1-1`),
                $lte: new Date(`${year}-12-31`)
            },
            magnitude: {
                $gte: mag,
                $lte: mag+0.99
            }
        })
        return await query.then()
    }
}
module.exports = Base