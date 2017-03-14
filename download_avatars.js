var request = require('request');
var fs = require('fs');
var GITHUB_USER = 'j-miles';
var GITHUB_TOKEN = '553dbb9b1de65e47a0b9ec7e535fee95392a862e';
var repoOwner = process.argv[2];
var repoName = process.argv[3];
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
var options = {
 url: requestURL,
 headers: {
   'User-Agent': 'j-miles'
 }
};


function getRepoContributors(cb) {
 request(options, function(error, response, body) {
   if(error) {
     console.log('Error: ' + error);
     throw error;
   }
   if(response.statusCode === 200){
     console.log('OK');
   }
   if(body){
     var parsed = JSON.parse(body);
     cb(null, parsed);
   }
 })
}



function downloadImageByURL(url, filePath) {
  request.get(url)
   .on('error', function(error){
     console.log('Error!');
     throw error;
   })
   .on('response', function(response){
     //console.log(response.headers);
   })
   .pipe(fs.createWriteStream(filePath));
 }


getRepoContributors(function(err, response) {
 for(var i in response){
  downloadImageByURL(response[i]['avatar_url'], 'avatars/'+response[i]['login']+'.jpg');
 }
});