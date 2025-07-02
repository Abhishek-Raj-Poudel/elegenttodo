<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'user_id',
        'tag_name',
        'tag_color',
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }
    public function todos(){
        return $this->belongsToMany(Todo::class);
    }
}
