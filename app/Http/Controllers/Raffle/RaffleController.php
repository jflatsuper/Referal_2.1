<?php

namespace App\Http\Controllers\Raffle;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
use App\Models\Raffle;
use Auth;
use DB;
use Illuminate\Http\Request;

class RaffleController extends Controller
{
    //
    public function joinRaffle()
    {
        $user = Auth::user();
        $account_point = Account::where('user_id', $user->id)->first()->point_balance;
        if ($account_point < 3000) {
            return response()->json(['status' => "Balance Error", 'message' => 'Points Balance not sufficient.'], 444);
        }
        $value = DB::transaction(function () use ($user) {
            Account::where('user_id', Auth::id())->decrement('point_balance', 3000);
            Raffle::create([
                'username' => $user->username,
                'won' => false,
                'user_id' => $user->id
            ]);
            $trans = new TransactionController();
            $trans->createTransaction([
                'transaction_id' => uuid_create(),
                'user_id' => Auth::id(),
                'amount' => -3000,
                'currency' => config('enums.currency')['P'],
                'status' => config('enums.transaction_status')['SUC'],
                'transaction_type' => config('enums.transaction_types')['RAF']
            ]);

        });
        return response()->json($value);

    }
    public function getRaffleTickets()
    {
        $raffles = Raffle::where('user_id', Auth::id())->get();
        return response()->json($raffles);

    }
}