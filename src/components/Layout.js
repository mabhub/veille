import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render () {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(3 / 2)} ${rhythm(3 / 4)}`,
        }}
      >
        {
          (location.pathname === rootPath)
            ? (
              <h1 style={{ ...scale(1.5) }}>
                <Link style={{ color: 'inherit' }} to="/">{title}</Link>
              </h1>
            )
            : (
              <h3 style={{ marginBottom: rhythm(-1 / 4) }}>
                <Link to="/">{title}</Link>
              </h3>
            )
        }
        {children}
      </div>
    );
  }
}

export default Layout;
