<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Referee;
use App\Models\Transaction;
use App\Models\VendorCode;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'username' => ['required', 'string', 'min:5', 'unique:users'],
            'vend_code' => [
                'required',
                'string',
                'exists:verification,verif_code',
            ],
            'ref_code' => ['string', 'nullable'],
            'link' => ['string', 'nullable']
        ]);
    }
    public function register(Request $data)
    {
        $TOTAL = 2900; //total amount coming into system from registration
        $value = $data['vend_code'];
        $validatedData = $this->validator($data->all());

        if ($validatedData->fails()) {
            return redirect()->back()->withErrors($validatedData);
            #return to register page if validation fails
        } else {
            //check if the status of the verification code is used
            $validity = VendorCode::where('verif_code', $value)->first()->status;

            if ($validity) {
                //if used, return to register page with error
                return redirect()->back()->withErrors([
                    'vend_code' => 'This code has already been used!'
                ]);
            } else {
                //if new,find the user referring the individual--defaults to eazyearn
                $eazyearn = User::where('username', 'eazyearn')->first()->id;
                $referee = User::where('username', explode('-', $data->ref_code ?? 'eazyearn')[0])->first()->id;
                DB::transaction(function () use ($data, $value, $referee, $TOTAL, $eazyearn) {
                    //1.Create new user 
                    $this->create($data->all());
                    $new_user = User::where('username', $data->username)->first()->id;
                    //2. create new user account balances
                    $this->createAccount([
                        'id' => uuid_create(),
                        'user_id' => $new_user,
                        'point_balance' => 2000
                    ]);
                    $this->createTransaction([
                        'user_id' => $new_user,
                        'amount' => 2000,
                        'status' => config('enums.transaction_status')['SUC'],
                        'type' => config('enums.transaction_types')['POI'],
                        'currency' => config('enums.currency')['P']
                    ]);
                    //3. Deposit total amount into eazyearn
                    $this->createTransaction([
                        'user_id' => $eazyearn,
                        'amount' => $TOTAL,
                        'status' => config('enums.transaction_status')['SUC'],
                        'type' => config('enums.transaction_types')['DEP'],
                        'currency' => config('enums.currency')['N']
                    ]);
                    Account::where("user_id", $eazyearn)->increment('money_balance', $TOTAL);

                    //4. Create transaction to deposit into referrer account if referral exists
                    if ($data->ref_code) {
                        $trans_id = uuid_create();
                        $this->createTransaction([
                            'trans_id' => $trans_id,
                            'user_id' => $referee,
                            'amount' => 2200,
                            'status' => config('enums.transaction_status')['SUC'],
                            'type' => config('enums.transaction_types')['REF'],
                            'currency' => config('enums.currency')['N']
                        ]);
                        $this->createTransaction([
                            'trans_id' => $trans_id,
                            'user_id' => $eazyearn,
                            'amount' => -2200,
                            'status' => config('enums.transaction_status')['SUC'],
                            'type' => config('enums.transaction_types')['PAY'],
                            'currency' => config('enums.currency')['N']
                        ]);
                        //4.1 deposits into user acc
                        Account::where("user_id", $referee)->increment('money_balance', 2200);
                        //4.2 removes from eazyearn account
                        Account::where("user_id", $eazyearn)->decrement('money_balance', 2200);
                    }
                    //5. Create transaction to deposit into indirect referrer account if referer exists
                    $secondaryReferrer = Referee::where(['referal' => $referee])->first();
                    if ($secondaryReferrer && $secondaryReferrer->referee && $secondaryReferrer->referee != $eazyearn) {
                        $trans_id = uuid_create();
                        $this->createTransaction([
                            'trans_id' => $trans_id,
                            'user_id' => $secondaryReferrer->referee,
                            'amount' => 100,
                            'status' => config('enums.transaction_status')['SUC'],
                            'type' => config('enums.transaction_types')['IND']
                        ]);
                        $this->createTransaction([
                            'trans_id' => $trans_id,
                            'user_id' => $eazyearn,
                            'amount' => -100,
                            'status' => config('enums.transaction_status')['SUC'],
                            'type' => config('enums.transaction_types')['PAY']
                        ]);
                        //5.1 deposits into user acc
                        Account::where("user_id", $secondaryReferrer->referee)->increment('money_balance', 100);
                        //5.2 removes from eazyearn account
                        Account::where("user_id", $eazyearn)->decrement('money_balance', 100);
                    }
                    //6. createReferal record
                    $this->createReferee([
                        'referee' => $referee,
                        'referal' => $new_user
                    ]);
                    //7. updates the vendor code to used
                    VendorCode::where('verif_code', $value)->update(['status' => true, "user_id" => $new_user]);

                });

                $auth = Auth::attempt(['username' => $data->username, 'password' => $data->password]);
                if ($auth) {
                    return view('home');

                } else {
                    return view('welcome');
                }

            }
        }

    }
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {


        return User::create([
            'first_name' => $data['name'],
            'surname' => $data['surname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'username' => $data['username'],
            'ref_link' => $data['username'] . '-' . random_int(3000, 5000) * random_int(1, 1.9),
            'link' => $data['link'] ?? null

        ]);
    }
    protected function createReferee(array $data)
    {
        return Referee::create([
            'referee' => $data['referee'],
            'referal' => $data['referal'],
        ]);
    }
    protected function createAccount(array $data)
    {
        return Account::create([
            'id' => $data['id'],
            'user_id' => $data['user_id'],
            'money_balance' => 0,
            'point_balance' => $data['point_balance'] ?? 0
        ]);

    }
    protected function createTransaction(array $data)
    {
        return Transaction::create([
            'transaction_id' => $data['trans_id'] ?? uuid_create(),
            'user_id' => $data["user_id"],
            'amount' => $data['amount'],
            'status' => $data["status"],
            'transaction_type' => $data['type'],
            'currency' => $data['currency'] ?? config('enums.currency')['N']
        ]);
    }
}