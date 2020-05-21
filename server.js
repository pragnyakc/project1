const express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var parser = require('word-text-parser');

const app = express();
var Uploads = "/Uploads";
const PORT = 8000;
app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', sampleFile = req.files.sampleFile); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
        
    res.send('File uploaded to ' + uploadPath);
  });
  //var absPath = path.join(__dirname + Uploads ,'student info.docx');
  parser( uploadPath,function(resultList){
      console.log(resultList)
      console.log(typeOf(resultList))
  })

});


app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
