const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['bubble-stars.fra1.digitaloceanspaces.com', 'bubble-stars.fra1.cdn.digitaloceanspaces.com']
  },
  i18n
}
