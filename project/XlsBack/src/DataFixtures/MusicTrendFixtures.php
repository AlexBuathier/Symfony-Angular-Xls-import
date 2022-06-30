<?php

namespace App\DataFixtures;

use App\Entity\MusicTrend;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MusicTrendFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $trends = [
            'Pop rock',
            'Rock',
            'Grunge',
            'Trip hop',
            'Other',
        ];

        for ($i = 0; $i < 5; $i++) {
            $mt = new MusicTrend();
            $mt->setName($trends[$i]);
            $manager->persist($mt);

        }
        $manager->flush();
    }
}
