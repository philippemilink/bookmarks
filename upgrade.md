## From commit [*0c54873 - Change FontAwesome adress in Bower file*](https://github.com/philippemilink/bookmarks/commit/0c5487314df90bc9f42bdb926a2aabd47883e386) to this commit *Add indications to upgrade* 


1. Save your `server/app/config/parameters.yml` file and delete it.
2. `git pull`
3. `php server/composer.phar install`
4. `php server/bin/console doctrine:migrations:migrate` (this step can take a while)
5. Maybe you will need to clean the cache of your web browser to see modifications