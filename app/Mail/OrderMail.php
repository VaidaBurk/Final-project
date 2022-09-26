<?php

namespace App\Mail;

use App\Models\Album;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    private $order, $orderedAlbums;

    public function __construct(int $orderId)
    {
        $order = Order::where("id", $orderId)->first();

        // checking if user owns the order, if not, he is redirected to main page
        if (!($order->user_id === Auth::id())) {
            // return Redirect::route("products");
            return redirect("/");
        }

        $email = DB::table("users")->where('id', '=', $order->user_id)->select("email")->get()->first()->email;
        $order->user_email = $email;
        $orderItems = OrderItem::where("order_id", $orderId)->get();
        $orderedAlbums = [];
        
        foreach($orderItems as $orderItem) {
            $album = Album::where("id", $orderItem->product_id)->get()->first();
            $orderAlbum = (object)[];
            $orderAlbum->id = $album->id;
            $orderAlbum->title = $album->title;
            $orderAlbum->quantity = $orderItem->quantity;
            array_push($orderedAlbums, $orderAlbum);
        }

        $this->order = $order;
        $this->orderedAlbums = $orderedAlbums;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('order', ["order" => $this->order, "order_items" => $this->orderedAlbums]);
    }
}

//php artisan make:mail Order
