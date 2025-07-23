import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

const rootPath = `${__PATH_PREFIX__}/`;

const Layout = ({ location, title, children }) => (
  <div
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: rhythm(24),
      padding: `${rhythm(3 / 2)} ${rhythm(3 / 4)}`,
    }}
  >
    <header>
      {(location.pathname === rootPath) && (
        <h1 style={{ ...scale(1.5) }}>
          <Link
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
            to="/"
            aria-label={`Accueil - ${title}`}
          >
            {title}
          </Link>
        </h1>
      )}

      {(location.pathname !== rootPath) && (
        <h3 style={{ marginBottom: rhythm(-1 / 4) }}>
          <Link
            to="/"
            aria-label="Retour à l'accueil"
          >
            {title}
          </Link>
        </h3>
      )}
    </header>

    <main role="main">
      {children}
    </main>
  </div>
);

export default Layout;
