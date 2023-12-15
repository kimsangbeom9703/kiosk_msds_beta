<?php


namespace App\Controllers\A\sub;

use App\Controllers\Common;
use CodeIgniter\Controller;

class SubController extends Controller
{
    public function __construct()
    {
        $this->Common = new Common();
    }
    protected function render(string $path, $datas = []): string
    {
        return service('twig')->render(A_VIEW_MAIN_SUB_PATH . $path, $datas);
    }
    
    protected function view(string $body, string $seg): string
    {
        $datas = [
            'body' => $body,
            'seg'  => $seg,
        ];
        return service('twig')->render(A_VIEW_MAIN_SUB_INDEX_PATH, $datas);
    }
}
