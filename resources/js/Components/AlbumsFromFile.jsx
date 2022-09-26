import React, { useState } from "react";
import { usePage } from '@inertiajs/inertia-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumTableRow from "@/Components/AlbumTableRow";

export default function AlbumsFromFile({filename}) {
    
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch("http://127.0.0.1:8000/readfromfile", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({filename})
        }).then(function (response) {
            response.json().then(albums => {
                console.log(albums);
            })
        })

    return (
        <div className="p-3 bg-white shadow-sm rounded-lg divide-y">
            {/* <Row className="p-1 rounded-top mx-3 fw-bolder">
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
            )} */}
        </div>
    )
}