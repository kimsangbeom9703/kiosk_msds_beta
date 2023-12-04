<?php


namespace App\Controllers\Home\sub;

use CodeIgniter\Controller;

class SubController extends Controller
{
    
    protected function render(string $path, $datas = []): string
    {
        return service('twig')->render(HOME_VIEW_MAIN_SUB_PATH . $path, $datas);
    }
    
    protected function view(string $body, string $seg): string
    {
        $datas = [
            'body' => $body,
            'seg'  => $seg,
        ];
        return service('twig')->render(HOME_VIEW_MAIN_SUB_INDEX_PATH, $datas);
    }
}
