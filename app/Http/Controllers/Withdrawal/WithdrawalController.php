<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Auth;
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

    }
    protected function create(array $data)
    {
        return Withdrawal::create([
            'transaction_id' => $data['trans_id'] ?? uuid_create(),
            'reference_id' => $data['reference_id'],
            'user_id' => Auth::id(),
            'amount' => $data['amount'],
            'delivery_email' => $data['delivery_email'],
            'approved' => $data['approved'],
            'complete' => $data["complete"],
        ]);
    }
}