const express = require('express');
const awsRouter = require('express').Router();
const fs = require('fs');
const S3FS = require('s3fs');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();
const s3fsImpl = new S3FS('mpthrees', {
  accessKeyId: 'AKIAIWDLUSLK2V5PWL4Q',
  secretAccessKey: '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'
});

s3fsImpl.create();

router.use(multipartyMiddleware);
router.post('/testupload', (req, res) => {
  var file = req.files.file;
  var stream = fs.createReadStream(file.path);

  return s3fsImpl.writeFile(file.originalFileName, stream)
    .then(() => {
      fs.unlink(file.path, err => {
        if(err) {
          console.log('err', err);
        }
      });
      res.redirect('/profile');
    });
});