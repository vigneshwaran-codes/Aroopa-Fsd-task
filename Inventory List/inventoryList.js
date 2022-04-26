// inventoryList

function inventoryList () {
  const list = []
  
  //  adding name
  function add (name) {
    if (list.indexOf(name) === -1) {
      list.push(name)
    }
  }

  // removing name
  function remove (name) {
    const i = list.indexOf(name)
    if (i !== -1) {
      list.splice(i, 1)
    }
  }

  // getList
  function getList () {
    return list
  }

  return { add, remove, getList }
}

const cart = inventoryList()

// added name to list
cart.add('Shirt')
cart.add('Trouser')

// calling getList
const output = cart.getList()
console.log(output)

// removing name from list
cart.remove('Shirt')

console.log(output)
