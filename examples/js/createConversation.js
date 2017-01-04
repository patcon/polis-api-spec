var Swagger = require('swagger-client');

const POLIS_API_KEY = process.env.POLIS_API_KEY;

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
  var newConversation = {
    topic: 'This is a new polis convo',
    description: 'Some bit of **markdown**! _Italics!_',
  };
  client.Conversations.createConversation(newConversation)
    .then(function(conversation) {
      console.log(conversation.obj);
    })
    .catch(function(error) {
      console.log('Oops!  failed with message: ' + error.statusText);
    });
});
