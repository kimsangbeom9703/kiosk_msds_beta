<?php

$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->group(rtrim(AUTH_URL_PREFIX,'/'), static function ($routes) {
    
    $routes->setDefaultNamespace('App\Controllers\Auth');
    $routes->setDefaultMethod('index');
    $routes->setTranslateURIDashes(false);
    $routes->set404Override();
    
    $routes->get('/', 'Auth::index');
    $routes->add('login', 'Auth::login');
    $routes->get('logout', 'Auth::logout');
    $routes->get('forgot_password', 'Auth::forgot_password');
});
?>