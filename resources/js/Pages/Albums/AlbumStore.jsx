import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NotAuthenticatedLayout from '@/Layouts/NotAuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import AlbumStoreItem from "@/Components/AlbumStoreItem";
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";


export default function AlbumStore({ auth, albums, csrf_token }) {

    const [albumsLeft, setItems] = useState(null);

    useEffect(() => {
        if (albumsLeft !== null) {
            return;
        }

        let itemsInStorage = JSON.parse(sessionStorage.getItem('albumsLeft'));
        if (itemsInStorage === null) {
            itemsInStorage = albums;
        }
        setItems(itemsInStorage);
    }, []);

    const addToBasket = (id) => {
        let basket = JSON.parse(sessionStorage.getItem('basket'));
        if (basket === null) {
            basket = [];
        }

        let itemInBasket = basket.find((item) => {
            return item.id == id;
        })

        const albumsUpdated = [...albums];
        const item = albumsUpdated.find((item) => {
            return item.id == id;
        })

        item.stock_quantity--;
        if (itemInBasket === undefined) {
            const title = albums.find((item) => {
                return item.id === id;
            }).title;

            const price = albums.find((item) => {
                return item.id === id;
            }).price;

            itemInBasket = { id: id, title: title, quantity: 1, stockQuantity: item.stock_quantity, price: price }
            basket.push(itemInBasket);
        }
        else {
            itemInBasket.quantity++;
            itemInBasket.stockQuantity--;
        }

        setItems(albumsUpdated);

        sessionStorage.setItem('albumsLeft', JSON.stringify(albumsUpdated));
        sessionStorage.setItem('basket', JSON.stringify(basket));
    }

    return (
        <>
        {auth.user == null &&
            <NotAuthenticatedLayout auth={auth} header={''} csrf_token={csrf_token} >
                <Head title="Shop" />
                <div className="max-w-3x1 mx-10 md:mx-10 sm:mx-5 p-4 sm:p-6 lg:p-8">
                    {(albumsLeft == undefined)
                        ?
                        <Row>
                            {albums.map(album =>
                                <AlbumStoreItem album={album} addToBasket={addToBasket} />)
                            }
                        </Row>
                        :
                        <Row>
                            {albumsLeft.map(album =>
                                <AlbumStoreItem album={album} addToBasket={addToBasket} />)
                            }
                        </Row>
                    }
                </div>
            </NotAuthenticatedLayout>
        }
        
        {auth.user &&
            <AuthenticatedLayout auth={auth} header={''} csrf_token={csrf_token} >
                <div className="max-w-3x1 mx-10 md:mx-10 sm:mx-5 p-4 sm:p-6 lg:p-8">
                    {(albumsLeft == undefined)
                        ?
                        <Row>
                            {albums.map(album =>
                                <AlbumStoreItem album={album} addToBasket={addToBasket} />)
                            }
                        </Row>
                        :
                        <Row>
                            {albumsLeft.map(album =>
                                <AlbumStoreItem album={album} addToBasket={addToBasket} />)
                            }
                        </Row>
                    }
                </div>
            </AuthenticatedLayout>
        }
        </>
    )
}