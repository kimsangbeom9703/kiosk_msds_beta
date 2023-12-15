<?php

$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->setDefaultNamespace('App\Controllers\A');
$routes->get ('a_type','A::index');

$routes->get ('/a_type/refuge','sub\Sub::refuge');
$routes->get ('/a_type/(:segment)','sub\Sub::index/$1');


?>