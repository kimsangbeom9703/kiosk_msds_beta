<?php

namespace App\Controllers\Api;

use CodeIgniter\API\ResponseTrait;

use FFMpeg\FFMpeg;
use FFMpeg\FFProbe;


class Home extends ApiBaseController
{
    use ResponseTrait;
    
    public function __construct()
    {
        parent::__construct();
    }
    public function mainContentsData(){
        
    }
 }

