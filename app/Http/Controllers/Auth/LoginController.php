<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Storage;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;
    public function login(Request $request)
    {
        $blocked = User::where('username', $request->username)->first()->account_status;
        if ($blocked === 'blocked') {
            return redirect()->back()->withErrors([
                'username' => 'Your account has been blocked. Contact the admin'
            ]);

        }
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            // Authentication passed...
            Storage::disk('local')->put('user', Auth::user());
            $direction = $this->redirectTo();
            return redirect()->intended($direction);
        } else {
            return redirect()->back()->withErrors([
                'password' => 'Invalid Password'
            ]);
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected function redirectTo()
    {
        if (Auth::user()->user_type == 'superAdmin') {
            return 'admin'; // admin dashboard path
        } else {
            return 'home'; // member dashboard path
        }
    }
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}