<?php

namespace App\Controllers\Admin;

use CodeIgniter\API\ResponseTrait;

class Preview extends AdminBaseController
{
    use ResponseTrait;
    
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $body = $this->render('preview');
        return $this->view($body, lang('Admin.menu-preview'),'preview');
        
    }
}