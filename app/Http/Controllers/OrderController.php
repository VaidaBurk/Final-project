<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public static function createOrder($basket): int
    {
        $order = new Order();
        $order->user_id = Auth::id();
        $order->save();

        foreach ($basket as $item) {
            $orderItem = new OrderItem();
            $orderItem->product_id = $item['id'];
            $orderItem->order_id = $order->id;
            $orderItem->quantity = $item['quantity'];
            $orderItem->save();
        }

        return $order->id;
    }

    public function showOrder(Request $request)
    {
        $query = $request->query;
        if (isset($query['id'])) {
            $id = $query['id'];
            $order = Order::where('id', $id)->first();

            if (!($order->user_id === Auth::id())) {
                return redirect('/');
            }

            $email = DB::table('users')->where('id', '=', $order->user_id)->select('email')->get()->first()->email;
            $order->user_email = $email;
            $orderItems = OrderItem::where('order_id', $id)->get();
            
            return view('order', ['order' => $order, 'order_items' => $orderItems]);
        }
    }
}
