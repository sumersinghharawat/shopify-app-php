<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['product_id','store_domain','duration_hours','duration_minute','start_date','end_date','timezone','event_schedule','location','address','note','weekly_schedule','status'];

    public function getWeeklyScheduleAttribute($value){
        return json_decode($value);
    }
}
