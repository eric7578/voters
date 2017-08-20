let storage = []

exports.get = function () {
  return storage.slice()
}

exports.set = function (newStorage) {
  storage = newStorage.slice()

  if (process.env.NODE_ENV === 'development') {
    console.log(`Storage updated.`)
    storage.forEach((post, index) => console.log(`${index + 1} ${JSON.stringify(post)}`))
    console.log()
  }
}
