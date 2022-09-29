import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Basket from '@/Components/Basket';
import { Head } from '@inertiajs/inertia-react';
import BuyButton from "@/Components/BuyButton";
import TotalPrice from "@/Components/TotalPrice";
import { useState } from "react";

export default function BasketPage({ auth, csrf_token }) {

    let basket = JSON.parse(sessionStorage.getItem("basket"));
    const totalPrice = countTotalPrice(basket);

    const [items, setItems] = useState(JSON.parse(sessionStorage.getItem("basket")));
    const [message, setMessage] = useState();

    function countTotalPrice(basket) {
        let totalPrice = 0;
        basket.forEach(album => {
            let price = album.quantity * album.price;
            totalPrice += price;
        });
        return totalPrice.toFixed(2);
    }

    const onBuy = () => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append('X-CSRF-TOKEN', csrf_token);
        fetch("http://127.0.0.1:8000/buy", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "basket": items })
        }).then((response) => {
                if (response.status == 200) {
                    setMessage('Thanks for buying! Order confirmation is sent to your mail.');
                    clearBasket();
                }
            })
    }

    const clearBasket = () => {
        sessionStorage.setItem("basket", JSON.stringify([]));
        setItems([]);
        sessionStorage.removeItem('albums');
        sessionStorage.removeItem('albumsLeft');
    }

    const actionButtons = (clearBasket) => {
        return (<>
        <TotalPrice totalPrice={totalPrice}></TotalPrice>
        <button className="btn btn-light btn-sm uppercase" onClick={clearBasket}>Clear</button>
        </>
        );
    };

    return (
    <AuthenticatedLayout auth={auth} csrf_token={csrf_token}>
        <Head title="Basket" />
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-center font-monospace mt-5">Basket</h2>
            <Basket auth={auth} 
                    csrf_token={csrf_token} 
                    items={items}
                    actionButtons={<button disabled={items.length == 0} className="btn btn-outline-dark btn-sm mr-2 uppercase" onClick={onBuy}>Buy</button>} 
                    extras={<TotalPrice totalPrice={totalPrice}></TotalPrice>}
                    >
            </Basket>
            <h6 className="text-center font-monospace mt-5">{message}</h6>
        </div>
    </AuthenticatedLayout>
    )

}