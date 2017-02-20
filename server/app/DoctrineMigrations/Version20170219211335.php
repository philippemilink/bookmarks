<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170219211335 extends AbstractMigration implements ContainerAwareInterface
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
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bookmark ADD title LONGTEXT NOT NULL');


    }

    /**
     * @param Schema $schema
     */
    public function postUp(Schema $schema)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine.orm.entity_manager');

        $queryBuilder = $this->connection->createQueryBuilder();
        $queryBuilder
            ->select('bookmark.id, bookmark.link')
            ->from('bookmark', 'bookmark');
        $bookmarks = $queryBuilder->execute();

        foreach ($bookmarks as $bookmark) {
            $queryBuilder = $this->connection->createQueryBuilder();
            $queryBuilder->update('Bookmark', 'b')
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
