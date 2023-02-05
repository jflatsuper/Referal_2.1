<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Auth;
use DB;
use Illuminate\Http\Request;
use Validator;

class WithdrawalController extends Controller
{
    //
    public function validateWithdrawal(array $data)
    {
        return Validator::make($data, [
            'transaction_id' => ['string', 'max:255', 'unique'],
            'reference_id' => ['string', 'max:255', 'unique'],
            'amount' => ['string'],
            'delivery_email' => ['string'],
            'approved' => ['boolean'],
            'complete' => ['boolean'],

        ]);

    }
    public function approveWithdrawal()
    {

    }
    public function declineWithdrawal()
    {

    }
    public function createWithdrawal(Request $request)
    {
        $value = $this->create($request->all());
        return response()->json($value);
    }
    public function getWithdrawalDetails()
    {
        $value = DB::table('users')
            ->where('users.id', Auth::id())
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->leftJoin('withdrawals', 'users.id', '=', 'withdrawals.user_id')
            ->select('users.*', 'accounts.*','withdrawals.*')
            ->get();
        return $value;

    }
    protected function create(array $data)
    {
        return Withdrawal::create([
            'id'=>uuid_create(),
            'transaction_id' => $data['trans_id'] ?? uuid_create(),
            'user_id' => Auth::id(),
            'amount' => $data['amount'],
            'delivery_email' => $data['delivery_email'],
        ]);
    }
}