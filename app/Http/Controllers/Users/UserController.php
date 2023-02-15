<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Withdrawal;
use Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;

class UserController extends Controller
{
    protected $specificFields = ['first_name','username', 'surname', 'email', 'link', 'account_status','user_type', 'id','created_at'];
    public function getAllUsers(Request $request)
    {

        $users = User::whereNot('user_type', 'superAdmin')->get();
        return $users->makeHidden("password");
    }

    public function getTenUsers(Request $request){
        $users=User::whereNot('user_type', 'superAdmin')->orderBy('created_at', 'desc')->paginate();
        return response()->json($users);

    }
    public function searchForUser(Request $request){
    $users=User::whereNot('user_type', 'superAdmin')->where('username','LIKE',$request->name)->get();
    return response()->json($users);

    }
    public function blockUser(Request $request){

    }
    public function changeAccountType(Request $request){
        
    }
    public function getSiteStats()
    {
        $users = User::whereNot('user_type', 'superAdmin')->count();
        $compWith = Withdrawal::where('complete', true)->count();
        $pendingWith = Withdrawal::where('complete', false)->count();
        $balance = Account::where('user_id', Auth::id())->first();
        return response()->json(['users' => $users, 'completed' => $compWith, 'pending' => $pendingWith, 'account' => $balance]);
    }
    public function getCurrentUser()
    {
        return response()->json(Auth::user()->makeHidden('password'));
    }
    public function getAllVendors(Request $request)
    {

        $users = User::where('user_type', 'vendor')->get($this->specificFields);
        return response()->json($users);
    }
    public function getUserWithReferals()
    {
        $user_referees = DB::table('users')
            ->where('users.id', Auth::id())
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->leftJoin('referals', 'users.id', '=', 'referals.referee')
            ->limit(10)
            ->leftJoin('users AS referred', 'referals.referal', '=', 'referred.id')
            ->select(
                'referals.referee as MAINID',
                'users.*',
                'accounts.*',
                'referred.first_name AS refFirstName',
                'referred.surname AS refSurname',
                'referred.created_at AS refcreated',
                'referred.username AS refUsername'
            )
            ->groupBy('refUsername')
            ->get();
        return response()->json($user_referees);

    }
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => ['string', 'max:255'],
            'surname' => ['string', 'max:255'],
            'phone' => ['string'],

        ]);
    }
    public function editUser(Request $request)
    {
        $validatedData = $this->validator($request->all());
        if ($validatedData->fails()) {
            return response()->json($validatedData);

        }
        $edited = $this->edit($request->all());
        return response()->json($edited);
    }
    protected function edit(array $data)
    {
        return User::where('id', Auth::id())->update([
            'first_name' => $data['first_name'],
            'surname' => $data['surname'],
            'phone' => $data['phone']
        ]);
    }

//
}