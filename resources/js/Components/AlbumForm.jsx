import React, { useInsertionEffect } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import UploadFromFileField from "@/Components/UploadFromFileField";
import { useForm } from '@inertiajs/inertia-react';
import "react-datepicker/dist/react-datepicker.css";

export default function AlbumForm({ artists }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        id: '', artist_id: '', title: '', release_date: '', price: '', stock_quantity: ''
    });


    const submit = (e) => {
        e.preventDefault();
        post(route('albums.store'), { onSuccess: () => reset() });
    }

    return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-gray-800 fw-bold pt-3 mb-3">Enter new album here:</div>
        <form className="" onSubmit={submit}>
            <input
                type="text"
                value={data.title}
                placeholder="Title"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2"
                onChange={e => setData('title', e.target.value)}
            ></input>
            <InputError message={errors.message} className="mt-2" />

            <select aria-label="Select artist"
                defaultValue={data.artist_id}
                onChange={e => setData('artist_id', e.target.value)}
                className="form-select text-gray-600 block w-full border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2 mt-4">
                <option>Select the artist...</option>
                {artists.map(artist =>
                    <option value={artist.id} key={artist.id}>{artist.title}</option>
                )}
            </select>

            <input
                
                type="date"
                placeholder="Release date"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-4 p-2"
                onChange={e => setData('release_date', e.target.value)}
            ></input>
            <InputError message={errors.message} className="mt-2" />
            <input
                type="number"
                value={data.price}
                placeholder="Price"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-4 p-2"
                onChange={e => setData('price', e.target.value)}
            ></input>
            <InputError message={errors.message} className="mt-2" />
            <input
                type="number"
                value={data.stock_quantity}
                placeholder="Stock quantity"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-4 p-2"
                onChange={e => setData('stock_quantity', e.target.value)}
            ></input>
            <InputError message={errors.message} className="mt-2" />
            <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
        </form>
    </div>
    )
}
