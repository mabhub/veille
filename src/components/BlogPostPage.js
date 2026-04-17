import React from 'react';
import { graphql, Link } from 'gatsby';
import { rhythm, scale } from '../utils/typography';
import Layout from './Layout';
import githubIcon from '../assets/github.svg';

const DIRECTIONS = {
  prev: {
    rel:     'prev',
    label:   'Précédent',
    aria:    'Article précédent',
    arrow:   '←',
    liAlign: 'left',
  },
  next: {
    rel:     'next',
    label:   'Suivant',
    aria:    'Article suivant',
    arrow:   '→',
    liAlign: 'right',
  },
};

const styles = {
  date: {
    ...scale(-1 / 5),
    display:      'block',
    marginBottom: rhythm(1),
    marginTop:    rhythm(-1),
  },
  navList: {
    display:        'flex',
    flexWrap:       'wrap',
    justifyContent: 'space-between',
    listStyle:      'none',
    padding:        0,
    marginLeft:     0,
  },
  navLink: {
    display:        'inline-flex',
    alignItems:     'center',
    textDecoration: 'none',
  },
  navLabel: {
    fontSize: '0.8rem',
    opacity:  0.7,
  },
  sourceAside: {
    textAlign: 'center',
    opacity:   0.5,
    marginTop: rhythm(2),
  },
  sourceLink: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            rhythm(1 / 4),
    textDecoration: 'none',
    color:          'inherit',
  },
};

const AdjacentPostLink = ({ direction, post }) => {
  const { rel, label, aria, arrow, liAlign } = DIRECTIONS[direction];

  return (
    <li style={{ flex: '1 1 auto', textAlign: liAlign }}>
      {post && (
        <Link
          to={post.fields.slug}
          rel={rel}
          style={styles.navLink}
          aria-label={`${aria}: ${post.frontmatter.title}`}
        >
          {direction === 'prev' && (
            <span style={{ marginRight: rhythm(1 / 4) }}>{arrow}</span>
          )}
          <div>
            <div style={styles.navLabel}>{label}</div>
            <div>{post.frontmatter.title}</div>
          </div>
          {direction === 'next' && (
            <span style={{ marginLeft: rhythm(1 / 4) }}>{arrow}</span>
          )}
        </Link>
      )}
    </li>
  );
};

const BlogPostPage = ({
  location,
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle, repoUrl } } },
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
    <h1>{post.frontmatter.title}</h1>

    <p style={styles.date}>{post.frontmatter.date}</p>

    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: post.html }} />

    <nav aria-label="Navigation entre les articles">
      <hr style={{ marginBottom: rhythm(1) }} />

      <ul style={styles.navList}>
        <AdjacentPostLink direction="prev" post={previous} />
        <AdjacentPostLink direction="next" post={next} />
      </ul>
    </nav>

    <aside style={styles.sourceAside}>
      <a
        href={`${repoUrl}/blob/master/src/pages/${post.parent.base}`}
        style={styles.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Voir la source de cet article sur GitHub"
      >
        <img src={githubIcon} alt="" width="16" height="16" style={{ margin: 0 }} />
      </a>
    </aside>
  </Layout>
);

export default BlogPostPage;

export const Head = ({
  data: { markdownRemark: post, site: { siteMetadata: { title: siteTitle } } },
}) => (
  <>
    <html lang="fr" />
    <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
    <meta name="description" content={post.excerpt} />
  </>
);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata { title repoUrl }
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
