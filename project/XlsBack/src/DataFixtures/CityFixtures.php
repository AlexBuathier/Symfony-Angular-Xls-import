<?php

namespace App\DataFixtures;

use App\Entity\City;
use App\Repository\CountryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Console\Output\ConsoleOutput;

class CityFixtures extends Fixture implements DependentFixtureInterface
{

    private CountryRepository $countryRepository;

    public function __construct(CountryRepository $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }


    public function load(ObjectManager $manager): void
    {
        $output = new ConsoleOutput();

        $names = [
            ["Fr" => ["Paris", "Bordeaux", "Lyon"]],
            ["De" => ["Berlin", "Munich", "Frankfurt"]],
            ["Es" => ["Madrid", "Barcelona", "Valencia"]],
            ["It" => ["Rome", "Milan", "Venice"]],
            ["Un" => ["Londres", "Basildon", "Bristol", "Liverpool"]],
            ["Us" => ["New York", "Aberdeen", "Los Angeles"]],
        ];
        for ($i = 0; $i < count($names); $i++) {
            if (isset($names[$i]["Fr"]) && $names[$i]["Fr"]) {
                for ($j = 0; $j < count($names[$i]["Fr"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["Fr"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "France"]));
                    $manager->persist($city);
                }
            }
            if (isset($names[$i]["De"]) && $names[$i]["De"]) {
                for ($j = 0; $j < count($names[$i]["De"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["De"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "Germany"]));
                    $manager->persist($city);
                }
            }

            if (isset($names[$i]["Es"]) && $names[$i]["Es"]) {
                for ($j = 0; $j < count($names[$i]["Es"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["Es"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "Spain"]));
                    $manager->persist($city);
                }
            }

            if (isset($names[$i]["It"]) && $names[$i]["It"]) {
                for ($j = 0; $j < count($names[$i]["It"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["It"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "Italy"]));
                    $manager->persist($city);
                }
            }

            if (isset($names[$i]["Un"]) && $names[$i]["Un"]) {
                for ($j = 0; $j < count($names[$i]["Un"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["Un"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "Royaume-Uni"]));
                    $manager->persist($city);
                }
            }

            if (isset($names[$i]["Us"]) && $names[$i]["Us"]) {
                for ($j = 0; $j < count($names[$i]["Us"]); $j++) {
                    $city = new City();
                    $city->setName($names[$i]["Us"][$j]);
                    $city->setCountry($this->countryRepository->findOneBy(["name" => "Etats-unis"]));
                    $manager->persist($city);
                }
            }
            $manager->flush();
        }
    }

    public function getDependencies()
    {
        return [
            CountryFixtures::class
        ];
    }
}
