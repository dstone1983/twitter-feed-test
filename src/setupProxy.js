const { createProxyMiddleware } = require('http-proxy-middleware')
const {apis} = require('./backend')

module.exports = function(app) {
    Object.keys(apis).forEach(slug => {
        const target = apis[slug]
        const pathRewrite = {
            [`^${slug}`]: '',
        };

        app.use(
            slug,
            createProxyMiddleware({
                target,
                changeOrigin: true,
                pathRewrite,
                secure: false
            })
        )
    })
}