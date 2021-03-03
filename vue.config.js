const path = require('path')
const px2rem = require('postcss-px2rem')
module.exports = {
  //只能写vue封装的配置
  // runtimeCompiler: true, //使用包含编译器的vue包
  lintOnSave: false, // 关闭EsLint的规则
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          // 配置postcss-px2rem 
          px2rem({
            remUnit: 37.5   // 设计稿等分后的rem值   375/10
          })
        ]
      }
    }
  },

  configureWebpack: {  //内部写webpack原生配置,此对象是vue脚手架定义的专门用来写原生webpack配置的
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: { // 路径别名(简写方式)
        // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配 from vue = from vue/dist/vue.esm.js  带vue编译器
        '@': path.resolve(__dirname, 'src') //以@表示当前项目的src目录
      }
    },
  },

  devServer: {
    proxy: {
      //配置代理服务器
      //解决跨越
      //处理以api开头路径的请求
      // "/api" : http://localhost:4000  http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000',  //转发目标地址
        pathRewrite: {
          '^/api': '' //转发请求时去除路径前面的/api
        },
        changeOrigin: true   //支持跨域，如果协议/主机也不相同，必须加上
      },
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
