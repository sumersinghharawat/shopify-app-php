<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventForm extends Model
{
    use HasFactory;
    
    protected $casts = [
        'form_code' => 'array'
    ];

    protected $fillable = ['form_title','form_code','form_status'];

}
