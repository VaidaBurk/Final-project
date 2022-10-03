import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from '@inertiajs/inertia-react';
import ArtistsTable from "@/Components/ArtistsTable";

export default function Index({ auth, artists }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '', origin: '', id: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('artists.store'), { onSuccess: () => reset() });
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Artists" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-gray-800 fw-bold py-3">Enter new artist here:</div>
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        placeholder="Title"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2"
                        onChange={e => setData('title', e.target.value)}
                    ></input>
                    <InputError message={errors.title} className="mt-2" />
                    <input
                        value={data.origin}
                        placeholder="Origin"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-4 p-2"
                        onChange={e => setData('origin', e.target.value)}
                    ></input>
                    <InputError message={errors.origin} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                </form>
                <div className="p-3 mt-10 bg-white shadow-sm rounded-lg divide-y">
                        {artists.map(artist =>
                            <ArtistsTable className="container" key={artist.id} artist={artist} />
                        )}
                </div>
            </div>

        </AuthenticatedLayout>
    )
}