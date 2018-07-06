module.exports = function mostOccurringUrl (dictionary, category) {

    const workingDictionary = dictionary[category]

    if(!workingDictionary) {
      console.log('Error in highestOcurringUrl, category does not exist')
      return
    }

  const highestValue = Math.max(...(Object.values(test.local)))
  return Object.keys(object).find(key => object[key] === highestValue);
  
}