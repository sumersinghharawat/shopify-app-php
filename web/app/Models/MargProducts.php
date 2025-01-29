<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MargProducts extends Model
{
    use HasFactory;

    protected $table = 'marg_products';

    protected $fillable = [
        'code',
        'name',
        'stock',
        'company',
        'Rate',
        'PRate',
        'SyncStatus',
        'ShopifyProductId',
        'created_at',
        'updated_at',
    ];
}
