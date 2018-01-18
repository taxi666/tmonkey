// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../oms4/index.html'),
    assetsRoot: path.resolve(__dirname, '../../oms4'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8082,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
            '/tmonkeyApi/':{
            // target: 'http://163.53.88.41', //联调时后端接口IP
            // target: 'http://163.53.88.83', //联调时后端接口IP
            // target: 'http://127.0.0.1', //联调时后端接口IP
            // target: 'http://192.168.101.24:8080/', //联调时后端接口IP
            // target: 'http://192.168.101.48:8080/', //联调时后端接口IP
            target: 'http://172.20.10.3:8080/',
            changeOrigin: true,
            pathRewrite: {                //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
               '^/tmonkeyApi': ''
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false


  }
}
