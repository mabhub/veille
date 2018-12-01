const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const getSiblings = (posts, index) => ({
  previous: index === posts.length - 1 ? null : posts[index + 1].node,
  next:     index === 0 ? null : posts[index - 1].node,
});

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const graphQuery = graphql(`
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

    resolve(graphQuery.then(({ errors, data: { allMarkdownRemark } }) => {
      if (errors) {
        // eslint-disable-next-line no-console
        console.log(errors);
        reject(errors);
      }

      // Create blog posts pages.
      const { edges } = allMarkdownRemark;
      edges.forEach(({ node: { fields: { slug } } }, index, posts) =>
        createPage({
          path: slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: { slug, ...getSiblings(posts, index) },
        }));
    }));
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    });
  }
};
