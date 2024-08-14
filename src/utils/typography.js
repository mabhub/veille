import Typography from 'typography';
import themeMoraga from 'typography-theme-moraga';

import '@fontsource/source-sans-pro/200.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/400-italic.css';
import '@fontsource/source-sans-pro/700.css';

themeMoraga.overrideThemeStyles = () => ({
  'strong > a': {
    fontWeight: 700,
  },
});

themeMoraga.googleFonts = [];

const typography = new Typography(themeMoraga);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;

export const { rhythm } = typography;
export const { scale } = typography;
