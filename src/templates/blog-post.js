import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = ({
  location,
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle } } },
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
    <Helmet
      htmlAttributes={{ lang: 'fr' }}
      meta={[{ name: 'description', content: post.excerpt }]}
      title={`${post.frontmatter.title} | ${siteTitle}`}
    />

    <h1>{post.frontmatter.title}</h1>

    <p
      style={{
        ...scale(-1 / 5),
        display: 'block',
        marginBottom: rhythm(1),
        marginTop: rhythm(-1),
      }}
    >
      {post.frontmatter.date}
    </p>

    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: post.html }} />

    <hr
      style={{
        marginBottom: rhythm(1),
      }}
    />

    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
        marginLeft: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  </Layout>
);

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
