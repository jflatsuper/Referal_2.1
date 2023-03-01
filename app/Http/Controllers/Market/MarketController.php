<?php

namespace App\Http\Controllers\Market;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Transactions\TransactionController;
use App\Models\Account;
use App\Models\Market;
use App\Models\Transaction;
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
            'transaction_id' => ['string','nullable'],
            'link' => ['string']
        ]);
    }
    public function getAllAdvertisements()
    {
        $date = today()->format('Y-m-d');
        $advertisements = Market::where('expiry_date', '>=', $date)->where('approved',true)->get()->sortByDesc('created_at')->values()->all();
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
            return response()->json(['status' => "Advert Placement Failure", 'message' => 'You provided invalid values to the system'], 444);

            #return to register page if validation fails
        } else {
            $image='';
            if($data->file){
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