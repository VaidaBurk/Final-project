<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Album;

class Artist extends Model
{
    use HasFactory;

    protected $table = 'artists';
    
    protected $fillable = [
        'title',
        'origin',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }
}