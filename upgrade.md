## How to upgrade
1. `git pull`
2. `php server/composer.phar install`
3. `php server/bin/console doctrine:migrations:migrate` (this step can take a while)
4. `grunt` in *client* folder
5. Maybe you will need to clean the cache of your web browser to see modifications


