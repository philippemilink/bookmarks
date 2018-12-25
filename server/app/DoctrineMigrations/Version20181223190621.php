<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181223190621 extends AbstractMigration implements ContainerAwareInterface
{
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('ALTER TABLE bookmark CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');

        /** @var \AppBundle\Service\TitlePageGetter $titlePageGetter */
        $titlePageGetter = $this->container->get('title_page_getter');

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
                ->setParameter('id', $bookmark['id'])
                ->setParameter('title', $titlePageGetter->getTitle($bookmark['link']));

            $queryBuilder->execute();
        }
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
