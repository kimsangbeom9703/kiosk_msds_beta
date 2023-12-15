<?php

namespace App\Controllers\Home;


class Home extends HomeBaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function index()
    {
        return $this->render('newMain');
    }
}
