<?php

namespace Config;

class IonAuth extends \IonAuth\Config\IonAuth
{
    // set your specific config
    // public $siteTitle                = 'Example.com';       // Site Title, example.com
    // public $adminEmail               = 'admin@example.com'; // Admin Email, admin@example.com
    // public $emailTemplates           = 'App\\Views\\auth\\email\\';
    // ...
    public $identity     = 'username';
    public $defaultGroup = 'members';
    //public $identity                 = ['username','email'];
    public $maximumLoginAttempts = 5;                   // The maximum number of failed login attempts.
    public $minPasswordLength    = 10;
    public $adminGroup           = 'manager';             // Default administrators group, use name
    public $superAdminGroup      = 'admin';
}
