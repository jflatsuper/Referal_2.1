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

Auth::routes();
Route::middleware(['auth', 'isUser'])->group(function () {
  Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
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
  Route::get('/getAllUsers', [App\Http\Controllers\Users\UserController::class, 'getAllUsers']);
  Route::get('/getAllVendors', [App\Http\Controllers\Users\UserController::class, 'getAllVendors']);
  Route::get('/getAllVendorCodes', [App\Http\Controllers\Vendor\VendorController::class, 'getAllVendorCodes']);
  Route::post('/createVendorCodes', [App\Http\Controllers\Vendor\VendorController::class, 'createVerificationCodes']);
});