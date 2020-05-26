const auth = require('basic-auth');
const request2 = require('request');

const admins = {
    'adminmin': { password: 'tantanwebtantan' },
    'testUser': { password: 'fireThemAll'},
};

module.exports = function (request, response, next) {
  var user = auth(request);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send();
  } else {
/*
      request2.post({
	uri: 'https://hooks.slack.com/services/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',
	headers: { 'Content-Type': 'application/json' },
	json: {
	    username: 'GCPdev1',
	    icon_emoji: ':ghost:',
	    text: 'basic-auth-login:' + user.name
	}
    }, function(error, response, body){
	if (!error && response.statusCode === 200) {
	    console.log(body);
	} else {
	    console.log('error');
	}
    });
*/
      return next();
  }
};
