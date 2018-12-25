<?php
namespace AppBundle\Service;

class TitlePageGetter
{
    public function getTitle(string $link): string
    {
        try {
            $page = file_get_contents($link);

            if ($page !== False) {
                preg_match("/\<title.*\>(.*)\<\/title\>/isU", $page, $matches);

                if (count($matches) < 2) {
                    return $link;
                } else {
                    return trim(html_entity_decode($matches[1], ENT_QUOTES | ENT_XML1, 'UTF-8'));
                }

            } else {
                return $link;
            }
        } catch (\Exception $e) {
            return $link;
        }
    }
}