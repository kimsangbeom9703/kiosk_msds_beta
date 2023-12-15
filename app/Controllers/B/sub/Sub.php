<?php

namespace App\Controllers\B\sub;


class Sub extends SubController
{
    public function index(string $seg)
    {
//        var_dump($seg);
        $body = $this->render($seg);
        return $this->view($body, $seg);
    }
    
    public function refuge()
    {
        $seg = 'refuge';
        $mainIdx = 3;
        $subIdx = 10;
        $contentData = $this->Common->contentsData($mainIdx, $subIdx);
        $getArrays = [
            'contentData' => $contentData,
        ];
        $body = $this->render('refuge', $getArrays);
        return $this->view($body, $seg);
    }
}
