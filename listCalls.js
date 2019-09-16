const persephonySDK = require('@persephony/sdk')
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.accountId
const authToken = process.env.authToken
const persephony = persephonySDK(accountId, authToken)

getCallsList().then(calls => {
  // Use the calls
}).catch(err => {
  // Catch Errors
})

async function getCallsList() {
  // Create array to store all calls
  const calls = []
  // Invoke GET method to retrieve initial list of call information
  const first = await persephony.api.calls.getList()
  calls.push(...first.calls)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire call list 
  while (nextPageUri) {
    const nextPage = await persephony.api.calls.getNextPage(nextPageUri)
    calls.push(...nextPage.calls)
    nextPageUri = nextPage.nextPageUri
  }
  return calls
}
