greenfield-trainRecc
---------------------



**Authors:** Yuriy Lemberg, Andrew Tran, Gabe Mitrakos

**Description:**

Music recommendation app

**Technologies Used:**

- Angular 2 (Angular CLI)
- Express
- mySql
- Node

### How to start the app:

 
 ```javascript
 npm install -g angular-cli
```
 ```javascript
 npm install -g nodemon
```
For access to angular command line interface

Reference: https://github.com/angular/angular-cli

```javascript
 npm install
```

```javascript
 npm start
```

* Application is using compose for db storage (need to create account and replace 

```javascript
module.exports.sequelize = new Sequelize('mysql://admin:BBNDHLISQBDHSULK@aws-us-west-2-portal.1.dblayer.com:15686/compose');
```

in /db/index.js with you own url)
* Amazon s3 for mp3 storage (need to replace
```javascript
module.exports.accessKeyId = 'AKIAJZAMYQGMKVPURTYQ';
module.exports.secretAccessKey = '6HM2ksmA+o+Kk66U9oyOqtZqsN/rAkL9sWMrs35h';
```
with you own keys from AWS
* To create your own keys 
1) Go to https://console.aws.amazon.com/console/home?region=us-east-1#
2) Sslect your name in the top right and click "My Security Credentials"
3) Click "Continue to security credentials"
4) Select "Access Keys (Access Key ID and Secret Access Key)"
5) Click "Create Access Key"
6) Click "Show Access Key"
7) Copy paste the provided keys into your code

