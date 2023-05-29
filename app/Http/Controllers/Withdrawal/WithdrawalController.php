<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
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
    public function getTotalEarnings()
    {
        $user = Auth::getUser();
        $withdrawals = Withdrawal::where('user_id', Auth::id())->where(['complete' => true, 'approved' => true])->sum('amount');
        $account = Account::where('user_id', $user->id)->first()->money_balance +$withdrawals;
        return response()->json(['user'=>$user,'total'=>$account]);

    }
    public function approveWithdrawal(Request $request)
    {
        $success = DB::transaction(function () use ($request) {
            Transaction::where("transaction_id", $request->trans_id)->update(['status' => 'success']);
            Withdrawal::where('transaction_id', $request->trans_id)->update(['approved' => true, 'complete' => true]);
            Account::where('user_id', $request->user_id)->decrement('money_balance', $request->amount);
            return true;
        });
        return response()->json($success);
    }
    public function declineWithdrawal(Request $request)
    {
        $success = DB::transaction(function () use ($request) {
            Transaction::where("transaction_id", $request->trans_id)->update(['status' => 'cancelled']);
            Withdrawal::where('transaction_id', $request->trans_id)->update(['approved' => false, 'complete' => true]);
            return true;
        });
        return response()->json($success);
    }
    public function createWithdrawal(Request $request)
    {
        $eazyearn = User::where('username', 'eazyearn')->first()->id;
        $userAcc = Account::where('user_id', Auth::id())->first()->money_balance;
        $withdrawals = Withdrawal::where('user_id', Auth::id())->where('complete', false)->sum('amount');
        if ($request->amount > $userAcc) {

            return response()->json(['status' => "Withdrawal Error", 'message' => 'Requested amount more than available balance.'], 444);
        } elseif ((int) $request->amount < 6000) {
            return response()->json(['status' => "Withdrawal Error", 'message' => 'Minimum withdrawal Amount is NGN 6000.'], 444);
        } elseif (($request->amount + $withdrawals) > $userAcc) {
            return response()->json(['status' => "Withdrawal Error", 'message' => 'Total Withdrawals greater than current Balance.'], 444);

        }
        DB::transaction(function () use ($request, $eazyearn) {
            $trans_id = uuid_create();
            $value = $this->create($request->all() + ['trans_id' => $trans_id]);

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
        return redirect()->back()->withErrors(['error' => 'Unable to complete request.']);


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
    public function getAllValidWithdrawalRequests()
    {
        $value = DB::table('withdrawals')
            ->where('complete', false)
            ->join('users', 'withdrawals.user_id', '=', "users.id")
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->select('withdrawals.*', 'users.*', 'accounts.*')
            ->orderBy('withdrawals.user_id', 'DESC')->get();
        return $value;

    }
    protected function create(array $data)
    {
        return Withdrawal::create([
            'id' => uuid_create(),
            'transaction_id' => $data['trans_id'],
            'user_id' => Auth::id(),
            'amount' => $data['amount'],
            'delivery_email' => $data['delivery_email'],
        ]);
    }
}