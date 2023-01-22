<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\VendorCode;
use DB;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    //
    public function getAllVendorCodes()
    {
        return VendorCode::get();

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