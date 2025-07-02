<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'priority',
        'due_at',
        'notify_at',
        'notify_sent_at',
    ];

    protected $cast = [
        'due_at'=>'datetime',
        'notify_at' => 'datetime',
        'notify_sent_at' => 'datetime',
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }
}
