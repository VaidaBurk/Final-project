<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\AlbumStoreController;
use App\Http\Controllers\OrderController;
use App\Mail\OrderMail;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('artists', ArtistController::class)
    ->only(['index', 'store', 'update', 'destroy']);
    //reiks Auth veliau

Route::resource('albums', AlbumController::class)
    ->only(['index', 'store', 'update', 'destroy']);

Route::resource('shop', AlbumStoreController::class)
    ->only(['index']);

Route::post('/buy', [AlbumStoreController::class, 'buy']);

Route::post('/readfromfile', [AlbumController::class, 'readfromfile']);

Route::get('/albums/upload', function () {
    return Inertia::render('Albums/Upload');
})->name('upload');


require __DIR__ . '/auth.php';