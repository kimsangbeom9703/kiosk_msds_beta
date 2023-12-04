<?php

namespace App\Libraries\IonAuth;

class IonAuth extends \IonAuth\Libraries\IonAuth
{
    /**
     * Configuration
     *
     * @var \IonAuth\Config\IonAuth
     */
    protected $config;
    
    /**
     * IonAuth model
     *
     * @var \IonAuth\Models\IonAuthModel
     */
    protected $ionAuthModel;
    
    /**
     * Email class
     *
     * @var \CodeIgniter\Email\Email
     */
    protected $email;
    
    /**
     * __construct
     *
     * @author Ben
     */
    public function __construct()
    {
        parent::__construct();
    }
    public function isAdmin(int $id = 0): bool
    {
        $this->ionAuthModel->triggerEvents('is_admin');
        
        $adminGroup = $this->config->adminGroup;
        
        return $this->loggedIn() && $this->ionAuthModel->inGroup($adminGroup, $id);
    }
    
    public function isSuperAdmin(int $id = 0): bool
    {
        $this->ionAuthModel->triggerEvents('is_admin');
        
        $adminGroup = $this->config->superAdminGroup;
        
        return $this->loggedIn() && $this->ionAuthModel->inGroup($adminGroup, $id);
        
    }
}