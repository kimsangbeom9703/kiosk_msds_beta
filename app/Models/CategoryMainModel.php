<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoryMainModel extends Model
{
    protected $table         = 'k_main_category';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $allowedFields = ['id', 'title', 'url', 'status', 'created_at', 'updated_at', 'deleted_at'];
    
    protected $useSoftDeletes = true;
    
    protected $dateFormat    = 'datetime';
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';
}