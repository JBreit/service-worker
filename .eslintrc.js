module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", process.env.NODE_ENV === 'production' ? "unix" : "windows"]
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module"
  },
  "env": {
    "node": true
  }
};
