# Dexma bot

This bot is built with [Botonic](https://botonic.io), an open-source framework by [Hubtype](https://hubtype.com) which is based on [React](https://reactjs.org/).

This bot fulfills the following needs (features):
1.  Login
2.  Check Device
3.  Contract Expiration
4.  Sensor Data
5.  League Tables
6.  Inefficiencies
7.  Recommendations

You'll find each of these in its  own folder inside `src/actions`
You can find detailed information regarding each functionality (Conversation flow, API calls, etc) in [this document](https://docs.google.com/document/d/1D47nDTKA3KUeQkYunF7iGnFyLwPYDLFPWJTmZ2btmlo/edit#).

In order to test the bot locally or deploy changes, you'll need to install the botonic CLI globally and install the project dependencies:
```
$> npm install -g @botonic/cli
$> npm install
```
Now you can test it in the console with:
```
$> botonic run
```
and deploy to your Hubtype account with:
```
$> botonic deploy
```
In order to further modify the bot or fix possible bugs, please, refer to the documentation or ask our community:
* [Botonic Documentation](https://docs.botonic.io/)
* [Botonic Slack Community](https://slack.botonic.io/)

## Additional channels

Botonic works across different messaging channels without the need to change your code. However, this bot was specifically optimised for Facebook Messenger. For example, the login feature takes advantage of [referral params](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals/), that don't exist in other platforms. Also, interactive elements like [carousels](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic/#carousel) are not supported in many messaging apps like Telegram or Whatsapp.
This means that using this bot with other channels will require additional development.
