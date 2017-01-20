# Bookmarks
*A light web application to manage web bookmarks*
 
This application is divided in two parts: a REST API written with Symfony (folder *server*) and a front-end written with AngularJS (folder *client*).

[![SensioLabsInsight](https://insight.sensiolabs.com/projects/283568a0-5403-464b-85fc-e34c45e746ba/big.png)](https://insight.sensiolabs.com/projects/283568a0-5403-464b-85fc-e34c45e746ba)

## Installation

Clone this repository: 
```shell
git clone https://github.com/philippemilink/bookmarks.git
```

Go to project folder: 
```shell
cd bookmarks
```

### Server

Go to server folder: 
```shell
cd server
```

Edit settings in *app/config/parameters.yml*. Your database must already be created.
```shell
cp app/config/parameters.yml.dist app/config/parameters.yml
```

Install [Composer](https://getcomposer.org/).

```shell
php composer.phar install
php bin/console doctrine:schema:update --force
```

Create a user:
```shell
php bin/console fos:user:create
```


Create a client: execute this query in your database: 
```sql
INSERT INTO `oauth2_clients` VALUES (NULL, SUBSTRING(MD5(RAND()) FROM 1 FOR 50), 'a:0:{}', SUBSTRING(MD5(RAND()) FROM 1 FOR 50), 'a:1:{i:0;s:8:"password";}');
```
Remember the *id*, *random_id* and *secret* values of the created client. You will need these datas for the next step.

Clean the cache: 
```shell
php bin/console cache:clear --env=prod
```

Give all rights to some folders:
```shell
chmod -R 777 var/cache
chmod -R 777 var/logs
chmod -R 777 var/session
```


### Client

Go to client folder: 
```shell
cd ../client
```

Install assets with [Bower](https://bower.io/): 
```shell
bower install
npm install
```

Set parameters in the *js/parameters.js* file:
```shell
cp js/parameters.js.dist js/parameters.js
```
```js
var ROOT_URL = "http://domain.tld/server/web/app.php/api/";
var CLIENT_ID = "id_random_id";
var CLIENT_SECRET = "secret";
```

**The *CLIENT_ID* value must be the concatenation of the *id* of the client, an underscore and the *random_id*.**


Uglify assets:
```shell
grunt
```

You can now go to [http://domain.tld/bookmarks/client/](http://domain.tld/bookmarks/client/) to use this application.
