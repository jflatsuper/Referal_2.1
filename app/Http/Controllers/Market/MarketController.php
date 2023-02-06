<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Market;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Validator;

class MarketController extends Controller
{
    //
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'transaction_id' => ['required'],
            'link' => ['string']
        ]);
    }
    public function getAllAdvertisements()
    {
        $advertisements = Market::get();
        return response()->json($advertisements);
    }
    public function createAdvertisement(Request $data)
    {
        $validatedData = $this->validator($data->all());

        if ($validatedData->fails()) {
            return redirect()->back()->withErrors($validatedData);
            #return to register page if validation fails
        } else {
            $eazyearn = User::where('username', 'eazyearn')->first()->id;
            $success = DB::transaction(function () use ($data, $eazyearn) {
                $trans = new TransactionController();
                $account = new AccountController();
                $trans->createTransaction([
                    'transaction_id' => $data['transaction_id'],
                    'user_id' => $eazyearn,
                    'amount' => 2000,
                    'status' => config('enums.transaction_status')['SUC'],
                    'transaction_type' => config('enums.transaction_types')['AD']
                ]);
                $account->where("user_id", $eazyearn)->increment('money_balance', 2000);
                $trans->createTransaction([
                    'transaction_id' => $data['transaction_id'],
                    'user_id' => Auth::id(),
                    'amount' => -2000,
                    'status' => config('enums.transaction_status')['SUC'],
                    'transaction_type' => config('enums.transaction_types')['AD']
                ]);
                $value = $this->create($data);
                return $value;
            });
            return response()->json($success);


        }
    }
    protected function create(Request $data)
    {
        return Market::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'description' => $data['description'],
            'active' => true,
            'approved' => true,
            "transaction_id" => $data['transaction_id'],
            'link' => $data['link']

        ]);
    }
}