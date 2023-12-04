<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use App\Models\IptablesModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class IpBlockFilter implements FilterInterface
{
    public function __construct()
    {
        $this->IptablesModel = new IptablesModel();
    }
    public function before(RequestInterface $request, $arguments = null)
    {
        $clientIP = $request->getIPAddress();
        
        $allowedIPs = $this->IptablesModel->where('allow_ip',$clientIP)->first();
        
        if (!$allowedIPs){
            return service('response')->setStatusCode(403)->setBody('접근 권한이 없습니다.');
        }
        
        return $request;
    }
    
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // 미들웨어 실행 후에 필요한 작업을 수행할 수 있습니다.
    }
}