<?php
/**
 * Created by PhpStorm.
 * User: salman
 * Date: 6/22/2020
 * Time: 8:33 AM
 */

namespace App\Http\Controllers\API;


class UserController
{
    public function user(){
        return response()->json(['data'=>auth()->user()],200);
    }
}