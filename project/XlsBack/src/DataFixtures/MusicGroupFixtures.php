<?php

namespace App\DataFixtures;

use App\Entity\MusicGroup;
use App\Repository\MusicTrendRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MusicGroupFixtures extends Fixture implements DependentFixtureInterface
{
    private MusicTrendRepository $musicTrendRepository;
    public function __construct(MusicTrendRepository $musicTrendRepository)
    {
        $this->musicTrendRepository = $musicTrendRepository;
    }

    public function load(ObjectManager $manager): void
    {
        $date = new \DateTimeImmutable('1980-01-01');
        for ($i = 1; $i < 6; $i++) {
            $mg = new MusicGroup();
            $mg->setStartDate($date->modify('- ' . $i . ' years'));
            $mg->setSeparationDate($date->modify($i * 2 . ' years'));
            $mg->setFounder($i . 'John Doe');
            $mg->setMembers(mt_rand(2, 6));
            $mg->setPresentation($i . 'Lorem ipsum dolor, nisl nisi consectetur nisl, euismod euismod 
                 nisi nisi euismod nisi. Donec euismod');
            $mg->setMusicTrend($this->musicTrendRepository->find(rand(1, 5)));
            $manager->persist($mg);

        }
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
          MusicTrendFixtures::class
        ];
    }
}
