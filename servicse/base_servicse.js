const base = require('../models/baseData')

module.exports.setBase = async (eqtime, longitude, latitude, magnitude, depth, type, state) => {
    return await base.setBase(eqtime, longitude, latitude, magnitude, depth, type, state)
}

module.exports.getBase = async () => {
    return await base.getBase()
}

module.exports.getBaseByYear = async () => {
    const collection = new Array()
    for(let year = 2003; year <= 2017; year++){
        const baseByYear = await base.getBaseByYear(year)
        const latAndLonAndMags = new Array()
        baseByYear.forEach((value) => {
            const latAndLonAndMag = [
                value.latitude,
                value.longitude,
                value.magnitude
            ]
            latAndLonAndMags.push(latAndLonAndMag)
        })
        collection.push(latAndLonAndMags)
    }
    return collection
}

module.exports.getNumByYearAndMag = async () => {
    const title = new Array()
    const data = new Array()
    for(let year = 2003; year <= 2017; year++){
        const tmpData = new Array()
        for(let mag = 1; mag <=8; mag++){
            tmpData.push(await base.getNumByYearAndMag(year, mag))
        }
        title.push(year)
        data.push(tmpData)
    }
    collection = {
        title: title,
        data: data
    }
    return collection

}