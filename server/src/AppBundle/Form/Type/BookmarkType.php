<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class BookmarkType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /** @var \AppBundle\Service\TitlePageGetter $titlePageGetter */
        $titlePageGetter = $options['title_page_getter'];

        $builder
            ->add('link')
        ;

        $builder->addEventListener(
            FormEvents::POST_SUBMIT,
            function (FormEvent $event) use ($titlePageGetter) {
                $bookmark = $event->getData();

                $bookmark->setTitle($titlePageGetter->getTitle($bookmark->getLink()));
            });
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class'      => 'AppBundle\Entity\Bookmark',
            'csrf_protection' => false
        ));

        $resolver->setRequired('title_page_getter');
    }
}
