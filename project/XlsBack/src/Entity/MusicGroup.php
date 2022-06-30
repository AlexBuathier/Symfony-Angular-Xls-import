<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MusicGroupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicGroupRepository::class)]
#[ApiResource]
class MusicGroup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'date')]
    private $startDate;

    #[ORM\Column(type: 'date', nullable: true)]
    private $separationDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $founder;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $members;

    #[ORM\Column(type: 'text')]
    private $presentation;

    #[ORM\ManyToOne(targetEntity: MusicTrend::class, inversedBy: 'musicGroups')]
    private $musicTrend;

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
}
