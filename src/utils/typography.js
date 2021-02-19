import Typography from 'typography';
import Theme from 'typography-theme-moraga';

Theme.overrideThemeStyles = () => ({
  'strong > a': {
    fontWeight: 700,
  },
});

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;

export const { rhythm } = typography;
export const { scale } = typography;
