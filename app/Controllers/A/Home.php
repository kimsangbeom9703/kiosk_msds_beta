<?php

namespace App\Controllers\A;


class Home extends HomeBaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function index()
    {
        
        var_dump(11111);
        return;
        $contentData = $this->Common->contentsData(1,1);
        $getArrays = [
            'contentData' => $contentData,
        ];
        $body = $this->render('main', $getArrays);
        return $this->view($body);
    }
}
