import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <h3 style={{ marginBottom: rhythm(1 / 4) }}>
              <Link to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <a rel="me" href="https://mastodon.xyz/@mab" style={{ visibility: 'hidden' }}>&nbsp;</a>
    </Layout>
  );
};

export default BlogIndex;

export const Head = ({ data }) => (
  <>
    <html lang="fr" />
    <title>{data.site.siteMetadata.title}</title>
    <meta name="description" content={data.site.siteMetadata.description} />
  </>
);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY", locale: "fr")
            title
          }
        }
      }
    }
  }
`;
