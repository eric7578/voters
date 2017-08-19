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
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-no-literals": [0]
  }
}
