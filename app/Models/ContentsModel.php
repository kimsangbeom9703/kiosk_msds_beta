<?php

namespace App\Models;

use CodeIgniter\Model;

class ContentsModel extends Model
{
    protected $table          = 'k_contents';
    protected $primaryKey     = 'id';
    protected $returnType     = 'array';
    protected $allowedFields  = ['id', 'main_category_id', 'sub_category_id', 'depth', 'sort', 'title', 'desc', 'used', 'created_at', 'updated_at', 'deleted_at'];
    protected $useSoftDeletes = true;
    protected $dateFormat     = 'datetime';
    protected $useTimestamps  = true;
    protected $createdField   = 'created_at';
    protected $updatedField   = 'updated_at';
    protected $deletedField   = 'deleted_at';
    
    public function downSorting(string $mainIdx, string $subIdx = null, string $moveSort, string $preSort)
    {
        $this->set('sort', 'sort - 1', false);
        $this->where('sort <=', $moveSort);
        $this->where('sort >', $preSort);
        $this->where('main_category_id', $mainIdx);
        if ($subIdx){
            $this->where('sub_category_id', $subIdx);
        }
        $this->where('used', '0');
        return $this->update();
    }
    
    public function upSorting(string $mainIdx, string $subIdx = null, string $moveSort, string $preSort)
    {
        $this->set('sort', 'sort + 1', false);
        $this->where('sort >=', $moveSort);
        $this->where('sort <', $preSort);
        $this->where('main_category_id', $mainIdx);
        if ($subIdx){
            $this->where('sub_category_id', $subIdx);
        }
        $this->where('used', '0');
        return $this->update();
    }
    
    public function deletedSorting(array $oldData)
    {
        $this->set('sort', 'sort - 1', false); // Using false to prevent CodeIgniter from escaping the SQL
        $this->where('main_category_id', $oldData['main_category_id']);
        if ($oldData['sub_category_id']){
            $this->where('sub_category_id', $oldData['sub_category_id']);
        }
        $this->where('sort >', $oldData['sort']);
        $this->where('used', '0');
        return $this->update();
    }
    
    public function basicSorting(string $id, string $moveSort)
    {
        $this->set('sort', $moveSort);
        $this->where('id', $id);
        $this->where('used', '0');
        return $this->update();
    }
    
}
