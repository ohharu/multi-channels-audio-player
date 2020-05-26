const express = require('express');
const path = require('path');
const auth = require('./auth.js');
const request = require('request');

var exec = require('child_process').exec;
var cmd = 'cd /home/koyama_yuki_sa/dev/dev-deploy/multi-5g/ && git pull github develop';
var cmd2 = 'curl -X POST --data-urlencode "payload={\"channel\": \"#2_audio-dev\", \"username\": \"GCP-server.js\", \"text\": \"Auto deploy complete!\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/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';

const app = express();
const app2 = express();

app.use(auth);
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  const filePath = path.resolve('./public/index.html');
  res.sendFile(filePath, {}, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', filePath);
    }
  });
});

app2.post('/',function (req, res, next) {
    console.log('!!! 3001 API\n');
    return exec(cmd, {timeout:10000},
	function(error, stdout, stderr) {
            console.log('stdout: '+(stdout||'none'));
            console.log('stderr: '+(stderr||'none'));
            if(error !== null) {
                console.log('exec error: '+error);
            }
	    else {
		request.post({
		    uri: 'https://hooks.slack.com/services/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',
		    headers: { 'Content-Type': 'application/json' },
		    json: {
			username: 'GCPdev1',
			icon_emoji: ':ghost:',
			text: 'dev1AutoDeployComplete'
		    }
		}, function(error, response, body){
		    if (!error && response.statusCode === 200) {
			console.log(body);
		    } else {
			console.log('error');
		    }
		});		
	    }
        }
	       );
});

app.listen(3000, () => console.log('server listening on port 3000!'));
app2.listen(3001, () => console.log('API server listening on port 3001!'));
