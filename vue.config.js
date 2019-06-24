module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin("define").tap(options => {
            console.log(options)
            return options
        })
    }
}