## How to upgrade
1. `git pull`
2. in *server* folder: `php composer.phar selfupdate` and then `php composer.phar install`
3. in *server* folder: `php bin/console doctrine:migrations:migrate` (this step can take a while)
4. check that your *client/js/parameters.js* is well configurated with variables in *client/js/parameters.js.dist*
5. `grunt` in *client* folder
6. Maybe you will need to clean the cache of your web browser to see modifications


