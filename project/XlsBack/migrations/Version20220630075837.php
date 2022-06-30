<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220630075837 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE music_trend (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE music_group ADD music_trend_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE music_group ADD CONSTRAINT FK_A493F0DA2A3F694 FOREIGN KEY (music_trend_id) REFERENCES music_trend (id)');
        $this->addSql('CREATE INDEX IDX_A493F0DA2A3F694 ON music_group (music_trend_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE music_group DROP FOREIGN KEY FK_A493F0DA2A3F694');
        $this->addSql('DROP TABLE music_trend');
        $this->addSql('DROP INDEX IDX_A493F0DA2A3F694 ON music_group');
        $this->addSql('ALTER TABLE music_group DROP music_trend_id');
    }
}
