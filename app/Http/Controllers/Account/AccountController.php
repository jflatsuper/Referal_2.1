<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Auth;
use DB;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    //
    public function getUserWithAccountDetails(){
        $user_account= DB::table('users')
        ->where('users.id',Auth::id())
        ->join('accounts', 'users.id', '=', 'accounts.user_id')
        ->join('referals', 'users.id', '=', 'referals.referal')
        ->join('users AS referee','referals.referee','=','referee.id')
        ->select('users.*', 'accounts.*','referee.surname AS refSurname','referee.first_name AS refName')
        ->first();
        return response()->json($user_account);

    }
}
