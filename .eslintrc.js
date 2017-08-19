module.exports = {
  "extends": [
    "standard",
    "plugin:react/all"
  ],
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "pragma": "React"
    }
  },
  "rules": {
    "react/jsx-indent-props": [0],
    "react/jsx-indent": [0],
    "react/jsx-max-props-per-line": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-no-literals": [0]
  }
}
