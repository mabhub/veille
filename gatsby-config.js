module.exports = {
  siteMetadata: {
    title: 'Veille techno',
    author: 'Benjamin Marguin',
    description: 'Un blog de veille technologique',
    siteUrl: 'https://veille.dediboite.fr/',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '3',
        matomoUrl: 'https://piwik.dediboite.fr',
        siteUrl: 'https://veille.dediboite.fr/',
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
            options: { maxWidth: 590 },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Veille techno',
        short_name: 'Veille',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/directions.svg',
      },
    },
    // 'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
