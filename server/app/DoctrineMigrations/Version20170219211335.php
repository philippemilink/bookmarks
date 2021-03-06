<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170219211335 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bookmark ADD title LONGTEXT NOT NULL');


    }

    /**
     * @param Schema $schema
     */
    public function postUp(Schema $schema)
    {
        $queryBuilder = $this->connection->createQueryBuilder();
        $queryBuilder
            ->select('bookmark.id, bookmark.link')
            ->from('bookmark', 'bookmark');
        $bookmarks = $queryBuilder->execute();

        foreach ($bookmarks as $bookmark) {
            $queryBuilder = $this->connection->createQueryBuilder();
            $queryBuilder->update('bookmark', 'b')
                         ->set('b.title', ':title')
                         ->where('b.id=:id')
                         ->setParameter('id', $bookmark['id']);

            try {
                $page = file_get_contents($bookmark['link']);

                if ($page !== False) {
                    preg_match("/\<title.*\>(.*)\<\/title\>/isU", $page, $matches);

                    if (count($matches) < 2) {
                        $queryBuilder->setParameter('title', $bookmark['link']);
                    } else {
                        $queryBuilder->setParameter('title', $matches[1]);
                    }

                } else {
                    $queryBuilder->setParameter('title', $bookmark['link']);
                }
            } catch (\Exception $e) {
                $queryBuilder->setParameter('title', $bookmark['link']);
            }

            $queryBuilder->execute();

        }

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bookmark DROP title');
    }
}
