<?php

namespace App\Controllers\B;


class B extends HomeBaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function index()
    {
        $contentData = $this->Common->contentsData(1,1);
        $getArrays = [
            'contentData' => $contentData,
        ];
        $body = $this->render('main', $getArrays);
        return $this->view($body);
    }
}
