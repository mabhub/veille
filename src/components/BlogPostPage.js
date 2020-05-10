import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from './Layout';
import { rhythm, scale } from '../utils/typography';

const BlogPostPage = ({
  location,
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle, siteUrl } } },
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
    <Helmet
      htmlAttributes={{ lang: 'fr' }}
      meta={[
        { name: 'description', content: post.excerpt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@mab_' },

        { name: 'og:type', content: 'article' },

        { name: 'twitter:title', content: post.frontmatter.title },
        { name: 'og:title', content: post.frontmatter.title },

        { name: 'twitter:image', content: `${siteUrl}${location.pathname}twitter-card.jpg` },
        { name: 'og:image', content: `${siteUrl}${location.pathname}twitter-card.jpg` },
      ]}
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

    <aside
      style={{ textAlign: 'center', opacity: 0.5 }}
    >
      <a
        href={`https://github.com/mabhub/veille/blob/master/src/pages/${post.parent.base}`}
        style={{ display: 'inline-block' }}
      >
        <img
          src="/github.svg"
          alt="Voir la source sur Github"
          style={{ width: '1em', margin: 0, display: 'block' }}
        />
      </a>
    </aside>
  </Layout>
);

export default BlogPostPage;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata { title siteUrl }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
      }

      parent {
        ... on File {
          base
        }
      }
    }
  }
`;
