<?php

namespace Config;

use App\Libraries\Api\APIService;
use App\Libraries\File\FileService;
use CodeIgniter\Config\BaseService;
use App\Libraries\Twig\TwigConfig;
use App\Libraries\Twig\Twig;

/**
 * Services Configuration file.
 *
 * Services are simply other classes/libraries that the system uses
 * to do its job. This is used by CodeIgniter to allow the core of the
 * framework to be swapped out easily without affecting the usage within
 * the rest of your application.
 *
 * This file holds any application-specific services, or service overrides
 * that you might need. An example has been included with the general
 * method format you should use for your service methods. For more examples,
 * see the core Services file at system/Config/Services.php.
 */
class Services extends BaseService
{
    /*
     * public static function example($getShared = true)
     * {
     *     if ($getShared) {
     *         return static::getSharedInstance('example');
     *     }
     *
     *     return new \CodeIgniter\Example();
     * }
     */
   
    public static function apiService(bool $getShared = true){
        if ($getShared) {
            return static::getSharedInstance('apiService');
        }
        return new APIService();
    }
    
    public static function file(bool $getShared = true){
        if ($getShared) {
            return static::getSharedInstance('file');
        }
        return new FileService();
    }
    public static function twig(?TwigConfig $config = new TwigConfig(), bool $getShared = true){
        if ($getShared) {
            return static::getSharedInstance('twig', $config);
        }
        $config ??= config('Twig');
        $twig = new Twig($config);
        $twig->addGlobal('ADMIN_VIEW_MAIN_PATH',ADMIN_VIEW_MAIN_PATH);
        $twig->addGlobal('ADMIN_VIEW_PATH',ADMIN_VIEW_PATH);
        $twig->addGlobal('ADMIN_URL_PREFIX',ADMIN_URL_PREFIX);
        
        $twig->addGlobal('HOME_VIEW_MAIN_PATH',HOME_VIEW_MAIN_PATH);
        $twig->addGlobal('HOME_VIEW_PATH',HOME_VIEW_PATH);
        
        $twig->addGlobal('AUTH_URL_PREFIX',AUTH_URL_PREFIX);
        
        $twig->addGlobal('ENV',$_ENV);
        return $twig;
    }
}
