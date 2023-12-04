<?php

$routes->group(rtrim(API_URL_PREFIX, '/'), static function ($routes) {
    
    $routes->setDefaultNamespace('App\Controllers\Api');
    $routes->setDefaultMethod('index');
    $routes->setTranslateURIDashes(false);
    $routes->set404Override();
    $routes->setAutoRoute(false);
    
    $routes->get ('mainContentsData','Home::mainContentsData');
    
});

?>