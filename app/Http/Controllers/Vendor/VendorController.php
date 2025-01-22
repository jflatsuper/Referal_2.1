<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VendorCode;
use DB;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    protected $specificFields = ['first_name','username', 'surname', 'email', 'link', 'account_status', 'id','created_at'];
    //
    public function vendorPage()
    {
        $vendorData=User::where(['user_type'=>'vendor','account_status'=>'active'])->get($this->specificFields);
        return view('vendor')->with(['vendor'=>$vendorData]);
    }
    public function getAllVendorCodes()
    {
        return VendorCode::where('status',false)->get();

    }
    public function createVerificationCodes(Request $request)
    {
        $number = $request->number ?? 1;
        $vendor = $request->vendor;
        DB::transaction(function () use ($number, $vendor) {
            for ($i = 0; $i < $number; $i++) {
                VendorCode::create([
                    'id' => uuid_create(),
                    'vendor_id' => $vendor,
                    'verif_code' => $vendor . '-' . uuid_create()
                ]);
                # code...
            }
        });


    }
}