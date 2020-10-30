const { App } = require("@slack/bolt");
require('dotenv').config();

const app = new App({
    signingSecret: process.env.SLACK_SECRET,
    token: process.env.SLACK_TOKEN,
  });

const bookOwners = ['Kate', 'Jimmy', 'Meredith', 'Alan', 'Rick', 'Morty', 'Elvis', 'John']

const ownerFields = bookOwners.map(name => {
    return {
        type: "mrkdwn",
        text: name
    }
})

const block = [
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: "Effective Java: Third Edition"
        },
        type: "section",
        fields: ownerFields
    }
];

readChannels();

(async () => {
    // Start the app
    await app.start(process.env.PORT || 3000);
  
    console.log('⚡️ Bolt app is running!');
  })();

  async function readChannels() {
      const result = await app.client.conversations.list({
          token: process.env.SLACK_TOKEN
      });
      console.log(result);
  }

  publishMessage('C01DDV48XQE', "hello from you")

  async function publishMessage(id, text) {
      try {
          const result = await app.client.chat.postMessage({
              token: process.env.SLACK_TOKEN,
              channel: id,
              text: text,
              blocks: block
          })
      } catch (error) {
          console.log(error);
      }
  }

  