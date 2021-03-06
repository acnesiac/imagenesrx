<?php

namespace Conduit\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer                                  id
 * @property string                                   slug
 * @property string                                   title
 * @property string                                   description
 * @property string                                   body
 * @property integer                                  user_id
 * @property \Conduit\Models\User                     user
 * @property \Illuminate\Database\Eloquent\Collection comments
 * @property \Carbon\Carbon                           created_at
 * @property \Carbon\Carbon                           update_at
 */
class Cliente extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'slug',
        'title',
        'description',
        'body',
        'costo',
        'user_id',
        'cliente'
    ];

    public function setSlugAttribute($value)
    {
        $index = 0;
        $slug = $value;
        while (self::newQuery()
            ->where('slug', $slug)
            ->where('id', '!=', $this->id)
            ->exists()) {
            $slug = $value . '-' . ++$index;
        }

        return $this->attributes['slug'] = $slug;
    }

    /********************
     *  Relationships
     ********************/

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cliente()
    {
        return $this->belongsTo(User::class);
    }

     public function diagnosticos()
    {
        return $this->hasMany(Diagnostico::class);
    }

    /**
     * Check if given user has favorited this article
     *
     * @param null $id
     *
     * @return bool
     */
    public function isFavoritedByUser($id = null)
    {
        if (is_null($id)) {
            return false;
        }

        if ($id instanceof self) {
            $id = $id->id;
        }

        return $this->newBaseQueryBuilder()
            ->from('user_favorite')
            ->where('user_id', $id)
            ->where('article_id', $this->id)
            ->exists();
    }
}
