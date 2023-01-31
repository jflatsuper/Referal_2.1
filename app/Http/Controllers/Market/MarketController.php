<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Controller;
use App\Models\Market;
use Illuminate\Http\Request;

class MarketController extends Controller
{
    //
    public function getAllAdvertisements(){
        $advertisements = Market::get();
        return response()->json($advertisements);
    }
}
