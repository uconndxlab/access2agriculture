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
        themeColor: '#FFFFFF',
        msTileColor: '#FFFFFF',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'GenerateSW'
    }
}
