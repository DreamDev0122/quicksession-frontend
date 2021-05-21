const withPlugins = require('next-compose-plugins');
const sass = require("@zeit/next-sass")
const css = require("@zeit/next-css")

const nextConfig = {
  webpack: function (config) {
  config.module.rules.push({
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    use: {
    loader: 'url-loader',
      options: {
        limit: 100000,
        name: '[name].[ext]'
      }
    }
  })
  return config;
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    NOTIFICATION_ID: process.env.NOTIFICATION_ID,
    AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
    AWS_USER_CLIENT_ID: process.env.AWS_USER_CLIENT_ID,
    AWS_IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
  },
}

module.exports = withPlugins([
  [css],
  [sass, {
     cssModules: true
   }]
], nextConfig);
