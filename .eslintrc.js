const off   = 'off';
const warn  = 'warn';
const error = 'error';

module.exports = {
  extends: 'makina',
  globals: {
    'graphql': false,
    '__PATH_PREFIX__': true,
  },
  rules: {
    'react/prefer-stateless-function': [off],
    'import/extensions': [warn, 'ignorePackages'],
  }
};
