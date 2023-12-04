<?php

namespace App\Libraries\Api;

use App\Controllers\Common;
use CodeIgniter\API\ResponseTrait;

class APIService
{
    use ResponseTrait;
    
    public function __construct()
    {
        //        $this->fileChecker = new FileChecker();
        $this->BASE_URL = env('app.baseURL');
        $this->APIURL = env('app.apiURL');
        $this->API_TYPE_ID = env('app.apiTypeID');
        $this->API_TYPE = env('app.apiType');
        
        $this->CronInDataURL = env('app.CronInDataURL');
        $this->CronOutDataURL = env('app.CronOutDataURL');
        $this->CronServiceKey = env('app.CronServiceKey');
        
        $this->CURL = \Config\Services::curlrequest();
        $this->Common = new Common();
    }
    
    public function DustApiCall($type = 'in')
    {
        if ($type == 'in') {
            $url = $this->CronInDataURL;
        } else {
            $url = $this->CronOutDataURL;
        }
        $retry_cnt = 0;
        while ($retry_cnt < 2) {
            try {
                $response = $this->CURL->request('GET', $url, [
                    'headers' => [
                        'user-agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    ],
                    'query'   => [
                        'serviceKey' => $this->CronServiceKey,
                        'pageNo'     => 1,
                        'numOfRows'  => 10,
                        'type'       => 'json',
                    ],
                ]);
                $body = $response->getBody();
                $jsonData = json_decode($body, true);
                $returnData = [
                    'status' => 'success',
                    'data'   => $jsonData,
                ];
                break;
            } catch (\Exception $e) {
                $retry_cnt++;
                $returnData = [
                    'status'    => 'fail',
                    'error_cnt' => $retry_cnt,
                    'error_msg' => $e->getMessage(),
                ];
            }
        }
        return $returnData;
    }
    
    public function mainDustData($deviceData)
    {
        $url = $this->APIURL . 'api/incheon-airport';
        $response = $this->CURL->request('GET', $url, [
            'headers' => [
                'accept'  => 'application/json',
                'API-KEY' => $deviceData['data']['service_key'],
            ],
            'query'   => [
                'in_station_id'  => $deviceData['inData']['station_id'],
                'out_station_id' => $deviceData['outData']['station_id'],
            ],
        ]);
        $body = $response->getBody();
        $jsonData = json_decode($body);
        if ($jsonData->status) {
            return $jsonData;
        } else {
            return false;
        }
    }
    
    public function serviceKeySave($device_code, $expires = '', $desc = '인천공항 대기질 데이터 요청합니다.')
    {
        $serviceKey = uniqid("incheon_");
        $now = date('Y-m-d H:i:s');
        $oneYearLater = date('Y-m-d H:i:s', strtotime($now . ' +1 year'));
        $insertArray = [
            'serviceTypeId' => $this->API_TYPE_ID,
            'serviceType'   => $this->API_TYPE,
            'deviceId'      => $device_code,
            'referer'       => $this->BASE_URL,
            'description'   => $desc,
            'is_active'     => 0,
            'serviceKey'    => $serviceKey,
            'expires_at'    => $expires ?? $oneYearLater,
            'created_at'    => $now,
        ];
        try {
            $this->Common->AuthApiServiceKeyModel->save($insertArray);
            $insertID = $this->Common->AuthApiServiceKeyModel->insertID();
            $returnData = [
                'status' => 'success',
                'data'   => [
                    'serviceKey' => $insertArray['serviceKey'],
                    'expires_at' => $insertArray['expires_at'],
                ],
            ];
        } catch (\Exception $e) {
            $errorMsg = $e->getMessage();
            $returnData = [
                'status'    => 'fail',
                'error_str' => 'service key not save',
            ];
        }
        return $returnData;
        
    }
    
    public function serviceKeyUpdate(array $data)
    {
        $updateData = [
            'expires_at'  => $data['expires_at'],
            'is_active'   => $data['is_active'],
            'description' => $data['description'],
        ];
        $updateStatus = $this->Common->AuthApiServiceKeyModel->set($updateData)->where('serviceKey', $data['serviceKey'])->update();
        if ($updateStatus == true) {
            $return = [
                'status' => 'success',
            ];
        } else {
            $return = [
                'status'    => 'fail',
                'error_str' => 'update_fail',
            ];
        }
        return $return;
    }
    
    
    public function returnData($response, $status, $pArray)
    {
        if (!is_array($pArray)) {
            $mergeArray = ['error_str' => $pArray];
        } else {
            $mergeArray = $pArray;
        }
        $statusArray = [
            'status' => $status,
        ];
        $arrayMerage = array_merge($statusArray, $mergeArray);
        if ($status == 'success') {
            return $response->setStatusCode(200)->setJSON($arrayMerage);
        } else {
            return $response->setStatusCode(403)->setJSON($arrayMerage);
        }
    }
    
    public function time_change($rtime)
    {
        //        $fcstRealDate = date_create_from_format('YmdHis', $rtime . '0000');
        $fcstRealDate = date('Y-m-d H:i:s', strtotime($rtime . ':00:00'));
        $fcstDate = date('Y-m-d', strtotime(substr($rtime, 0, 8)));
        $fcstTime = date('H:i:s', strtotime(substr($rtime, 8) . ':00:00'));
        $callDate = date('Y-m-d H:i:s');
        
        return [
            'fcstRealDate' => $fcstRealDate,
            'fcstDate'     => $fcstDate,
            'fcstTime'     => $fcstTime,
            'callDate'     => $callDate,
        ];
    }
}
