<?php namespace App\Controllers\Admin;

/**
 * Admin abstract controller file
 *
 * @package CI-Admin
 * @author  Benoit VRIGNAUD <benoit.vrignaud@zaclys.net>
 * @license https://opensource.org/licenses/MIT	MIT License
 * @link    http://github.com/bbvrignaud/ci-admin
 */

use App\Controllers\Common;
use CodeIgniter\Controller;

/**
 * Admin abstract controller
 *
 * @package CI4-Admin
 */
abstract class AdminBaseController extends Controller
{
    /**
     * IonAuth library
     *
     * @var \IonAuth\Libraries\IonAuth
     */
    protected $ionAuth;
    
    /**
     * Left menu
     *
     * @var array
     */
    protected $leftMenu = [
        'preview' => [
            'label' => 'Admin.menu-preview',
            'title' => 'Admin.menu-preview',
            'url'   => 'admin/preview',
            'icon'  => 'circle-notch',
        ],
        //        'users'        => [
        //            'label' => 'Admin.menu-users',
        //            'title' => 'Admin.menu-users',
        //            'url'   => 'admin/users',
        //            'icon'  => 'user',
        //        ],
        //		'videos'    => [
        //			'label' => 'Admin.menu-videos',
        //			'title' => 'Admin.menu-videos',
        //			'url'   => 'admin/videos',
        //			'icon'  => 'video',
        //		],
        //		'users'        => [
        //			'label' => 'Admin.menu-users',
        //			'title' => 'Admin.menu-users',
        //			'url'   => 'admin/users',
        //			'icon'  => 'user',
        //		],
        //		'informations' => [
        //			'label' => 'Admin.menu-labelInformation',
        //			'title' => 'Admin.menu-generalInformation',
        //			'url'   => 'admin/informations',
        //			'icon'  => 'info-circle',
        //		],
    ];
    
    /**
     * User
     *
     * @var stdClass
     */
    protected $user;
    
    /**
     * Constructor
     *
     * @return void
     */
    public function __construct()
    {
        //		$this->ionAuth = new \IonAuth\Libraries\IonAuth();
        $this->ionAuth = new \App\Libraries\IonAuth\IonAuth;
        $this->Common = new Common();
        $this->File = service('file');
//        $this->ApiService = service('apiService');
        if ($this->ionAuth->loggedIn()) {
            $this->user = $this->ionAuth->user()->row();
        }
    }
    
    /**
     * Check if user is logged in is admin
     *
     * @return boolean
     */
    protected function isAuthorized(): bool
    {
        return $this->ionAuth->loggedIn() && $this->ionAuth->isAdmin();
    }
    
    
    protected function isDeviceManagerChecker($deviceId): bool
    {
        if ($this->ionAuth->isSuperAdmin()) {
            return $this->ionAuth->loggedIn();
        } else {
            return $this->Common->DeviceModel->deviceManagerCheck($deviceId, $this->ionAuth->getUserId());
        }
    }
    
    /**
     * Display the $body page inside the main vue
     *
     * @param string $body Body vue
     * @param string $pageTitle Page title
     * @param string $activeMenu Active menu
     *
     * @return string
     */
    protected function view(string $body, string $pageTitle = '', string $activeMenu = '', string $subActiveMenu = '', string $lowActiveMenu = ''): string
    {
        $mainData = [
            'appName'       => $_ENV['app.appName'],
            'ionAuth'       => $this->ionAuth,
            'userAllName'   => $this->user->all_name,
            'userFirstName' => $this->user->first_name,
            'userLastName'  => $this->user->last_name,
            'pageTitle'     => $pageTitle,
            'leftMenu'      => $this->displayLeftMenu($this->leftMenu, $activeMenu, $subActiveMenu, $lowActiveMenu),
            'body'          => $body,
        ];
        return service('twig')->render(ADMIN_VIEW_MAIN_PATH, $mainData);
    }
    
    protected function render(string $path, $datas = []): string
    {
        $basicData = [
            'current_uri' => uri_string(),
            'message'     => $this->Common->validation->getErrors() ? $this->Common->validation->listErrors() : ($this->ionAuth->errors() ? $this->ionAuth->errors() : session()->getFlashdata('message')),
        ];
        $datas = array_merge($datas, $basicData);
        return service('twig')->render(ADMIN_VIEW_PATH . $path, $datas);
    }
    
    /**
     * Parse $menu and return the html menu
     *
     * @param array $menus Menu to parse
     * @param string $activeMenu Active menu
     *
     * @return string
     */
    private function displayLeftMenu(array $menus, string $activeMenu, string $subActiveMenu, string $lowActiveMenu): string
    {
        $menus = array_merge($menus, $this->Common->displayMenu());
       
        $html = '';
        foreach ($menus as $keyMenu => $menu) {
            $active = $activeMenu === $keyMenu ? ' active' : '';
            if (empty($menu['sub_menu'])) {
                
                $html .= '<li class="nav-item"' . (empty($menu['title']) ?
                        '' : ' title="' . lang($menu['title']) . '"') . '>';
                if (empty($menu['sous-menu'])) {
                    $html .= '<a class="nav-link ' . $active . '" href="' . site_url($menu['url']) . '">';
                    $html .= isset($menu['icon']) ?
                        '<i class="nav-icon fa fa-' . $menu['icon'] . '" aria-hidden="true"></i> ' : '';
                    $html .= '<p>' . lang($menu['label']) . '</p>';
                    $html .= '</a>';
                } else {
                    $html .= self::displayLeftMenu($menu['sous-menu']);
                }
                $html .= '</li>';
            } else {
                $menu_open = $activeMenu === $keyMenu ? ' menu-open' : '';
                
                $html .= '<li class="nav-item has-treeview ' . $menu_open . '">';
                $html .= '<a class="nav-link ' . $active . '" href="#">';
                $html .= isset($menu['icon']) ?
                    '<i class="nav-icon fa fa-' . $menu['icon'] . '" aria-hidden="true"></i> ' : '';
                $html .= '<p>' . lang($menu['label']) . '</p>';
                $html .= '<i class="right fa fa-angle-left"></i>';
                $html .= '</a>';
                $html .= ' <ul class="nav nav-treeview" >';
                
                foreach ($menu['sub_menu'] as $sub_keyMenu => $sub_menu) {
                    if (empty($sub_menu['low_menu'])) {
                        $sub_active = $subActiveMenu == $sub_keyMenu ? ' active' : '';
                        
                        $class = 'fa fa-' . $sub_menu['icon'] . ' nav-icon';
                        $html .= '<li class="nav-item">
                                    <a href="' . site_url($sub_menu['url']) . '" class="nav-link ' . $sub_active . '"">
                                      <i class="' . $class . '"></i>
                                      <p>' . lang($sub_menu['label']) . '</p>
                                    </a>
                                  </li>';
                    } else {
                        $sub_active = $subActiveMenu == $sub_keyMenu ? ' active' : '';
                        $sub_open = $subActiveMenu == $sub_keyMenu ? ' menu-open' : '';
                        
                        $class = 'fa fa-' . $sub_menu['icon'] . ' nav-icon';
                        $html .= '<li class="nav-item  aa has-treeview ' . $sub_open . ' " >
                                    <a href="' . site_url($sub_menu['url']) . '" class="nav-link ' . $sub_active . '"">
                                      <i class="' . $class . '"></i>
                                      <p>' . lang($sub_menu['label']) . '</p>
                                      <i class="right fa fa-angle-left"></i>
                                    </a>
                                    <ul class="nav nav-treeview" >';
                        //low
                        foreach ($sub_menu['low_menu'] as $low_keyMenu => $low_menu) {
                            $low_class = 'fa fa-' . $low_menu['icon'] . ' nav-icon';
                            $low_active = $lowActiveMenu == $low_keyMenu ? ' active' : '';
                            $html .= '<li class="nav-item">
                                    <a href="' . site_url($low_menu['url']) . '" class="nav-link ' . $low_active . '"">
                                      <i class="' . $low_class . '"></i>
                                      <p>' . lang($low_menu['label']) . '</p>
                                    </a>
                                  </li>';
                        }
                        $html .= '</ul></li>';
                    }
                }
                
                $html .= '</ul></li>';
                
            }
        }
        //		foreach ($menus as $keyMenu => $menu)
        //		{
        //			$active = $activeMenu === $keyMenu ? ' active' : '';
        //			$html  .= '<li class="nav-item"' . (empty($menu['title']) ?
        //							'' : ' title="' . lang($menu['title']) . '"') . '>';
        //			if (empty($menu['sous-menu']))
        //			{
        //				$html .= '<a class="nav-link ' . $active . '" href="' . site_url($menu['url']) . '">';
        //				$html .= isset($menu['icon']) ?
        //							'<i class="nav-icon fa fa-' . $menu['icon'] . '" aria-hidden="true"></i> ' : '';
        //				$html .= '<p>' . lang($menu['label']) . '</p>';
        //				$html .= '</a>';
        //			}
        //			else
        //			{
        //				$html .= self::displayLeftMenu($menu['sous-menu']);
        //			}
        //			$html .= '</li>';
        //		}
        return $html;
    }
}
