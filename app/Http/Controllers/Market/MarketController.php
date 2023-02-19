<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
use App\Models\Market;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use DateInterval;
use DateTime;
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
            'transaction_id' => ['string','nullable'],
            'link' => ['string']
        ]);
    }
    public function getAllAdvertisements()
    {
        $date = today()->format('Y-m-d');
        $advertisements = Market::where('expiry_date', '>=', $date)->where('approved',true)->get();
        return response()->json($advertisements);
    }
    public function getAllAdvertisementsAd()
    {
        $date = today()->format('Y-m-d');
        $advertisements = Market::where('expiry_date', '>=', $date)->where('approved',false)->get();
        return response()->json($advertisements);
    }
    public function createAdvertisement(Request $data)
    {
        $validatedData = $this->validator($data->all());

        if ($validatedData->fails()) {
            return redirect()->back()->withErrors($validatedData);
            #return to register page if validation fails
        } else {
            $image='';
            if($data->file('file')){
                $uploadedFileUrl = \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::upload($data->file('file')->getRealPath(), array("folder" => "eazyearn", "overwrite" => TRUE, "resource_type" => "image"));
                $image = ['path' => $uploadedFileUrl->getSecurePath(), 'public_id' => $uploadedFileUrl->getPublicId()];
            }
                $value = $this->create($data->all() + ["image" => json_encode($image)]);
                
            return response()->json($value);


        }
    }
    public function approveAdvertisement(Request $request)
    {
        $eazyearn = User::where('username', 'eazyearn')->first()->id;
        $success = DB::transaction(function () use ($eazyearn, $request) {
            $nextWeek = time() + (7 * 24 * 60 * 60);
            $date = date('Y-m-d', $nextWeek);
            Market::where('id', $request->id)->update(['approved' => true, 'active' => true, "expiry_date" => $date]);
            $trans = new TransactionController();
            $id = uuid_create();
            $trans->createTransaction([
                'transaction_id' => $id,
                'user_id' => $eazyearn,
                'amount' => 10000,
                'status' => config('enums.transaction_status')['SUC'],
                'transaction_type' => config('enums.transaction_types')['AD']
            ]);
            Account::where("user_id", $eazyearn)->increment('money_balance', 10000);
            $trans->createTransaction([
                'transaction_id' => $id,
                'user_id' => Auth::id(),
                'amount' => -10000,
                'status' => config('enums.transaction_status')['SUC'],
                'transaction_type' => config('enums.transaction_types')['AD']
            ]);
            return true;
        });
        return response()->json($success);
    }
    public function dailyBonus()
    {
        $date = today()->format('Y-m-d');
        $todaysTrans = Transaction::where('user_id', Auth::id())->where('transaction_type', config('enums.transaction_types')['DAL'])->where('created_at', '>=', $date)->exists();
        if (!$todaysTrans) {
            DB::transaction(function () {
                $trans = new TransactionController();
                $trans->createTransaction([
                    'transaction_id' => uuid_create(),
                    'user_id' => Auth::id(),
                    'amount' => 500,
                    'currency' => config('enums.currency')['P'],
                    'status' => config('enums.transaction_status')['SUC'],
                    'transaction_type' => config('enums.transaction_types')['DAL']
                ]);
                Account::where("user_id", Auth::id())->increment('point_balance', 500);
                return response()->json(['successful' => true]);
            });
            return response()->json(['successful' => false]);

        }
    }
    protected function create(array $data)
    {
        $nextWeek = time() + (7 * 24 * 60 * 60);
        $date = date('Y-m-d', $nextWeek);
        return Market::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'description' => $data['description'],
            'image' => $data['image'],
            "transaction_id" => uuid_create(),
            'link' => $data['link'],
            'expiry_date' => $date

        ]);
    }
}