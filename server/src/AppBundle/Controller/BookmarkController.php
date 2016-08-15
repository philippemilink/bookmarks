<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Bookmark;
use AppBundle\Form\BookmarkType;
use FOS\RestBundle\Controller\Annotations as Rest; // alias pour toutes les annotations
use FOS\RestBundle\View\View; // Utilisation de la vue de FOSRestBundle
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class BookmarkController extends Controller
{
    /**
     * @Rest\View()
     * @Rest\Get("/boxes/{id}/bookmarks")
     * @ApiDoc(
     *  section="Bookmarks",
     *  resource=true,
     *  description="Get all bookmarks of a specified box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }
     *  },
     * )
     */
    public function getBookmarksAction(Request $request)
    {
        $box = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Box')
                ->find($request->get('id')); // L'identifiant en tant que paramétre n'est plus nécessaire

        if (empty($box)) {
            return $this->boxNotFound();
        }

        return $box->getBookmarks();
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/boxes/{id}/bookmarks")
     * @ApiDoc(
     *  section="Bookmarks",
     *  resource=true,
     *  description="Create a new bookmark in a specified box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="link",
     *          "dataType"="text",
     *          "requirement"="\d+",
     *          "description"="New link"
     *      }
     *  },
     * )
     */
    public function postBookmarksAction(Request $request)
    {
        $box = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Box')
                ->find($request->get('id'));

        if (empty($box)) {
            return $this->boxNotFound();
        }

        $bookmark = new Bookmark();
        $bookmark->setBox($box); 
        $form = $this->createForm(BookmarkType::class, $bookmark);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $bookmark->setDateCreation(new \DateTime());
            
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($bookmark);
            $em->flush();

            return $bookmark;
        } else {
            return $form;
        }
    }

    private function boxNotFound()
    {
        return \FOS\RestBundle\View\View::create(['message' => 'Box not found'], Response::HTTP_NOT_FOUND);
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/boxes/{id_box}/bookmarks/{id_bookmark}")
     * @ApiDoc(
     *  section="Bookmarks",
     *  resource=true,
     *  description="Remove a bookmark from a box",
     *  requirements={
     *      {
     *          "name"="id_box",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="id_bookmark",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the bookmark"
     *      }
     *  },
     * )
     */
    public function removeBookmarkAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $bookmark = $em->getRepository('AppBundle:Bookmark')
                    ->find($request->get('id_bookmark'));

        if ($bookmark) {
            $em->remove($bookmark);
            $em->flush();
        }
    }

    /**
     * @Rest\View()
     * @Rest\Put("/boxes/{id_box}/bookmarks/{id_bookmark}")
     * @ApiDoc(
     *  section="Bookmarks",
     *  resource=true,
     *  description="Update a bookmark",
     *  requirements={
     *      {
     *          "name"="id_box",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="id_bookmark",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the bookmark"
     *      }
     *  },
     * )
     */
    public function updateBookmarkAction(Request $request)
    {
        return $this->updateBookmark($request, true);
    }

    /**
     * @Rest\View()
     * @Rest\Patch("/boxes/{id_box}/bookmarks/{id_bookmark}")
     * @ApiDoc(
     *  section="Bookmarks",
     *  resource=true,
     *  description="Update a bookmark",
     *  requirements={
     *      {
     *          "name"="id_box",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="id_bookmark",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the bookmark"
     *      }
     *  },
     * )
     */
    public function patchBookmarkAction(Request $request)
    {
        return $this->updateBookmark($request, false);
    }

    private function updateBookmark(Request $request, $clearMissing)
    {
        $bookmark = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Bookmark')
                ->find($request->get('id_bookmark')); 

        if (empty($bookmark)) {
            return new JsonResponse(['message' => 'Bookmark not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BookmarkType::class, $bookmark);

        $form->submit($request->request->all(), $clearMissing);

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($bookmark);
            $em->flush();
            return $bookmark;
        } else {
            return $form;
        }
    }

}