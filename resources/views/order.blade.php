<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order confirmation</title>
</head>

<body>
    <h3>Order {{ $order->id }} is confirmed!</h3>
            @foreach ($order_items as $item)
                <h4>Title: {{$item->title}}</h4>
                <h4>Quantity: {{$item->quantity}}</h4>
            @endforeach

  </body>
</body>

</html>