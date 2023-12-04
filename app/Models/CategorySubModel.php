<?php

namespace App\Models;

use CodeIgniter\Model;

class CategorySubModel extends Model
{
    protected $table         = 'k_sub_category';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $allowedFields = ['id', 'main_idx', 'title', 'url', 'type', 'sort', 'status', 'created_at', 'updated_at', 'deleted_at'];
    
    protected $useSoftDeletes = true;
    
    protected $dateFormat    = 'datetime';
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';
}