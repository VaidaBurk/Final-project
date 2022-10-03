import React from "react";
import Col from 'react-bootstrap/Col';
import AddToBasketButton from "./AddToBasketButton";
import Card from 'react-bootstrap/Card';
import NBT from '../../images/NBT.jpg';

export default function AlbumStoreItem({ album, addToBasket }) {

    return (
        <Col xxl={2} xl={3} lg={3} md={4} sm={6}>
            <Card key={album.id} className="storeItem mx-2 my-4 border-0 rounded-0">
                <Card.Img variant="top" src={NBT} className='rounded-0 pb-2 bg-gray-100'/>
                <AddToBasketButton stock_quantity={album.stock_quantity} itemId={album.id} addToBasket={addToBasket}></AddToBasketButton>
                <Card.Body className='bg-gray-100 p-0 pt-3'>
                    <Card.Title className='font-monospace fw-bold fs-6 uppercase'>{album.artist.title}:</Card.Title>
                    <Card.Title className='font-monospace fw-bold fs-6'>{album.title}</Card.Title>
                    <Card.Text>
                        <div className="font-monospace">EUR {album.price}</div>
                        {album.stock_quantity > 0 &&
                            <div className="font-monospace">{album.stock_quantity} in stock</div>
                        }
                        {album.stock_quantity == 0 &&
                            <div className="font-monospace">Out of stock</div>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
