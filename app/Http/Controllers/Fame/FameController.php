<?php

namespace App\Http\Controllers\Fame;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
use App\Models\Fame;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Validator;

class FameController extends Controller
{
    //
    public function joinFameContest(Request $request)
    {
        $fameValidate = Validator::make($request->all(), [
            'user_id' => ['required', 'unique:fame_contest'],
        ]);
        if ($fameValidate->fails()) {
            return redirect()->back()->withErrors($fameValidate->errors());

        }
        $userlink = 'voteforme=' + $request['user_id'];
        $user = Fame::create([
            'user_id' => $request['user_id'],
            "link" => $userlink,
            "count" => 0
        ]);
        if ($user) {
            return view('fame')->with(['success' => "Successfully Registered for the same Contest"]);
        }
        return view('fame')->with(['error' => "Unable to register for Fame Contest"]);
    }
    public function voteforUser(Request $request)
    {
        $transaction = DB::transaction(function () use ($request) {
            $trans = new TransactionController();
            $eazyearn = User::where('username', 'eazyearn')->first()->id;
            $trans->createTransaction([
                'transaction_id' => $request->trans_id,
                'user_id' => $eazyearn,
                'amount' => $request['amount'],
                'status' => config('enums.transaction_status')['SUC'],
                'transaction_type' => config('enums.transaction_types')['FAM']
            ]);
            Account::where('user_id', $eazyearn)->increment('money_balance', $request->amount);
            Fame::where('user_id', $request->user_id)->increment('count', $request->number);
        });
        if ($transaction) {
            return response()->json($transaction);
        }
        return response()->json(['status' => "Withdrawal Error", 'message' => 'Requested amount more than available balance.'], 444);

    }
}