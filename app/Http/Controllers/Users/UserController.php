<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    protected $specificFields = ['first_name','surname','email','link','account_status','id'];
    public function getAllUsers(Request $request)
    {
        
        $users = User::whereNot('user_type', 'superAdmin')->get();
        return $users->makeHidden("password");
    }
    public function getAllVendors(Request $request)
    {
        
        $users = User::where('user_type', 'vendor')->get($this->specificFields);
        return response()->json($users);
    }

//
}