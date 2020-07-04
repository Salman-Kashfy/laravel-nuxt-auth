<?php
/**
 * Created by PhpStorm.
 * User: salman
 * Date: 6/22/2020
 * Time: 8:33 AM
 */

namespace App\Http\Controllers\API;

use App\Http\Helpers\Helper;
use App\Mail\ResetPasswordRequest;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function user(){
        $db_user = $this->auth->user();
        $role = Role::find($db_user->role_id);
        $db_user = Helper::getUserAllowedKeys($this->auth->user(),$role);
        return response()->json(['data'=>$db_user],200);
    }

    public function verify_email(Request $request){
        $this->validate($request,[
            'token' =>  'required',
        ]);

        $user = User::select('id','email_verified')->where('verification_token',$request->token)->limit(1)->first();
        if(!$user || !isset($user->id))
            return response()->json(['status'=>false,'msg'=>'Invalid Request !','retry'=>false],200);

        if($user->email_verified)
            return response()->json(['status'=>true,'msg'=>'Link Expired !','retry'=>false],200);

        $user->email_verified = 1;
        if(!$user->save()){
            return response()->json(['status'=>false,'msg'=>'Something went wrong. Please Retry !','retry'=>true],200);
        }

        $token = $this->auth->fromUser($user);
        return response()->json(['status'=>true,'msg'=>'Verified Successfully !','retry'=>false,'token'=>$token,'user'=>$user],200);
    }

    public function reset_password_request(Request $request){

        $this->validate($request,['email' => 'required|email']);

        $user = User::where('email',$request->email)->limit(1)->first();
        if(!$user || !isset($user->id)) return response()->json(['status'=>false,'errors'=>['email'=>['Sorry, we did not find this email.']]],422);

        $reset_token = uniqid();
        $user->reset_password = $reset_token;
        if(!$user->save()) return response()->json(['status'=>false,'msg'=>'Something went wrong. Please try again or contact support.']);

        $url = "{$request->email_url}/{$user->reset_password}";
        Mail::to($user->email)->send(new ResetPasswordRequest($user,$url));

        return response()->json(['status'=>true,'msg'=>'Confirmation Link Sent !']);
    }

    public function reset_password_validity(Request $request){

        $this->validate($request,['token' => 'required']);
        $user = User::where('reset_password',$request->token)->limit(1)->first();
        if(!$user || !isset($user->id)) return response()->json(['status'=>false,'msg'=>'Link is expired or invalid']);
        return response()->json(['status'=>true,'msg'=>'Reset Password']);
    }

    public function reset_password(Request $request){

        $this->validate($request,['password' => 'required|min:6','token' => 'required']);
        $user = User::where('reset_password',$request->token)->limit(1)->first();
        if(!$user || !isset($user->id)) return response()->json(['status'=>false,'msg'=>'Link is expired or invalid']);

        $user->password = Hash::make($request->password);
        $user->reset_password = null;
        if(!$user->save()) return response()->json(['status'=>false,'msg'=>'Something went wrong. Please try again or contact support.']);

        return response()->json(['status'=>true,'msg'=>'Password reset successful !']);
    }

    public function test_post(Request $request){
        return response()->json(['user'=>auth()->user()],200);
    }
}