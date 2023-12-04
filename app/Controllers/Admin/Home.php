<?php
namespace App\Controllers\Admin;

class Home extends AdminBaseController
{
    /**
     * Affiche la page d'entrée du site en fonction du statut de l'utilisateur (non connecté, gamer ou leader)
     *
     * @return \CodeIgniter\HTTP\RedirectResponse|string
     */
    public function index()
    {
        if (! $this->isAuthorized())
        {
            return redirect()->to('/auth/login');
        }
        return redirect()->to('/admin/preview');
    }
}
