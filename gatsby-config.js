module.exports = {
  siteMetadata: {
    title: 'Notes',
    author: 'Benjamin Marguin',
    description: 'Un site avec des choses écrites',
    siteUrl: 'https://notes.dediboite.fr',
  },
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
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          {
            resolve: 'gatsby-remark-twitter-cards',
            options: {
              title: 'notes.dediboite.fr',
              background: '#fafafa',
              fontColor: '#333333',
              fontFile: require.resolve('./fonts/SourceSansPro-Light.ttf'),
            },
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
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark
              .nodes.map(node => ({
                ...node.frontmatter,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Notes',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Notes - Blog technique de Benjamin Marguin',
        short_name: 'Notes',
        description: 'Un site avec des choses écrites - Blog technique et veille technologique',
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
