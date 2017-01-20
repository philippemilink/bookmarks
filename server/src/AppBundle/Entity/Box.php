<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Box
 *
 * @ORM\Table(name="box")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BoxRepository")
 */
class Box
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @Assert\NotBlank()
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var Bookmark[]
     * @ORM\OneToMany(targetEntity="Bookmark", mappedBy="box", cascade={"persist", "remove"})
     */
    protected $bookmarks;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->bookmarks = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Box
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Add bookmark
     *
     * @param \AppBundle\Entity\Bookmark $bookmark
     *
     * @return Box
     */
    public function addBookmark(\AppBundle\Entity\Bookmark $bookmark)
    {
        $this->bookmarks[] = $bookmark;

        return $this;
    }

    /**
     * Remove bookmark
     *
     * @param \AppBundle\Entity\Bookmark $bookmark
     */
    public function removeBookmark(\AppBundle\Entity\Bookmark $bookmark)
    {
        $this->bookmarks->removeElement($bookmark);
    }

    /**
     * Get bookmarks
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBookmarks()
    {
        return $this->bookmarks;
    }
}
