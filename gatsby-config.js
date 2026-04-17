const siteMetadata = {
  title: 'Notes',
  description: 'Un site avec des choses écrites',
  siteUrl: 'https://notes.dediboite.fr',
};

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://matomo.dediboite.fr',
        siteUrl: 'https://notes.dediboite.fr/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: ['**/.*'],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              quality: 90,
              withWebp: true,
              withAvif: true,
              loading: 'lazy',
              linkImagesToOriginal: false,
              showCaptions: true,
              markdownCaptions: true,
              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
        },
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        orientation: 'portrait-primary',
        icon: 'src/assets/directions.svg',
        cache_busting_mode: 'query',
        include_favicon: true,
        legacy: true,
        theme_color_in_head: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://notes.dediboite.fr',
        sitemap: 'https://notes.dediboite.fr/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeStyleHashes: false,
        mergeScriptHashes: false,
        directives: {
          'default-src': "'self'",
          'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://matomo.dediboite.fr",
          'style-src': "'self' 'unsafe-inline'",
          'img-src': "'self' data: https:",
          'font-src': "'self' data:",
          'connect-src': "'self' https://matomo.dediboite.fr",
          'media-src': "'self'",
          'object-src': "'none'",
          'frame-src': "'none'",
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
