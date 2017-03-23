<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170323093349 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('UPDATE oauth2_clients SET allowed_grant_types = \'a:2:{i:0;s:8:"password";i:1;s:13:"refresh_token";}"\'');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->addSql('UPDATE oauth2_clients SET allowed_grant_types = \'a:1:{i:0;s:8:"password";}\'');

    }
}
