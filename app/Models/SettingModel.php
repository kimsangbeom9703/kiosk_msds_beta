<?php

namespace App\Models;

use CodeIgniter\Model;

class SettingModel extends Model
{
    protected $table         = 'k_setting';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $allowedFields = ['id', 'target_date', 'auto_change_status', 'auto_change_time', 'main_status', 'main_change_time', 'call_number'];
}