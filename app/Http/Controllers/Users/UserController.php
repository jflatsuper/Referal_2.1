<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;

class UserController extends Controller
{
    protected $specificFields = ['first_name', 'surname', 'email', 'link', 'account_status', 'id'];
    public function getAllUsers(Request $request)
    {

        $users = User::whereNot('user_type', 'superAdmin')->get();
        return $users->makeHidden("password");
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
            ->join('referals', 'users.id', '=', 'referals.referee')
            ->limit(10)
            ->join('users AS referred', 'referals.referal', '=', 'referred.id')
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
            'email' => ['string'],

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
            'email' => $data['email']
        ]);
    }

//
}