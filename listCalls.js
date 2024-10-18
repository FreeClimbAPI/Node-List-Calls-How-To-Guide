require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')
// your freeclimb API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

getCallsList().then(calls => {
  console.log('got calls', calls)
}).catch(err => {
  console.log(err)
})

async function getCallsList() {
  const calls = []

  let response = await freeclimb.listCalls()
  calls.push(...response.calls)

  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    calls.push(...response.calls)
  }
  return calls
}
