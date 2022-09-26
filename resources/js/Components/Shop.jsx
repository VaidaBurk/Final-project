import React, { useState } from "react";
import { usePage } from '@inertiajs/inertia-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "./Dropdown";
import AlbumTableRow from "@/Components/AlbumTableRow";

export default function AlbumTable({ albums, artists }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    //const { data, setData, patch, processing, reset, errors } = useForm({ title: title, artist_id: album.artist_id, release_date: album.release_date, price: album.price, stock_quantity: album.stock_quantity });

    return (
        <Container>
                <div className="p-3 bg-white shadow-sm rounded-lg divide-y">
                    <Row className="p-1 rounded-top mx-3 fw-bolder">
                        <Col sm={1}>ID</Col>
                        <Col sm={2}>Title</Col>
                        <Col sm={2} className='text-center'>Release date</Col>
                        <Col sm={3}>Artist</Col>
                        <Col sm={1} className='text-center'>Price</Col>
                        <Col sm={2} className='text-center'>Stock quantity</Col>
                        <Col sm={1}></Col>
                    </Row>
                    {albums.map(album =>
                        <AlbumTableRow album={album} artists={artists} key={album.id}></AlbumTableRow>
                    )}
                </div>   
        </Container>
    )
}