<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Auth;
use DB;
use Illuminate\Http\Request;
use Validator;

class AccountController extends Controller
{
    //
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'account_num' => ['string', 'max:255'],
            'bank' => ['string', 'max:255'],
            'account_name' => ['string'],

        ]);
    }
    public function getUserWithAccountDetails()
    {
        $user_account = DB::table('users')
            ->where('users.id', Auth::id())
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->join('referals', 'users.id', '=', 'referals.referal')
            ->join('users AS referee', 'referals.referee', '=', 'referee.id')
            ->select('users.*', 'accounts.*', 'referee.surname AS refSurname', 'referee.first_name AS refName')
            ->first();
        return response()->json($user_account);

    }
    public function editAccount(Request $request)
    {
        $validatedData = $this->validator($request->all());
        if ($validatedData->fails()) {
            return response()->json(['status' => "Account Error", 'message' => 'Invalid Account Details Provided.'], 444);


        }
        $edited = $this->edit($request->all());
        return response()->json($edited);
    }
    protected function edit(array $data)
    {
        return Account::where('user_id', Auth::id())->update([
            'account_num' => $data['account_num'],
            'bank' => $data['bank'],
            'account_name' => $data['account_name']
        ]);
    }
}