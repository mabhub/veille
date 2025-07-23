import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';
import Layout from './Layout';
import githubIcon from '../assets/github.svg';

const BlogPostPage = ({
  location,
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle } } },
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
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

    <nav aria-label="Navigation entre les articles">
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
        <li style={{ flex: '1 1 auto', textAlign: 'left' }}>
          {previous && (
            <Link
              to={previous.fields.slug}
              rel="prev"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              aria-label={`Article précédent: ${previous.frontmatter.title}`}
            >
              <span style={{ marginRight: rhythm(1 / 4) }}>←</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Précédent</div>
                <div>{previous.frontmatter.title}</div>
              </div>
            </Link>
          )}
        </li>
        <li style={{ flex: '1 1 auto', textAlign: 'right' }}>
          {next && (
            <Link
              to={next.fields.slug}
              rel="next"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              aria-label={`Article suivant: ${next.frontmatter.title}`}
            >
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Suivant</div>
                <div>{next.frontmatter.title}</div>
              </div>
              <span style={{ marginLeft: rhythm(1 / 4) }}>→</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>

    <aside
      style={{ textAlign: 'center', opacity: 0.5, marginTop: rhythm(2) }}
    >
      <a
        href={`https://github.com/mabhub/veille/blob/master/src/pages/${post.parent.base}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: rhythm(1 / 4),
          textDecoration: 'none',
          color: 'inherit',
        }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Voir la source de cet article sur GitHub"
      >
        <img
          src={githubIcon}
          alt=""
          width="16"
          height="16"
          style={{ margin: 0 }}
        />
      </a>
    </aside>
  </Layout>
);

export default BlogPostPage;

export const Head = ({
  location,
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle, siteUrl } } },
}) => (
  <>
    <html lang="fr" />
    <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
    <meta name="description" content={post.excerpt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@mab_" />
    <meta name="og:type" content="article" />
    <meta name="twitter:title" content={post.frontmatter.title} />
    <meta name="og:title" content={post.frontmatter.title} />
    <meta name="twitter:image" content={`${siteUrl}${location.pathname}twitter-card.jpg`} />
    <meta name="og:image" content={`${siteUrl}${location.pathname}twitter-card.jpg`} />
  </>
);

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
