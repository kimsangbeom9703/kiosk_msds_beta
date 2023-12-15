<?php

$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->setDefaultNamespace('App\Controllers\Home');
$routes->get ('/','Home::index');

//$routes->get ('/refuge','sub\Sub::refuge');
//$routes->get ('/(:segment)','sub\Sub::index/$1');


?>