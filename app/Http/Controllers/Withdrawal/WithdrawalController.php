<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Transaction;
use App\Models\User;
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
        $eazyearn = User::where('username', 'eazyearn')->first()->id;
        DB::transaction(function () use ($request, $eazyearn) {
            $value = $this->create($request->all());
            $trans_id = uuid_create();
            $trans = new TransactionController();

            $trans->createTransaction([
                'transaction_id' => $trans_id,
                'user_id' => $eazyearn,
                'amount' => -$request['amount'],
                'status' => config('enums.transaction_status')['PEND'],
                'transaction_type' => config('enums.transaction_types')['PAY']
            ]);
            $trans->createTransaction([
                'transaction_id' => $trans_id,
                'user_id' => Auth::id(),
                'amount' => -$request['amount'],
                'status' => config('enums.transaction_status')['PEND'],
                'transaction_type' => config('enums.transaction_types')['WIT']
            ]);
            return response()->json($value);
        });
        response()->json(["error" => "There was an error"]);

    }
    public function getWithdrawalDetails()
    {
        $value = DB::table('users')
            ->where('users.id', Auth::id())
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->leftJoin('withdrawals', 'users.id', '=', 'withdrawals.user_id')
            ->select('users.*', 'accounts.*', 'withdrawals.*')
            ->get();
        return $value;

    }
    protected function create(array $data)
    {
        return Withdrawal::create([
            'id' => uuid_create(),
            'transaction_id' => $data['trans_id'] ?? uuid_create(),
            'user_id' => Auth::id(),
            'amount' => $data['amount'],
            'delivery_email' => $data['delivery_email'],
        ]);
    }
}