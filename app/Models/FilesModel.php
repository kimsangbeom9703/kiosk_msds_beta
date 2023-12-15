<?php

namespace App\Models;

use CodeIgniter\Model;

class FilesModel extends Model
{
    protected $table         = 'k_files';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $allowedFields = ['id', 'content_id', 'org_file_name', 'file_name', 'file_path', 'file_ext', 'file_type', 'file_size', 'file_number','file_duration', 'created_at', 'updated_at', 'deleted_at'];
    
    protected $useSoftDeletes = true;
    
    protected $dateFormat    = 'datetime';
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';
}