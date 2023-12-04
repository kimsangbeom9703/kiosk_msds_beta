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
//        echo esc(\CodeIgniter\CodeIgniter::CI_VERSION);
        $body = $this->render('main');
        return $this->view($body);
    }
}
