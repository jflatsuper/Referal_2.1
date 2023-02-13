<?php

namespace App\Http\Controllers\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Auth;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    //
    public function getAllUserTransactions()
    {
        $user = Auth::id();
        $transactions = Transaction::where('user_id', $user)->orderBy('created_at','DESC')->get();
        return response()->json($transactions);

    }
    public function createTransaction(array $data){
        return Transaction::create([
            'transaction_id' => $data['transaction_id'] ?? uuid_create(),
            'user_id' => $data["user_id"],
            'amount' => $data['amount'],
            'status' => $data["status"],
            'transaction_type' => $data['transaction_type']
        ]);
    }
}