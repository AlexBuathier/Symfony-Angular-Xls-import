<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220701075213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE music_group ADD country_id INT DEFAULT NULL, ADD city_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE music_group ADD CONSTRAINT FK_A493F0DF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE music_group ADD CONSTRAINT FK_A493F0D8BAC62AF FOREIGN KEY (city_id) REFERENCES city (id)');
        $this->addSql('CREATE INDEX IDX_A493F0DF92F3E70 ON music_group (country_id)');
        $this->addSql('CREATE INDEX IDX_A493F0D8BAC62AF ON music_group (city_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE music_group DROP FOREIGN KEY FK_A493F0DF92F3E70');
        $this->addSql('ALTER TABLE music_group DROP FOREIGN KEY FK_A493F0D8BAC62AF');
        $this->addSql('DROP INDEX IDX_A493F0DF92F3E70 ON music_group');
        $this->addSql('DROP INDEX IDX_A493F0D8BAC62AF ON music_group');
        $this->addSql('ALTER TABLE music_group DROP country_id, DROP city_id');
    }
}
