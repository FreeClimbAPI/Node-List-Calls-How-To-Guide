require('dotenv').config()
const fs = require('fs')
const { createConfiguration, DefaultApi } = require('@freeclimb/sdk')
// your freeclimb API key (available in the Dashboard) - be sure to set up environment variables to store these values
const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY

const freeclimb = new DefaultApi(createConfiguration({
  accountId: accountId,
  apiKey: apiKey,
}))

getCallsList().then(calls => {
  // Use the calls
}).catch(err => {
  // Catch Errors
})

async function getCallsList() {
  const calls = await freeclimb.listCalls()
  /**
   * At the time of this writing - pagination has not been implemented. A future update will make this more clear
   */
  return calls
}
