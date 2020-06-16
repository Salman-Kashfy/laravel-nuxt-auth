<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class MeController extends Controller
{
    protected $auth;

    public function __construct(JWTAuth $auth){
        $this->auth = $auth;
    }

    public function test(){
        return response()->json(['status'=> true,'msg'=> 'testing123']);
    }

    public function logout(){
        $this->auth->invalidate();
        return response()->json(['status'=> true]);
    }
}
