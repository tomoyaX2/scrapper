const merge = require('webpack-merge').default;
const { apiUrl } = process.env;
// const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  trailingSlash: true,

  publicRuntimeConfig: {
    apiUrl
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.xmanga.org',
        pathname: '/images/**'
      }
    ]
  },
  // i18n,

  webpack: (config, { isServer }) => {
    [
      (
        config.module.rules.find(
          m => m.oneOf && m.oneOf.find(({ test: reg }) => reg.test('file.css'))
        ) || {}
      ).oneOf
    ]
      .filter(Boolean)
      .forEach(styleRules => {
        [
          styleRules.find(
            ({ test: reg, use }) =>
              reg.test('file.module.css') && use.loader !== 'error-loader'
          ),
          styleRules.find(
            ({ test: reg, use }) =>
              reg.test('file.module.scss') && use.loader !== 'error-loader'
          )
        ]
          .filter(Boolean)

          .forEach(cmr => {
            // Find the item inside the 'use' list that defines css-loader
            const cssLoaderConfig = cmr.use.find(({ loader }) =>
              loader.includes('css-loader')
            );

            if (!(cssLoaderConfig && cssLoaderConfig.options)) return;

            cssLoaderConfig.options.modules.exportLocalsConvention =
              'camelCase';
          });
      });

    if (!isServer) {
    }

    return merge(config, {
      resolve: {
        fallback: {
          ...(isServer ? {} : { fs: false })
        },

        alias: {
          '@styles': '/src/shared/styles'
        }
      }
    });
  }
};
