<?php

namespace App\Controllers\Admin;

use CodeIgniter\API\ResponseTrait;

class Api extends AdminBaseController
{
    use ResponseTrait;
    
    public function __construct()
    {
        parent::__construct();
    }
    
    public function list_sorting()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $getBody = json_decode($this->request->getBody(), true);
        $move_sort_val = $getBody['sort_val'];
        $content_idx = $getBody['content_idx'];
        $ContentData = $this->Common->ContentsModel->where(['id' => $content_idx])->first();
        
        $pre_sort = $ContentData['sort'];
        $move_sort = $move_sort_val;
        
        $this->Common->db->transStart();
        
        if ($move_sort_val > $pre_sort) {
            $this->Common->ContentsModel->downSorting($ContentData['main_category_id'], $ContentData['sub_category_id'], $move_sort, $pre_sort);
        } else {
            $this->Common->ContentsModel->upSorting($ContentData['main_category_id'], $ContentData['sub_category_id'], $move_sort, $pre_sort);
        }
        $this->Common->ContentsModel->basicSorting($content_idx, $move_sort_val);
        if ($this->Common->db->transStatus() === false) {
            $this->Common->db->transRollback();
            $message = array('status' => 'false', 'message' => '순서변경이 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
            session()->setFlashdata('message', $message);
        } else {
            $this->Common->db->transCommit();
            $message = array('status' => 'success', 'message' => '순서가 변경되었습니다.', 'class' => 'alert alert-success alert-dismissible');
            session()->setFlashdata('message', $message);
        }
        return $this->respond($message);
    }
    
    public function main_list_sorting()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $getBody = json_decode($this->request->getBody(), true);
        $move_sort_val = $getBody['sort_val'];
        $content_idx = $getBody['content_idx'];
        $ContentData = $this->Common->ContentsModel->where(['id' => $content_idx])->first();
        
        $pre_sort = $ContentData['sort'];
        $move_sort = $move_sort_val;
        
        $this->Common->db->transStart();
        
        if ($move_sort_val > $pre_sort) {
            $this->Common->ContentsModel->downSorting($ContentData['main_category_id'], null, $move_sort, $pre_sort);
        } else {
            $this->Common->ContentsModel->upSorting($ContentData['main_category_id'], null, $move_sort, $pre_sort);
        }
        $this->Common->ContentsModel->basicSorting($content_idx, $move_sort_val);
        if ($this->Common->db->transStatus() === false) {
            $this->Common->db->transRollback();
            $message = array('status' => 'false', 'message' => '순서변경이 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
            session()->setFlashdata('message', $message);
        } else {
            $this->Common->db->transCommit();
            $message = array('status' => 'success', 'message' => '순서가 변경되었습니다.', 'class' => 'alert alert-success alert-dismissible');
            session()->setFlashdata('message', $message);
        }
        return $this->respond($message);
    }
    
    public function used_update()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $getBody = json_decode($this->request->getBody(), true);
        $id = $getBody['id'];
        $used = $getBody['used'];
        $contentsData = $this->Common->ContentsModel->where('id', $id)->first();
        
        $updateArray = [
            'id'               => $id,
            'main_category_id' => $contentsData['main_category_id'],
            'sub_category_id'  => $contentsData['sub_category_id'],
            'used'             => '',
            'sort'             => '',
        ];
        $this->Common->db->transStart();
        $contentsData = $this->Common->ContentsModel->where('id', $id)->first();
        $lastUsedSort = $this->Common->ContentsModel->where(['main_category_id' => $contentsData['main_category_id'], 'sub_category_id' => $contentsData['sub_category_id'], 'used' => '0'])->orderBy('sort', 'desc')->first();
        if ($used == true) {
            $updateArray['used'] = '0';
            $updateArray['sort'] = $lastUsedSort !== NULL ? ($lastUsedSort['sort'] + 1) : '1';
        } else {
            $updateArray['used'] = '1';
        }
        if ($used !== true) {
            $sortData = $this->Common->ContentsModel->where(['id' => $id])->first();
        }
        $this->Common->ContentsModel->save($updateArray);
        if ($used == true) {
            $sortData = $this->Common->ContentsModel->where(['id' => $id])->first();
        }
        $this->Common->ContentsModel->deletedSorting($sortData);
        
        
        if ($this->Common->db->transStatus() === false) {
            $this->Common->db->transRollback();
            $message = array('status' => 'false', 'message' => '상태가 변경되지 않았습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
            session()->setFlashdata('message', $message);
        } else {
            $this->Common->db->transCommit();
            $message = array('status' => 'success', 'message' => '상태가 변경되었습니다.', 'class' => 'alert alert-success alert-dismissible');
            session()->setFlashdata('message', $message);
        }
        return $this->respond($message);
    }
    
    public function contents_delete()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $getBody = json_decode($this->request->getBody(), true);
        $id = $getBody['id'];
        $this->Common->db->transStart();
        $oldData = $this->Common->ContentsModel->where('id', $id)->first();
        $this->Common->ContentsModel->deletedSorting($oldData);
        $this->Common->ContentsModel->where('id', $id)->delete();
        
        if ($this->Common->db->transStatus() === false) {
            $this->Common->db->transRollback();
            $message = array('status' => 'false', 'message' => '삭제가 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
            session()->setFlashdata('message', $message);
        } else {
            //$this->Common->db->transCommit();
            $filesData = $this->Common->FilesModel->where('content_id', $id)->findAll();
            foreach ($filesData as $filesDatum) {
                $this->File->fileDelete($filesDatum);
            }
            $this->Common->FilesModel->where('content_id', $id)->delete();
            $this->Common->db->transCommit();
            $message = array('status' => 'success', 'message' => '컨텐츠가 삭제되었습니다.', 'class' => 'alert alert-success alert-dismissible');
            session()->setFlashdata('message', $message);
        }
        return $this->respond($message);
    }
    
    public function List()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $categorySubData = $categoryData['subData'];
        $data = $this->Common->getContentsAllList($categoryMainData['id'], $categorySubData['id']);
        $data['mainData'] = $categoryMainData;
        $data['subData'] = $categorySubData;
        $body = $this->render('contents/index', $data);
        return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url'], $categorySubData['url']);
    }
    
    public function Create()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $categorySubData = $categoryData['subData'];
        $this->Common->validation->setRule('title', '제목', 'trim|required');
        $this->Common->validation->setRule('contentsFile', '컨텐츠', 'uploaded[contentsFile]|ext_in[contentsFile,' . str_replace('.', '', $categorySubData['type']) . ']');
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $fileData = $this->request->getFile('contentsFile');
            $postData = $this->request->getPost();
            $fileChecker = $this->File->moveChecker($fileData, $this->Common->categoryMainData(2), $this->Common->categoryMainData(3));
            if (!$fileChecker) {
                $message = array('status' => 'false', 'message' => '컨텐츠 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            }
            $postData['main_category_id'] = $categoryMainData['id'];
            $postData['sub_category_id'] = $categorySubData['id'];
            $postData['used'] = "0";
            $postData['sort'] = ($this->Common->ContentsModel->where(['main_category_id' => $categoryMainData['id'], 'sub_category_id' => $categorySubData['id']])->countAllResults() + 1);
            $this->Common->db->transStart();
            $this->Common->ContentsModel->save($postData);
            $insertId = $this->Common->ContentsModel->insertID();
            $fileInsertArray = [
                'content_id'    => $insertId,
                'org_file_name' => $fileChecker['orgName'],
                'file_name'     => $fileChecker['newName'],
                'file_ext'      => $fileChecker['ext'],
                'file_size'     => $fileChecker['size'],
                'file_type'     => $fileChecker['mimeType'],
                'file_path'     => $fileChecker['uploadPath'],
                'file_number'   => 1,
            ];
            $this->Common->FilesModel->save($fileInsertArray);
            
            if ($this->Common->db->transStatus() === false) {
                $this->Common->db->transRollback();
                $message = array('status' => 'false', 'message' => '컨텐츠 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            } else {
                $this->Common->db->transCommit();
                $message = array('status' => 'success', 'message' => '컨텐츠가 등록되었습니다.', 'class' => 'alert alert-success alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->to('admin/' . $categoryMainData['url'] . '/' . $categorySubData['url']);
            }
        } else {
            $body = $this->render('contents/create', $categoryData);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url'], $categorySubData['url']);
        }
    }
    
    public function Edit(int $id)
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $categorySubData = $categoryData['subData'];
        
        $this->Common->validation->setRule('title', '제목', 'trim|required');
        if ($this->request->getFile('contentsFile') !== null) {
            if ($this->request->getFile('contentsFile')->getSize() > 0) {
                $this->Common->validation->setRule('contentsFile', '컨텐츠', 'uploaded[contentsFile]|ext_in[contentsFile,' . str_replace('.', '', $categorySubData['type']) . ']');
            }
        }
        
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $fileData = $this->request->getFile('contentsFile');
            $postData = $this->request->getPost();
            $postData['id'] = $id;
            
            if ($fileData->getSize() > 0) {
                $fileChecker = $this->File->moveChecker($fileData, $this->Common->categoryMainData(2), $this->Common->categoryMainData(3));
                if (!$fileChecker) {
                    $message = array('status' => 'false', 'message' => '컨텐츠 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                    session()->setFlashdata('message', $message);
                    return redirect()->back();
                }
                $oldFileData = $this->Common->FilesModel->where('content_id', $id)->first();
                $fileDelete = $this->File->fileDelete($oldFileData);
                if (!$fileDelete) {
                    return redirect()->back();
                }
                $this->Common->FilesModel->where('id', $oldFileData['id'])->delete();
                $fileInsertArray = [
                    'content_id'    => $id,
                    'org_file_name' => $fileChecker['orgName'],
                    'file_name'     => $fileChecker['newName'],
                    'file_ext'      => $fileChecker['ext'],
                    'file_size'     => $fileChecker['size'],
                    'file_type'     => $fileChecker['mimeType'],
                    'file_path'     => $fileChecker['uploadPath'],
                    'file_number'   => 1,
                ];
                $this->Common->FilesModel->save($fileInsertArray);
                $this->Common->ContentsModel->save($postData);
            } else {
                $this->Common->ContentsModel->save($postData);
            }
            if ($this->Common->db->transStatus() === false) {
                $this->Common->db->transRollback();
                $message = array('status' => 'false', 'message' => '수정되지 않았습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            } else {
                $this->Common->db->transCommit();
                $message = array('status' => 'success', 'message' => '컨텐츠가 수정되었습니다.', 'class' => 'alert alert-info alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->to('admin/' . $categoryMainData['url'] . '/' . $categorySubData['url']);
            }
        } else {
            $getData = $this->Common->ContentsModel->where('id', $id)->first();
            $getFileData = $this->Common->FilesModel->where('content_id', $id)->first();
            $getArrays = [
                'contentData' => $getData,
                'fileData'    => $getFileData,
                'mainData'    => $categoryMainData,
                'subData'     => $categorySubData,
            ];
            $body = $this->render('contents/edit', $getArrays);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url'], $categorySubData['url']);
        }
    }
    
    /**
     * qrcode =========================================================================================================
     **/
    public function Qrcode()
    {
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $categorySubData = $categoryData['subData'];
        $settingData = $this->Common->SettingModel->first();
        
        $this->Common->validation->setRule('call_number', '비상전화', 'trim|required');
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $postData = $this->request->getPost();
            $postData['id'] = $settingData['id'];
            $qrcodeMake = $this->File->qrcodeMake($postData['call_number']);
            if (!$qrcodeMake) {
                $message = array('status' => 'false', 'message' => '비상전화 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            } else {
                $this->Common->SettingModel->save($postData);
                $message = array('status' => 'success', 'message' => '비상전화가 등록되었습니다.', 'class' => 'alert alert-success alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            }
        } else {
            $getArrays = [
                'settingData' => $settingData,
                'mainData'    => $categoryMainData,
                'subData'     => $categorySubData,
            ];
            
            $body = $this->render('contents/qrcode', $getArrays);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url'], $categorySubData['url']);
        }
    }
    
    /**
     * State===============================================================================
     **/
    public function State()
    {
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $categorySubData = $categoryData['subData'];
        $settingData = $this->Common->SettingModel->first();
        
        $this->Common->validation->setRule('target_date', '목표일', 'trim|required');
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $postData = $this->request->getPost();
            $postData['id'] = $settingData['id'];
            $this->Common->SettingModel->save($postData);
            $message = array('status' => 'success', 'message' => '목표일이 설정되었습니다.', 'class' => 'alert alert-success alert-dismissible');
            session()->setFlashdata('message', $message);
            return redirect()->back();
        } else {
            $getArrays = [
                'settingData' => $settingData,
                'mainData'    => $categoryMainData,
                'subData'     => $categorySubData,
            ];
            
            $body = $this->render('contents/state', $getArrays);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url'], $categorySubData['url']);
        }
    }
    /**
     * Notice
     **/
    public function Notice()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $data = $this->Common->getNotFilesContentsAllList($categoryMainData['id']);
        $data['mainData'] = $categoryMainData;
        $body = $this->render('notice/index', $data);
        return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url']);
    }
    
    public function NoticeCreate()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        
        $this->Common->validation->setRule('title', '제목', 'trim|required');
        $this->Common->validation->setRule('desc', '내용', 'trim|required');
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $postData = $this->request->getPost();
            $postData['main_category_id'] = $categoryMainData['id'];
            $postData['used'] = "0";
            $postData['sort'] = ($this->Common->ContentsModel->where(['main_category_id' => $categoryMainData['id']])->countAllResults() + 1);
            $this->Common->db->transStart();
            $this->Common->ContentsModel->save($postData);
            if ($this->Common->db->transStatus() === false) {
                $this->Common->db->transRollback();
                $message = array('status' => 'false', 'message' => '컨텐츠 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            } else {
                $this->Common->db->transCommit();
                $message = array('status' => 'success', 'message' => '컨텐츠가 등록되었습니다.', 'class' => 'alert alert-success alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->to('admin/' . $categoryMainData['url']);
            }
        } else {
            $body = $this->render('notice/create', $categoryData);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url']);
        }
    }
    
    public function NoticeEdit($id)
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $categoryData = $this->Common->categoryData();
        $categoryMainData = $categoryData['mainData'];
        $contentData = $this->Common->ContentsModel->where('id', $id)->first();
        $this->Common->validation->setRule('title', '제목', 'trim|required');
        $this->Common->validation->setRule('desc', '내용', 'trim|required');
        if ($this->request->getPost() && $this->Common->validation->withRequest($this->request)->run()) {
            $postData = $this->request->getPost();
            $postData['id'] = $id;
            $postData['main_category_id'] = $categoryMainData['id'];
            
            $this->Common->db->transStart();
            $this->Common->ContentsModel->save($postData);
            if ($this->Common->db->transStatus() === false) {
                $this->Common->db->transRollback();
                $message = array('status' => 'false', 'message' => '컨텐츠 등록 실패했습니다.', 'class' => 'errors alert alert-danger alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->back();
            } else {
                $this->Common->db->transCommit();
                $message = array('status' => 'success', 'message' => '컨텐츠가 등록되었습니다.', 'class' => 'alert alert-success alert-dismissible');
                session()->setFlashdata('message', $message);
                return redirect()->to('admin/' . $categoryMainData['url']);
            }
        } else {
            $getArrays = [
                'contentData' => $contentData,
                'mainData'    => $categoryMainData,
            ];
            
            $body = $this->render('notice/edit', $getArrays);
            return $this->view($body, lang('Admin.menu-Main'), $categoryMainData['url']);
        }
    }
    
    public function edit_image_upload()
    {
        if (!$this->isAuthorized()) {
            return redirect()->to('/auth');
        }
        $getFiles = $this->request->getFiles();
        $qrcodeMake = $this->File->fileEditSave($getFiles['file'], 'notice');
        return $this->respond($qrcodeMake);
    }
}