<?php

namespace App\Libraries\Admin;

use App\Libraries\IonAuth\IonAuth;

class Admin
{
    public function __construct()
    {
        //        $this->fileChecker = new FileChecker();
        $this->ionAuth = new IonAuth();
    }
}