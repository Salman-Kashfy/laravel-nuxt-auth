<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=>'throttle:20000,1'],function (){ // 20,5
    Route::post('/register','API\Auth\RegisterController@register');
    Route::post('/login','API\Auth\AuthController@login');
    Route::get('/login/{service}', 'API\Auth\SocialLoginController@redirect');
    Route::get('/login/{service}/callback', 'API\Auth\SocialLoginController@callback');
});

Route::group(['middleware'=>'jwt.auth'],function (){
    Route::get('/user','API\UserController@user');
    Route::post('/logout','API\Auth\AuthController@logout'); // logout should be here
    Route::post('/test-post','API\UserController@test_post');
});

Route::group(['middleware'=>'guest'],function (){
    Route::post('/reset-password-request','API\UserController@reset_password_request');
    Route::post('/reset-password-validity','API\UserController@reset_password_validity');
    Route::post('/reset-password','API\UserController@reset_password');
});

Route::post('/refresh','API\Auth\AuthController@refresh');
Route::post('/verify-email','API\UserController@verify_email');
Route::post('/remember-login','API\Auth\AuthController@remember_login');
Route::get('/client-settings','API\SettingsController@client_settings');



Route::get('/test', 'API\Auth\SocialLoginController@test');
