module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Access2Ag'
        }
    },
    pwa: {
        name: 'Access2Ag',
        themeColor: '#000000',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'GenerateSW'
    }
}
