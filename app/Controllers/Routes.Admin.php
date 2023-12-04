<?php

// $routes->setDefaultNamespace('App\Controllers');
//$routes->setDefaultMethod('index');
//$routes->setTranslateURIDashes(false);
//$routes->set404Override();
//$routes->setAutoRoute(false);

$routes->group(rtrim(ADMIN_URL_PREFIX, '/'), static function ($routes) {
    
    $routes->setDefaultNamespace('App\Controllers\Admin');
    $routes->setDefaultMethod('index');
    $routes->setTranslateURIDashes(false);
    $routes->set404Override();
    $routes->setAutoRoute(false);
    
    //    $routes->addRedirect('/',ADMIN_URL_PREFIX.'site/topVisual');
    
    $routes->get('/', 'Home::index');
    $routes->get('preview', 'Preview::index');
    
    //    $routes->group('main', static function ($routes) {
    //        $routes->group('contents', static function ($routes) {
    //            $routes->get('/', 'Main::Contents');
    //            $routes->add('create', 'Main::ContentsCreate');
    //            $routes->add('(:num)', 'Main::ContentsEdit/$1');
    //        });
    //    });
    
    $routes->group('call', static function ($routes) {
        $routes->group('qrcode', static function ($routes) {
            $routes->get('/', 'Api::Qrcode');
            $routes->post('/', 'Api::Qrcode');
        });
    });
    
    $routes->group('report', static function ($routes) {
        $routes->group('state', static function ($routes) {
            $routes->get('/', 'Api::State');
            $routes->post('/', 'Api::State');
        });
    });
    
    $routes->group('notice', static function ($routes) {
        $routes->get('/', 'Api::Notice');
        $routes->get('create', 'Api::NoticeCreate');
        $routes->post('create', 'Api::NoticeCreate');
        $routes->get('(:num)', 'Api::NoticeEdit/$1');
        $routes->post('(:num)', 'Api::NoticeEdit/$1');
    });
    
    $routes->group('users', static function ($routes) {
        $routes->get('/', 'Users::index');
        $routes->add('create', 'Users::createUser');
        $routes->add('edit/(:num)', 'Users::edit/$1');
        $routes->add('activate/(:num)', 'Users::activate/$1');
        $routes->add('deactivate/(:num)', 'Users::deactivate/$1');
        $routes->add('edit_group/(:num)', 'Users::editGroup/$1');
        $routes->add('create_group', 'Users::createGroup');
    });
    
    $routes->group('(:segment)', static function ($routes) {
        $routes->group('(:segment)', static function ($routes) {
            $routes->get('/', 'Api::List/$1/$2');
            $routes->add('create', 'Api::Create');
            $routes->add('(:num)', 'Api::Edit/$3');
        });
    });
    
    
    $routes->group('api', static function ($routes) {
        $routes->post('edit_image_upload', 'Api::edit_image_upload');
        $routes->put('main_list_sorting', 'Api::main_list_sorting');
        $routes->put('list_sorting', 'Api::list_sorting');
        $routes->put('used_update', 'Api::used_update');
        $routes->delete('contents_delete', 'Api::contents_delete');
    });
    

    
    //    $routes->add('test', 'Test::index');
    
    //    $routes->group('setting', static function ($routes) {
    //        $routes->group('device', static function ($routes) {
    //            $routes->get('/', 'Devices::index');
    //            $routes->add('create', 'Devices::create');
    //
    //            $routes->put('servicekey', 'Devices::serviceKeyUpdate');
    //
    //            $routes->get('(:num)', 'Devices::edit/$1');
    //            $routes->put('(:num)', 'Devices::update/$1');
    //
    //            $routes->delete('(:num)', 'Devices::delete/$1');
    //
    //            $routes->group('(:num)', static function ($routes) {
    //                $routes->group('videos', static function ($routes) {
    //                    $routes->get('', 'Videos::index/$1');
    //                    $routes->add('create', 'Videos::create/$1');
    //
    //                    $routes->get('(:num)', 'Videos::edit/$1/$2');
    //                    $routes->put('(:num)', 'Videos::update/$1/$2');
    //
    //                    $routes->put('sorting', 'Videos::sorting');
    //                    $routes->put('used_update', 'Videos::usedUpdate');
    //
    //                    $routes->delete('remove/(:num)', 'Videos::deleted/$1/$2');
    //                });
    //                $routes->group('preview', static function ($routes) {
    //                    $routes->get('', 'Preview::index/$1');
    //                });
    //            });
    //        });
    //    });
    
    //    $routes->resource('videos',['websafe' => 1]);
    
});


?>
