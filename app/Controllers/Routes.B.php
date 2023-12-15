<?php

$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->setDefaultNamespace('App\Controllers\B');
$routes->get ('b_type','B::index');

$routes->get ('/b_type/refuge','sub\Sub::refuge');
$routes->get ('/b_type/(:segment)','sub\Sub::index/$1');


?>