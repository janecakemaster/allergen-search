const fs = require('fs')
const listFile = process.argv[2]
const sourceFile = process.argv[3]
const strip = new RegExp(/[^0-9a-z]/, 'gi')

fs.readFile(listFile, 'utf8', (err, data) => {
  if (err) throw err

  const allergens = data
    .split('\n')
    .filter(el => el.length > 0)

  searchIngredients(allergens)
})

function searchIngredients(list) {
  const normalizedList = list
    .map(el => normalizeText(el))

  fs.readFile (sourceFile, 'utf8', (err, data) => {
    const text = normalizeText(data)
    const results = []
    const found = normalizedList.filter((el, i) => {

      if (text.includes(el)) {
        results.push(list[i])
        return true
      }
      return false
    })

    renderResults(results)
  })
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(strip, '')
}

function renderResults(results) {
  console.log(results)
}
