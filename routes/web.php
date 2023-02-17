<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('welcome');
});
Route::get('/about', function () {
  return view('about');
})->name('about');

Route::get('/vendors', [App\Http\Controllers\Vendor\VendorController::class, 'vendorPage'])->name('vendors');

Route::get('/t&c', function () {
  return view('terms');
})->name('terms');
Route::get('/faq', function () {
  return view('faq');
})->name('faq');



Auth::routes();
Route::middleware(["auth"])->group(function () {
  Route::get('/getAllUserTransactions', [App\Http\Controllers\Transactions\TransactionController::class, 'getAllUserTransactions']);
  Route::get('/getCurrentUser', [App\Http\Controllers\Users\UserController::class, 'getCurrentUser']);
  Route::get('/getUserWithReferals', [App\Http\Controllers\Users\UserController::class, 'getUserWithReferals']);

  Route::get('/getAllAdvertisements', [App\Http\Controllers\Market\MarketController::class, 'getAllAdvertisements']);
  Route::get(
    '/getUserAccount',
    [App\Http\Controllers\Account\AccountController::class, 'getUserWithAccountDetails']
  );
  Route::post('/createAdvertisement', [App\Http\Controllers\Market\MarketController::class, 'createAdvertisement']);
  Route::post(
    '/editAccount',
    [App\Http\Controllers\Account\AccountController::class, 'editAccount']
  );

  Route::post('/editUser', [App\Http\Controllers\Users\UserController::class, 'editUser']);
});
Route::middleware(['auth', 'isUser'])->group(function () {
  Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
  Route::get(
    '/withdrawals',
    function () {
      return view('users.withdrawal');
    }

  )->name('withdrawals');
  Route::get('/dailyBonus', [App\Http\Controllers\Market\MarketController::class, 'dailyBonus']);
  Route::get('/getWithdrawalDetails', [App\Http\Controllers\Withdrawal\WithdrawalController::class, 'getWithdrawalDetails'])->name('getWithdrawalDetails');
  Route::post('/createWithdrawal', [App\Http\Controllers\Withdrawal\WithdrawalController::class, 'createWithdrawal'])->name('createWithdrawal');

  Route::get(
    '/transactions',
    function () {
      return view('users.transaction');
    }
  )->name('transactions');
  ;
  Route::get(
    '/affiliate',
    function () {
      return view('users.affiliate');
    }
  )->name('affiliate');
  ;
  Route::get(
    '/e_learning',
    function () {
      return view('users.elearning');
    }
  )->name('elearning');
  ;
  Route::get(
    '/account',
    function () {
      return view('users.settings');
    }
  )->name('settings');
  Route::get(
    '/market',
    function () {
      return view('users.market');
    }
  )->name('market');


});


Route::middleware(['auth', 'isAdmin'])->group(function () {
  Route::get(
    '/admin',
    function () {
      return view('admin.dashboard');
    }
  )->name('dashboard');
  Route::get(
    '/admin/vendor_management',
    function () {
      return view('admin.vendor');
    }
  )->name('ad_vendor');
  Route::get(
    '/admin/transactions',
    function () {
      return view('admin.transactions');
    }
  )->name('ad_transactions');
  Route::get(
    '/admin/withrawalRequests',
    function () {
      return view('admin.with_request');
    }
  )->name('withdrawal_request');
  Route::get(
    '/admin/users',
    function () {
      return view('admin.user_manage');
    }
  )->name('user_management');
  Route::get(
    '/admin/notifications',
    function () {
      return view('admin.notifications');
    }
  )->name('notifications');

Route::get('/getNotifications', [App\Http\Controllers\Notifications\NotificationController::class, 'getNotifications']);
Route::get('/getMostRecent', [App\Http\Controllers\Notifications\NotificationController::class, 'getMostRecent']);
Route::post('/createNotification', [App\Http\Controllers\Notifications\NotificationController::class, 'createNotification']);
  Route::post('/blockUser', [App\Http\Controllers\Users\UserController::class, 'blockUser']);
  Route::post('/changeAccountType', [App\Http\Controllers\Users\UserController::class, 'changeAccountType']);
  Route::get('/getAllValidWithdrawalRequests', [App\Http\Controllers\Withdrawal\WithdrawalController::class, 'getAllValidWithdrawalRequests'])->name('getAllValidWithdrawalRequests');
  Route::get('/getTenUsers', [App\Http\Controllers\Users\UserController::class, 'getTenUsers']);
  Route::get('/getSearchedUser', [App\Http\Controllers\Users\UserController::class, 'searchForUser']);
  Route::get('/getAllUsers', [App\Http\Controllers\Users\UserController::class, 'getAllUsers']);
  Route::get('/getSiteStats', [App\Http\Controllers\Users\UserController::class, 'getSiteStats']);
  Route::get('/getAllVendors', [App\Http\Controllers\Users\UserController::class, 'getAllVendors']);
  Route::get('/getAllVendorCodes', [App\Http\Controllers\Vendor\VendorController::class, 'getAllVendorCodes']);
  Route::post('/createVendorCodes', [App\Http\Controllers\Vendor\VendorController::class, 'createVerificationCodes']);
});