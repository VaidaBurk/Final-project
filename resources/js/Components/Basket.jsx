import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default function Basket({csrf_token}) {
    
    if (sessionStorage.getItem("basket") === null) {
        sessionStorage.setItem("basket", JSON.stringify([]));
    }
    
    const [items, changeProducts] = useState(JSON.parse(sessionStorage.getItem("basket")));
    const [token, setToken] = useState();
    
    const clearBasket = () => {
        sessionStorage.setItem("basket", JSON.stringify([]));
        changeProducts([]);
        sessionStorage.removeItem("albums");
        sessionStorage.removeItem('albumsLeft');
        window.location.reload();
    }
    
    const onBuy = () => {
        // axios.post("http://127.0.0.1:8000/buy", { "basket": items })
        // .then( response => console.log(response))
        // .catch(error => console.log(error));
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append('X-CSRF-TOKEN', csrf_token);
        //headers.append("X-CSRF-TOKEN", csrf_token);
        fetch("http://127.0.0.1:8000/buy", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "basket": items })
        }).then((response) => {
            response.json().then((body) => {
                alert(body);
                clearBasket();
            })
        });
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
        <div className="container px-4 py-3">
            <Table bordered hover variant='dark' className="shadow font-monospace">
                <tbody>
                    {items.map((album) => {
                        return (
                            <tr key={album.id}>
                                <td className="">{album.title}</td>
                                <td><FontAwesomeIcon icon={faMinus} /></td>
                                <td className="">{album.quantity}</td>
                                <td><FontAwesomeIcon icon={faPlus} /></td>
                                <td>
                                    <a onClick={() => { removeProductFromBasket(album.id) }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                </td>
                            </tr>)
                    })
                    }

                </tbody>
            </Table>
            <div className="mt-3">
                <button className="btn btn-outline-dark btn-sm mr-2 uppercase" onClick={onBuy}>Buy</button>
                <button className="btn btn-light btn-sm uppercase" onClick={clearBasket}>Clear</button>
            </div>

        </div>
    )
}