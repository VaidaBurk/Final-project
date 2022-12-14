import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';
import TotalPrice from "@/Components/TotalPrice";

export default function Basket({ csrf_token, auth, actionButtons, extras }) {

    if (sessionStorage.getItem("basket") === null) {
        sessionStorage.setItem("basket", JSON.stringify([]));
    }

    const [items, setItems] = useState(JSON.parse(sessionStorage.getItem("basket")));
    const [message, setMessage] = useState();
    const totalPrice = countTotalPrice(items);

    function countTotalPrice(basket) {
        let totalPrice = 0;
        basket.forEach(album => {
            let price = album.quantity * album.price;
            totalPrice += price;
        });
        return totalPrice.toFixed(2);
    }

    const clearBasket = () => {
        sessionStorage.setItem("basket", JSON.stringify([]));
        setItems([]);
        sessionStorage.removeItem('albums');
        sessionStorage.removeItem('albumsLeft');
        //window.location.reload();
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
                clearBasket();
                setMessage('Thanks for buying! Order confirmation is sent to your mail.');
            }
        })
    }

    const removeProductFromBasket = (id) => {
        let basket = JSON.parse(sessionStorage.getItem("basket"));
        const albumInBasket = basket.find((album) => {
            return album.id == id;
        })

        const albumsUpdated = JSON.parse(sessionStorage.getItem("albumsLeft"));
        const album = albumsUpdated.find((album) => {
            return album.id === id;
        })

        album.stock_quantity += albumInBasket.quantity;
        basket = basket.filter(function (album) {
            return album.id !== id;
        })

        sessionStorage.setItem("albumsLeft", JSON.stringify(albumsUpdated));
        sessionStorage.setItem("basket", JSON.stringify(basket));
        window.location.reload();
    }

    return (
        <div className="px-4 py-3">
            <Table bordered hover variant='dark' className="shadow font-monospace">
                <tbody>
                    {items.map((album) => {
                        return (
                            <tr key={album.id}>
                                <td className="">{album.title}</td>
                                <td className="text-center">{album.quantity} x {album.price}</td>
                                <td className="text-center"><FontAwesomeIcon icon={faPlus} /></td>
                                <td className="text-center"><FontAwesomeIcon icon={faMinus} /></td>
                                <td className="text-center">
                                    <a onClick={() => { removeProductFromBasket(album.id) }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                </td>
                            </tr>)
                        })
                    }

                </tbody>
            </Table>
            <TotalPrice totalPrice={totalPrice}></TotalPrice>
            {extras}
            <div className="mt-3">
                {auth &&
                    <>
                        <button disabled={items.length == 0} className="btn btn-outline-dark btn-sm mr-2 uppercase" onClick={onBuy}>Buy</button>
                        {actionButtons}
                    </>
                }
                {!auth &&
                    <a className="btn btn-outline-dark btn-sm mr-2 uppercase" href="http://127.0.0.1:8000/login">Login to Buy</a>
                }
                <button className="btn btn-light btn-sm uppercase" onClick={clearBasket}>Clear</button>
            </div>
            <div className="text-center font-monospace mt-2 mb-0">{message}</div>
        </div>
    )
}