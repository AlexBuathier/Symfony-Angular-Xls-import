<?php

namespace App\DataFixtures;

use App\Entity\Country;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CountryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $names = ["France", "Germany", "Spain", "Italy", "United Kingdom", "United States"];
        for ($i = 0; $i < count($names); $i++) {
            $country = new Country();
            $country->setName($names[$i]);
            $manager->persist($country);
        }
        $manager->flush();
    }
}
