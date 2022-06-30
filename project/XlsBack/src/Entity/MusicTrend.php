<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MusicTrendRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicTrendRepository::class)]
#[ApiResource(collectionOperations: ["GET"], itemOperations: ["GET"])]
class MusicTrend
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $name;

    #[ORM\OneToMany(mappedBy: 'musicTrend', targetEntity: MusicGroup::class)]
    private $musicGroups;

    public function __construct()
    {
        $this->musicGroups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, MusicGroup>
     */
    public function getMusicGroups(): Collection
    {
        return $this->musicGroups;
    }

    public function addMusicGroup(MusicGroup $musicGroup): self
    {
        if (!$this->musicGroups->contains($musicGroup)) {
            $this->musicGroups[] = $musicGroup;
            $musicGroup->setMusicTrend($this);
        }

        return $this;
    }

    public function removeMusicGroup(MusicGroup $musicGroup): self
    {
        if ($this->musicGroups->removeElement($musicGroup)) {
            // set the owning side to null (unless already changed)
            if ($musicGroup->getMusicTrend() === $this) {
                $musicGroup->setMusicTrend(null);
            }
        }

        return $this;
    }
}
