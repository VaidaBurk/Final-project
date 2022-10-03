import React, { useState } from "react";
import { useForm, usePage } from '@inertiajs/inertia-react';
import Dropdown from "./Dropdown";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ArtistsTable({ artist }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, processing, reset, errors } = useForm({ title: artist.title, origin: artist.origin });

    const submit = (e) => {
        e.preventDefault();
        patch(route('artists.update', artist.id), { onSuccess: () => setEditing(false) });
    }

    return (
        <div>
            {editing
                ? <form onSubmit={submit}>
                    <div className="p-2">
                        <Row>
                            <Col sm={2} className="text-gray-900">{artist.id}</Col>
                            <Col sm={5} className="text-gray-900">
                                <input className="border p-2" value={data.title} onChange={e => setData('title', e.target.value)} />
                            </Col>
                            <Col sm={4} className="text-gray-900">
                                <input className="border p-2" value={data.origin} onChange={e => setData('origin', e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2} className="text-gray-900"></Col>
                            <Col sm={5} className="text-gray-900">
                                <InputError message={errors.title}></InputError>
                            </Col>
                            <Col sm={4} className="text-gray-900">
                                <InputError message={errors.origin}></InputError>
                            </Col>
                        </Row>
                        <div className="space-x-2 mt-3">
                            <PrimaryButton className="mx-2 mb-6">Save</PrimaryButton>
                            <button className="mx-2" onClick={() => setEditing(false) && reset()}>Cancel</button>
                        </div>
                    </div>
                </form>
                :

                <div className="p-2">
                    <Row>
                        <Col sm={2} className="text-gray-900">{artist.id}</Col>
                        <Col sm={5} className="text-gray-900">{artist.title}</Col>
                        <Col sm={4} className="text-gray-900">{artist.origin}</Col>
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
                                    <Dropdown.Link as="button" href={route('artists.destroy', artist.id)} method="delete">
                                        Delete
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            }
        </div>

    )
}