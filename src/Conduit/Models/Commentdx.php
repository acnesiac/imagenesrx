<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * @property integer                 id
 * @property string                  body
 * @property integer                 article_id
 * @property integer                 user_id
 * @property \Conduit\Models\User    user
 * @property \Conduit\Models\Article article
 * @property \Carbon\Carbon          created_at
 * @property \Carbon\Carbon          update_at
 */
class Commentdx extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'body',
        'user_id',
        'diagnostico_id',
    ];

    /********************
     *  Relationships
     ********************/

    public function diagnostico()
    {
        return $this->belongsTo(Diagnostico::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}