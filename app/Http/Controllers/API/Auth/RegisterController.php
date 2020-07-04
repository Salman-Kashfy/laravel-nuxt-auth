<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Helper;
use App\Mail\UserRegistered;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\JWTAuth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '';
    protected $auth;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {

        $rules = [
            'f_name'    =>  'required|max:190',
            'l_name'    =>  'required|max:190',
            'email'     =>  'required|email|unique:users|max:190',
            'password'  =>  'required|min:6',
            'email_url' =>  'required|url',
        ];
        $messages = [
            'f_name.required'    =>  'First name is required.',
            'l_name.required'    =>  'Last name is required.',
            'f_name.max'         =>  'First name should not exceed 15 characters.',
            'l_name.max'         =>  'Last name should not exceed 15 characters.',
            'email.unique'       =>  'This email already exist.',
        ];

        $this->validate($request,$rules,$messages);

        $user = new User();
        $user->role_id = 2;
        $user->f_name = $request->f_name;
        $user->l_name = $request->l_name;
        $user->email = strtolower($request->email);
        $user->password = Hash::make($request->password);
        $user->verification_token = uniqid();
        if(!$user->save()){
            return response()->json(['status'=>false,'msg'=>'Something went wrong. Please try again or contact support.']);
        }
        $token = $this->auth->attempt($request->only('email','password'));
        $url = "{$request->email_url}/{$user->verification_token}";
        Mail::to($user->email)->send(new UserRegistered($user,$url));
        return response()->json(['status'=>true,'user'=>$user,'token'=>$token]);
    }
}
