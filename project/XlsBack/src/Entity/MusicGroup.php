<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MusicGroupRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MusicGroupRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['music_groups_read'], "datetime_format" => "Y-m-d"],)]
class MusicGroup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups('music_groups_read')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups('music_groups_read')]
    private $name;

    #[ORM\Column(type: 'date')]
     #[Groups('music_groups_read')]
    private $startDate;

    #[ORM\Column(type: 'date', nullable: true)]
     #[Groups('music_groups_read')]
    private $separationDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
     #[Groups('music_groups_read')]
    private $founder;

    #[ORM\Column(type: 'integer', nullable: true)]
     #[Groups('music_groups_read')]
    private $members;

    #[ORM\Column(type: 'text')]
     #[Groups('music_groups_read')]
    private $presentation;

    #[ORM\ManyToOne(targetEntity: MusicTrend::class, inversedBy: 'musicGroups')]
     #[Groups('music_groups_read')]
    private $musicTrend;


    #[ORM\ManyToOne(targetEntity: City::class, inversedBy: 'musicGroups')]
    #[Groups('music_groups_read')]
    private $city;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getSeparationDate(): ?\DateTimeInterface
    {
        return $this->separationDate;
    }

    public function setSeparationDate(?\DateTimeInterface $separationDate): self
    {
        $this->separationDate = $separationDate;

        return $this;
    }

    public function getFounder(): ?string
    {
        return $this->founder;
    }

    public function setFounder(?string $founder): self
    {
        $this->founder = $founder;

        return $this;
    }

    public function getMembers(): ?int
    {
        return $this->members;
    }

    public function setMembers(?int $members): self
    {
        $this->members = $members;

        return $this;
    }

    public function getPresentation(): ?string
    {
        return $this->presentation;
    }

    public function setPresentation(string $presentation): self
    {
        $this->presentation = $presentation;

        return $this;
    }

    public function getMusicTrend(): ?MusicTrend
    {
        return $this->musicTrend;
    }

    public function setMusicTrend(?MusicTrend $musicTrend): self
    {
        $this->musicTrend = $musicTrend;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }
}
