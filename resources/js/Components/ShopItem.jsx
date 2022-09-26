import React, { useState } from "react";
import { usePage, useForm } from '@inertiajs/inertia-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "./Dropdown";
import PrimaryButton from "./PrimaryButton";

export default function AlbumTableRow({ album, artists }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, processing, reset, errors } = useForm({ title: album.title, artist_id: album.artist_id, release_date: album.release_date, price: album.price, stock_quantity: album.stock_quantity });

    const submit = (e) => {
        e.preventDefault();
        patch(route('albums.update', album.id), { onSuccess: () => setEditing(false) });
    }

    return (
        <Container>
            {editing
                ?
                <form onSubmit={submit}>
                    <Row className="mx-1 px-1 py-3" key={album.id}>
                        <Col sm={1} className='text-start'>{album.id}</Col>
                        <Col sm={2}>
                            <input className="form-control shadow-sm" value={data.title} onChange={e => setData('title', e.target.value)} />
                        </Col>
                        <Col sm={2} className='text-center'>
                            <input className="form-control shadow-sm" type="date" value={data.release_date} onChange={e => setData('release_date', e.target.value)} />
                        </Col>
                        <Col sm={3}>
                            <select aria-label="Select artist"
                                defaultValue={data.artist_id}
                                onChange={e => setData('artist_id', e.target.value)}
                                className="form-select text-gray-600 block w-full border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                                {artists.map(artist =>
                                    <option value={artist.id} key={artist.id}>{artist.title}</option>
                                )}
                            </select>
                        </Col>
                        <Col sm={2} className='text-center'>
                            <input className="form-control shadow-sm" type="number" value={data.price} onChange={e => setData('price', e.target.value)} />
                        </Col>
                        <Col sm={2} className='text-center'>
                            <input className="form-control shadow-sm" type="number" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} />
                        </Col>
                    </Row>
                    <div className="space-x-2">
                        <PrimaryButton className="mx-2 mb-6">Save</PrimaryButton>
                        <button className="mx-2" onClick={() => setEditing(false) && reset()}>Cancel</button>
                    </div>
                </form>
                :
                <Row className="mx-1 p-1" key={album.id}>
                    <Col sm={1} className='text-start'>{album.id}</Col>
                    <Col sm={2}>{album.title}</Col>
                    <Col sm={2} className='text-center'>{album.release_date}</Col>
                    <Col sm={3}>{album.artist.title}</Col>
                    <Col sm={1} className='text-center'>{album.price}</Col>
                    <Col sm={2} className='text-center'>{album.stock_quantity}</Col>
                    <Col sm={1}>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('albums.destroy', album.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </Col>
                </Row>

            }
        </Container>
    )
}