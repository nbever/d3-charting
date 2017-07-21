module.exports = {
  extends: 'airbnb',
  rules:{
     "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  globals: {
    window: true,
    document: true,
    ENVIRONMENT: true,
    _: true,
    $: true,
    Backbone: true,
    mixpanel: true,
    ga: true,
    dataLayer: true,
    localStorage: true,
    sessionStorage: true,
    describe: true,
    it: true,
    expect:true
  },
  parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};
