<?php
/**
 * Created by PhpStorm.
 * User: STY-4
 * Date: 12/8/2019
 * Time: 5:25 AM
 */

namespace App\Http\Helpers;


use App\Http\Controllers\Controller;
use App\Role;
use Illuminate\Support\Facades\Auth;

class Helper extends Controller {

    public static function getTokenExpiry(){
        $current_time = time();
        $add_time = "+".Auth::guard()->factory()->getTTL()." minute";
        $future_time = strtotime($add_time,$current_time);
        return $future_time;
    }

    public static function get_role_by_name($name){
        if(is_array($name)){
            $roles = Role::whereIn('name',$name)->get();
            return $roles;
        }
        $role = Role::where('name',$name)->limit(1)->first();
        return $role;
    }

    public static function getUserAllowedKeys($db_user,$role = null){
        $allowed_keys = config('constant.user_allowed_keys');
        foreach ($allowed_keys as $allowed_key){
            $user[$allowed_key] = $db_user->{$allowed_key};
        }
        $user['role'] = $role->name;
        $user['role_name'] = $role->display_name;
        return $user;
    }

    public static function download_image($url,$path){
        $filename = uniqid();
        $ext = pathinfo(basename($url), PATHINFO_EXTENSION);
        $filename = $ext ? $filename.".{$ext}" : $filename.'.png';
        $path = public_path($path);
        $full_path = $path.'/'.$filename;
        if (!file_exists($path)) {
            mkdir($path, 666, true);
        }
        file_put_contents($full_path,file_get_contents($url));
        return $filename;
    }

}