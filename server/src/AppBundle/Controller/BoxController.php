<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Box;
use AppBundle\Form\BoxType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class BoxController extends Controller
{

    /**
     * @Rest\View()
     * @Rest\Get("/boxes")
     * @ApiDoc(
     *  section="Boxes",
     *  resource=true,
     *  description="Get all boxes with bookmarks"
     * )
     */
    public function getBoxesAction(Request $request)
    {
        $boxes = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Box')
                ->findAll();

        return $boxes;
    }

    /**
     * @Rest\View()
     * @Rest\Get("/boxes/{id}")
     * @ApiDoc(
     *  section="Boxes",
     *  resource=true,
     *  description="Get a box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }
     *  },
     *  statusCodes={404={"Returned the given id doesn't correspond to a box"}}
     * )
     */
    public function getBoxAction(Request $request)
    {
        $box = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Box')
                ->find($request->get('id'));


        if (empty($box)) {
            return new JsonResponse(['message' => 'Box not found'], Response::HTTP_NOT_FOUND);
        }

        return $box;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/boxes")
     * @ApiDoc(
     *  section="Boxes",
     *  description="Create a new box",
     *  requirements={
     *      {
     *          "name"="title",
     *          "dataType"="string",
     *          "description"="Title of the box"
     *      }
     *  }
     * )
     */
    public function postBoxesAction(Request $request)
    {
        $box = new Box();
        $form = $this->createForm(BoxType::class, $box);

        $form->submit($request->request->all()); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($box);
            $em->flush();
            
            return $box;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/boxes/{id}")
     * @ApiDoc(
     *  section="Boxes",
     *  resource=true,
     *  description="Remove a box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }
     *  }
     * )
     */
    public function removeBoxAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $box = $em->getRepository('AppBundle:Box')
                    ->find($request->get('id'));

        if ($box) {
            $em->remove($box);
            $em->flush();
        }
    }

    /**
     * @Rest\View()
     * @Rest\Put("/boxes/{id}")
     * @ApiDoc(
     *  section="Boxes",
     *  resource=true,
     *  description="Update a box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="title",
     *          "dataType"="string",
     *          "description"="New title of the box"
     *      }
     *  }
     * )
     */
    public function updateBoxAction(Request $request)
    {
        return $this->updateBox($request, true);
    }

    /**
     * @Rest\View()
     * @Rest\Patch("/boxes/{id}")
     * @ApiDoc(
     *  section="Boxes",
     *  resource=true,
     *  description="Update a box",
     *  requirements={
     *      {
     *          "name"="id",
     *          "dataType"="integer",
     *          "requirement"="\d+",
     *          "description"="Id of the box"
     *      }, {
     *          "name"="title",
     *          "dataType"="string",
     *          "description"="New title of the box"
     *      }
     *  }
     * )
     */
    public function patchBoxAction(Request $request)
    {
        return $this->updateBox($request, false);
    }

    private function updateBox(Request $request, $clearMissing)
    {
        $box = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Box')
                ->find($request->get('id')); 

        if (empty($box)) {
            return new JsonResponse(['message' => 'Box not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(BoxType::class, $box);

        $form->submit($request->request->all(), $clearMissing);

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($box);
            $em->flush();
            return $box;
        } else {
            return $form;
        }
    }

}
