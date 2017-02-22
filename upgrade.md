## From commit [*Add indications to upgrade*](https://github.com/philippemilink/bookmarks/commit/c4d936f707badc1193ee87aa454df4510747616a) to this commit *Html decode for bookmarks title*'

Run `grunt` in *client* folder. Maybe you will need to clean the cache of your web browser to see modifications.

## From commit [*Change FontAwesome adress in Bower file*](https://github.com/philippemilink/bookmarks/commit/0c5487314df90bc9f42bdb926a2aabd47883e386) to commit [*Add indications to upgrade*](https://github.com/philippemilink/bookmarks/commit/c4d936f707badc1193ee87aa454df4510747616a)


1. Save your `server/app/config/parameters.yml` file and delete it.
2. `git pull`
3. `php server/composer.phar install`
4. `php server/bin/console doctrine:migrations:migrate` (this step can take a while)
5. Maybe you will need to clean the cache of your web browser to see modifications