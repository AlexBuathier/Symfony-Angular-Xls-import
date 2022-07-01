<?php

namespace App\DataFixtures;

use App\Entity\City;
use App\Entity\Country;
use App\Repository\CountryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CityFixtures extends Fixture implements DependentFixtureInterface
{

    private CountryRepository $countryRepository;

    public function __construct(CountryRepository $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }


    public function load(ObjectManager $manager): void
    {
        $names = ["Paris", "Berlin", "Madrid", "Rome", "London", "New York"];
        for ($i = 0; $i < count($names); $i++) {
            $city = new City();
            $city->setName($names[$i]);
            $city->setCountry($this->countryRepository->find($i+1));
            $manager->persist($city);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CountryFixtures::class
        ];
    }
}
