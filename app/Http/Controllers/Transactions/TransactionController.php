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
        $transactions = Transaction::where('user_id', $user)->get();
        return response()->json($transactions);

    }
}