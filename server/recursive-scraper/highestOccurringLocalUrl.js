module.exports = async function highestOccurringLocalUrl (app, baseUrl) {
  let response = await app.get('db').highestOccurringLocalUrl([baseUrl, baseUrl + '%']);
  console.log("Next Page", response[0].to_page)
  return response[0].to_page
}