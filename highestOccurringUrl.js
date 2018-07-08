module.exports = async function highestOccurringUrl (app, baseUrl) {
  let response = await app.get('db').highestOccurringUrl([baseUrl, baseUrl + '%']);
  console.log("Next Page", response[0].to_page)
  return response[0].to_page
}