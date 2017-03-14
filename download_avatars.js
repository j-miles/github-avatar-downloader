var request = require('request');
var fs = require('fs');
var link = 'https://api.github.com/repos/jquery/jquery/contributors';
var GITHUB_USER = 'j-miles';
var GITHUB_TOKEN = '332851383fea7493037f0bcc27581247ef63230fe';
var options = {
 url: link,
 headers: {
   'User-Agent': 'j-miles'
 }
};


function getRepoContributors(repoOwner, repoName, cb) {
 var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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
     console.log(response.headers);
   })
   .pipe(fs.createWriteStream(filePath));
 }


getRepoContributors("jquery", "jquery", function(err, response) {
 for(var i in response){
  downloadImageByURL(response[i]['avatar_url'], 'avatars/'+response[i]['login']+'.jpg');
 }
});