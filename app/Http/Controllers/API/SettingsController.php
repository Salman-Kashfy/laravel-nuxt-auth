<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Settings;

class SettingsController extends Controller
{
    public function client_settings(){
        $settings = Settings::where('type','client')->get();
        if($settings && $settings->count()){
            $db_settings = config('constant.app_settings');
            foreach ($settings as $setting){
                $db_settings[$setting->name] = $setting->value;
            }
            return response()->json(['status'=>true,'settings'=>$db_settings]);
        }
        return response()->json(['status'=>false,'settings'=>[]]);
    }
}
