import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import AlbumTable from "@/Components/AlbumTable";
import AlbumForm from "@/Components/AlbumForm";
import NavLink from "@/Components/NavLink";



export default function Index({ auth, albums, artists, csrf_token }) {

    return (
        <AuthenticatedLayout auth={auth} header={''} csrf_token={csrf_token}>
            <Head title="Albums" />
            <AlbumForm artists={artists}></AlbumForm>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <NavLink href='http://127.0.0.1:8000/upload' >Import albums from file</NavLink>
            </div>

            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <AlbumTable albums={albums} artists={artists} />
            </div>
        </AuthenticatedLayout>
    )
}