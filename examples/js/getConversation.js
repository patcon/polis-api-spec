var Swagger = require('swagger-client');

const POLIS_API_KEY = process.env.POLIS_API_KEY;
const CONVO_ID = process.argv[2]

if (!POLIS_API_KEY) {
  throw 'ApiKeyMissingError';
};

new Swagger({
  url: 'https://patcon.github.io/polis-api-spec/swagger.json',
  usePromise: true,
  authorizations: {
    api_key: new Swagger.ApiKeyAuthorization('Authorization', POLIS_API_KEY, 'header'),
  },
})
.then(function(client) {
  client.Conversations.getConversation({conversation_id: CONVO_ID})
    .then(function(conversation) {
      console.log(conversation.obj);
    })
    .catch(function(error) {
      console.log('Oops!  failed with message: ' + error.statusText);
    });
});
