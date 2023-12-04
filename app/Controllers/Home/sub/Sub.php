<?php

namespace App\Controllers\Home\sub;


class Sub extends SubController
{
    public function index(string $seg)
    {
        $body = $this->render($seg);
        return $this->view($body,$seg);
    }
}
