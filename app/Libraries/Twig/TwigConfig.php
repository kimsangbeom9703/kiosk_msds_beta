<?php

namespace App\Libraries\Twig;
use CodeIgniter\Config\BaseConfig;

class TwigConfig extends BaseConfig
{
    public $functions_safe = ['pathvariable', 'config', 'number_format', 'fileUrl','date_string_format', 'csrf_field','admin_site_url'];
    public $functions_asis = ['current_url', 'base_url','site_url','count','intval','date_format','base64encode','base64decode'];
    public $paths          = [];
//    public $ttl = 1; // 1 hour (for example)
} 