<?php

namespace App\Controllers;

use App\Models\CategoryMainModel;
use App\Models\CategorySubModel;
use App\Models\ContentsModel;
use App\Models\FilesModel;
use App\Models\SettingModel;
use CodeIgniter\API\ResponseTrait;


class Common
{
    use ResponseTrait;
    
    public function __construct()
    {
        helper(['form', 'text', 'filesystem']);
        $this->db = db_connect();
        $this->validation = \Config\Services::validation();
        $this->CategoryMainModel = new CategoryMainModel();
        $this->CategorySubModel = new CategorySubModel();
        $this->ContentsModel = new ContentsModel();
        $this->FilesModel = new FilesModel();
        $this->SettingModel = new SettingModel();
    }
    
    public function displayMenu()
    {
        $menus = [];
        $mainCategoryData = $this->CategoryMainModel->findAll();
        foreach ($mainCategoryData as $mainData) {
            $sub_menu = [];
            $subCategoryData = $this->CategorySubModel->where('main_idx', $mainData['id'])->orderBy('sort', 'asc')->findAll();
            foreach ($subCategoryData as $subData) {
                $sub_menu[$subData['url']] = [
                    'label' => $subData['title'],
                    'title' => $subData['title'],
                    'url'   => '/admin/' . $mainData['url'] . '/' . $subData['url'],
                    'icon'  => 'circle',
                ];
            }
            $menus[$mainData['url']] = [
                'label'    => $mainData['title'],
                'title'    => $mainData['title'],
                'url'      => '/admin/' . $mainData['url'],
                'icon'     => 'circle-notch',
                'sub_menu' => $sub_menu,
            ];
        }
        return $menus;
    }
    
    public function categoryMainData(int $returnIdx)
    {
        $uri = service('uri');
        return $uri->getSegment($returnIdx);
    }
    
    public function categoryData()
    {
        $uri = service('uri');
        $mainData = $this->CategoryMainModel->where('url', $uri->getSegment(2))->first();
        $subData = $this->CategorySubModel->where('url', $uri->getSegment(3))->first();
        return [
            'mainData' => $mainData,
            'subData'  => $subData,
        ];
    }
    
    public function getContentsAllList(int $mainIdx, int $subIdx , int $limit = 10)
    {
        if (empty($subIdx)) {
            $wheres = [
                'k_contents.main_category_id' => $mainIdx,
            ];
        } else {
            $wheres = [
                'k_contents.main_category_id' => $mainIdx,
                'k_contents.sub_category_id'  => $subIdx,
            ];
        }
        
        $contentsWhere = [
            'k_files.file_number' => '1',
            'k_files.deleted_at ' => null,
        ];
        $mergeWhere = array_merge($wheres, $contentsWhere);
        
        
        $resultData = $this->ContentsModel->
        select('k_contents.*,k_files.file_path,k_files.file_type,k_files.org_file_name')->
        where($mergeWhere)->
        join('k_files', 'k_contents.id = k_files.content_id ')->
        orderBy('k_contents.used asc')->
        orderBy('k_contents.sort asc')->
        orderBy('k_contents.id desc')->
        paginate($limit, 'admin');
        
        $pager = $this->ContentsModel->pager;
        $sortData = $this->ContentsModel->select('sort')->where($wheres)->where('used', '0')->orderBy('sort', 'asc')->findAll();
        $returnData = ['data' => $resultData, 'pager' => $pager, 'drop_sort' => $this->dataSorting($sortData)];
        return $returnData;
    }
    public function getNotFilesContentsAllList(int $mainIdx,int $limit = 10)
    {
        $wheres = [
            'k_contents.main_category_id' => $mainIdx,
        ];
        

        
        $resultData = $this->ContentsModel->
        select('k_contents.*')->
        where($wheres)->
        orderBy('k_contents.used asc')->
        orderBy('k_contents.sort asc')->
        orderBy('k_contents.id desc')->
        paginate($limit, 'admin');
        
        $pager = $this->ContentsModel->pager;
        $sortData = $this->ContentsModel->select('sort')->where($wheres)->where('used', '0')->orderBy('sort', 'asc')->findAll();
        $returnData = ['data' => $resultData, 'pager' => $pager, 'drop_sort' => $this->dataSorting($sortData)];
        return $returnData;
    }
    
    public function dataSorting($data)
    {
        $dropSort = [];
        foreach ($data as $sort) {
            $dropSort[$sort['sort']] = $sort['sort'];
        }
        return $dropSort;
    }
    
    function getGuid()
    {
        $guid = random_string('md5', 36);
        return $guid;
    }
    
}
