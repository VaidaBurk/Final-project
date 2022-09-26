<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order confirmation</title>
</head>

<body>
    <h1>Order Id: {{ $order->id }}, User Id: {{ $order->user_id }}, User email: {{ $order->user_email }}</h1>
    @foreach ($order_items as $item)
    <div class="row mx-5 my-2">
        <div class="col-2">Product ID: {{$item->id}}</div>
        <div class="col-2">Product name: {{$item->title}}</div>
        <div class="col-2">Quantity: {{$item->quantity}}</div>
    </div>
    @endforeach
</body>

</html>