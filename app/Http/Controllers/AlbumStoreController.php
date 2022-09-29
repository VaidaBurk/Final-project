<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\OrderMail;

class AlbumStoreController extends Controller
{
    public function index()
    {
        return Inertia::render('Albums/AlbumStore', [
            'albums' => Album::with('artist:id,title')->get(),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function basket()
    {
        return Inertia::render('Albums/BasketPage', [
            'csrf_token' => csrf_token(),
        ]);
    }

    public function buy(Request $request)
    {
        $basket = $request->basket;
        $orderId = OrderController::createOrder($basket);

        foreach($basket as $item){
            Album::where('id', $item['id'])->update(['stock_quantity' => $item['stockQuantity']]);
        }

        Mail::to(Auth::user())->send(new OrderMail($orderId));
    }
}
