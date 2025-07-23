import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import { rhythm } from '../utils/typography';

const Bio = () => (
  <div
    style={{
      display: 'flex',
      marginBottom: rhythm(2.5),
    }}
  >
    <StaticImage
      src="../assets/profile-pic.png"
      alt="Photo de profil de Benjamin Marguin"
      placeholder="blurred"
      format="auto"
      quality={95}
      width={48}
      height={48}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        borderRadius: '50%',
      }}
    />
    <p>
      {/* Bio content can be added here */}
    </p>
  </div>
);

export default Bio;
