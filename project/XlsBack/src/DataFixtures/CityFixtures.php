<?php

namespace App\DataFixtures;

use App\Entity\City;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CityFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $names = ["Paris", "Berlin", "Madrid", "Rome", "London", "New York"];
        for ($i = 0; $i < count($names); $i++) {
            $city = new City();
            $city->setName($names[$i]);
            $manager->persist($city);
        }

        $manager->flush();
    }
}
