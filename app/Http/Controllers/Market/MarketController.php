<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Controller;
use App\Models\Market;
use Auth;
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
            'transaction_id' => ['required', 'string'],
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
            $value = $this->create($data);
            return response()->json($value);

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