<?php

namespace App\Controllers\Api;

use App\Models\ContentsModel;
use CodeIgniter\API\ResponseTrait;

use FFMpeg\FFMpeg;
use FFMpeg\FFProbe;


class Home extends ApiBaseController
{
    use ResponseTrait;
    
    public function __construct()
    {
        parent::__construct();
        $this->db = db_connect();
        $this->ContentsModel = new ContentsModel();
    }
    
    public function contentsData()
    {
        $getBody = $this->request->getPost();
        //        $getBody = json_decode($this->request->getBody(),true);
        if (empty($getBody['mainIdx']) || empty($getBody['subIdx'])) {
            return $this->respond(['status' => 'fail', 'error_str' => 'not_params']);
        }
        $mainIdx = $getBody['mainIdx'];
        $subIdx = $getBody['subIdx'];
        
        $resultData = $this->db->query(
            "SELECT
                    `k_contents`.`title`,
                    `k_contents`.`desc`,
                    `k_contents`.`sort`,
                    `k_files`.`org_file_name`,
                    `k_files`.`file_path`,
                    `k_files`.`file_type`,
                    `k_files`.`file_duration`
                FROM
                    `k_contents`
                        JOIN
                    `k_files` ON `k_contents`.`id` = `k_files`.`content_id`
                WHERE
                    `k_contents`.`main_category_id` = " . $mainIdx . "
                        AND `k_contents`.`sub_category_id` = " . $subIdx . "
                        AND `k_files`.`file_number` = '1'
                        AND `k_contents`.`deleted_at` IS NULL
                        AND `k_files`.`deleted_at` IS NULL
                        AND `k_contents`.`deleted_at` IS NULL
                ORDER BY `k_contents`.`used` ASC , `k_contents`.`sort` ASC , `k_contents`.`id` DESC"
        )->getResultArray();
        
        if (empty($resultData)) {
            $returnData = ['status' => 'fail', 'error_str' => 'not_data'];
        } else {
            $returnData = ['status' => 'success', 'data' => $resultData];
        }
        return $this->respond($returnData);
    }
    
    public function newContentsData()
    {
//        $getBody = $this->request->getPost();
        $getBody = json_decode($this->request->getBody(),true);
        if (empty($getBody['mainIdx']) || empty($getBody['subIdx'])) {
            return $this->respond(['status' => 'fail', 'error_str' => 'not_params']);
        }
        $mainIdx = $getBody['mainIdx'];
        $subIdx = $getBody['subIdx'];
        
        $resultData = $this->db->query(
            "SELECT
                    `k_contents`.`title`,
                    `k_contents`.`desc`,
                    `k_contents`.`sort`,
                    `k_files`.`org_file_name`,
                    `k_files`.`file_path`,
                    `k_files`.`file_type`,
                    `k_files`.`file_duration`
                FROM
                    `k_contents`
                        JOIN
                    `k_files` ON `k_contents`.`id` = `k_files`.`content_id`
                WHERE
                    `k_contents`.`main_category_id` = " . $mainIdx . "
                        AND `k_contents`.`sub_category_id` = " . $subIdx . "
                        AND `k_files`.`file_number` = '1'
                        AND `k_contents`.`deleted_at` IS NULL
                        AND `k_files`.`deleted_at` IS NULL
                        AND `k_contents`.`deleted_at` IS NULL
                ORDER BY `k_contents`.`used` ASC , `k_contents`.`sort` ASC , `k_contents`.`id` DESC"
        )->getResultArray();
        
        if (empty($resultData)) {
            $returnData = ['status' => 'fail', 'error_str' => 'not_data'];
        } else {
            $returnData = ['status' => 'success', 'data' => $resultData];
        }
        return $this->respond($returnData);
    }
}

