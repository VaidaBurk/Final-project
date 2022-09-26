import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import AlbumTable from "@/Components/AlbumTable";
import AlbumForm from "@/Components/AlbumForm";


export default function Index({ auth, albums, artists }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Albums" />
            <AlbumForm artists={artists}></AlbumForm>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <a href="http://127.0.0.1:8000/albums/upload">Upload data from file</a>
            </div>

            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <AlbumTable albums={albums} artists={artists} />
            </div>
        </AuthenticatedLayout>
    )
}