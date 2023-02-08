<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
use App\Models\Market;
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
            'transaction_id' => ['required'],
            'link' => ['string']
        ]);
    }
    public function getAllAdvertisements()
    {
        $date = today()->format('Y-m-d');
        $advertisements = Market::where('expiry_date','>=',$date)->get();
        return response()->json($advertisements);
    }
    public function createAdvertisement(Request $data)
    {
        $validatedData = $this->validator($data->all());

        if ($validatedData->fails()) {
            return redirect()->back()->withErrors($validatedData);
            #return to register page if validation fails
        } else {
            $uploadedFileUrl = \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::upload($data->file('file')->getRealPath(), array("folder" => "eazyearn", "overwrite" => TRUE, "resource_type" => "image"));
            $image = ['path' => $uploadedFileUrl->getSecurePath(), 'public_id' => $uploadedFileUrl->getPublicId()];
            $eazyearn = User::where('username', 'eazyearn')->first()->id;
            $success = DB::transaction(function () use ($data, $eazyearn, $image) {
                $trans = new TransactionController();
                $trans->createTransaction([
                    'transaction_id' => $data['transaction_id'],
                    'user_id' => $eazyearn,
                    'amount' => 10000,
                    'status' => config('enums.transaction_status')['SUC'],
                    'transaction_type' => config('enums.transaction_types')['AD']
                ]);
                Account::where("user_id", $eazyearn)->increment('money_balance', 10000);
                $trans->createTransaction([
                    'transaction_id' => $data['transaction_id'],
                    'user_id' => Auth::id(),
                    'amount' => -10000,
                    'status' => config('enums.transaction_status')['SUC'],
                    'transaction_type' => config('enums.transaction_types')['AD']
                ]);

                $value = $this->create($data->all() + ["image" =>json_encode($image) ]);
                return $value;
            });
            return response()->json($success);


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
            'active' => true,
            'approved' => true,
            'image'=>$data['image'],
            "transaction_id" => $data['transaction_id'],
            'link' => $data['link'],
            'expiry_date' => $date

        ]);
    }
}