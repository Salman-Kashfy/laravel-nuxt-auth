<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Helper;
use App\Settings;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Redirect;

class SocialLoginController extends Controller
{

    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
        $this->middleware(['web']);
    }

    public function redirect($service)
    {
        if(in_array($service,config('constant.allowed_social_login'))){
            return Socialite::driver($service)->redirect();
        }else{
            abort(404);
        }
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function callback($service)
    {
        try {
            $social_user = Socialite::driver($service)->user();
        } catch (\Exception $e) {
            abort(404);
        }

        //echo config('app.client_url');

        $user = User::where('email',$social_user->email)->limit(1)->first();
//        echo "<pre>";
//        print_r($user);
//        echo "</pre>";
        if($user){
            return $this->login($user);
        }

        $avatar = '';
        switch ($service){
            case 'google':
                if($social_user->user['picture']){
                    $avatar = $social_user->user['picture'];
                }else if($social_user->avatar){
                    $avatar = $social_user->avatar;
                }else if($social_user->avatar_original){
                    $avatar = $social_user->avatar_original;
                }
                $name = ($social_user->user['name']) ? $social_user->user['name'] : $social_user->name;
                break;
            case 'github':
                if($social_user->user['avatar_url']){
                    $avatar = $social_user->user['avatar_url'];
                }else if($social_user->avatar){
                    $avatar = $social_user->avatar;
                }
                $name = ($social_user->user['name']) ? $social_user->user['name'] : $social_user->name;
                if($social_user->user['name']){
                    $name = $social_user->user['name'];
                }else if($social_user->name){
                    $name = $social_user->name;
                }else if($social_user->nickname){
                    $name = $social_user->nickname;
                }
                break;
        }

        $full_name = $this->process_name($name);
        if($avatar){
            $avatar = Helper::download_image($avatar,'storage/users/thumbnail');
        }
        $user = new User();
        $user->role_id = 2;
        $user->email = $social_user->email;
        $user->f_name = $full_name[0];
        $user->l_name = isset($full_name[1]) && $full_name[1] ? $full_name[1] : '';
        $user->email_verified = 1;
        $user->avatar = $avatar;
        if(!$user->save()){
            if (file_exists(public_path('storage/users/thumbnail/' . $avatar))) {
                unlink(public_path('storage/users/thumbnail/' . $avatar));
            }
            abort(404);
        }

        return $this->login($user);

    }

    public function process_name($name){
        $name = trim($name);
        $name = str_replace('-',' ',$name);
        $names = explode(' ',$name);
        $last_name = '';
        foreach ($names as $key=>$single_name){
            if(!$key){
                $f_name = $single_name;
                continue;
            }
            $last_name = ' '.$single_name;
        }
        return [$f_name,$last_name];
    }

    public function login($user){
        $token = $this->auth->fromUser($user);
        return Redirect::to(config('app.client_url').'/social/login/'.$token);
    }

    public function test(){
        $user_exist = User::where('email','test@gmal.com')->limit(1)->first();
        if($user_exist){
            echo "FOUND";
        }else{
            echo "NOT FOUND";
        }
    }
}
