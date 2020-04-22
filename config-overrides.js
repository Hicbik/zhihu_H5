const { useBabelRc,override,fixBabelImports } = require('customize-cra')


module.exports = override(
    useBabelRc(),
    fixBabelImports('import',{
        libraryName:'antd-mobile',
        style:'css'
    })
)
