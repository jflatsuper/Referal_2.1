<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory;
    use HasFactory;
    protected $table = "marketplace";

    protected $fillable = [
        'id',
        'user_id',
        'name',
        "description",
        "link",
        "transaction_id",
        "active",
        'approved',
        'created_at',
        'updated_at'


    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [

    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [

    ];
}