const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const getSiblings = (posts, index) => ({
  previous: index === posts.length - 1 ? null : posts[index + 1].node,
  next:     index === 0 ? null : posts[index - 1].node,
});

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allMarkdownRemark: { edges = [] } = {},
    },
  } = await graphql(`
    {
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___date],
          order: DESC
        },
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  // Create blog posts pages.
  edges.forEach(({ node: { fields: { slug } } }, index, posts) =>
    createPage({
      path: slug,
      component: path.resolve('./src/components/BlogPostPage.js'),
      context: { slug, ...getSiblings(posts, index) },
    }));
};

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    });
  }
};
