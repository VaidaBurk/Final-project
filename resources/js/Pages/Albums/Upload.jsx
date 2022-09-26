import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import AlbumTable from "@/Components/AlbumTable";
import AlbumForm from "@/Components/AlbumForm";
import UploadFromFileField from "@/Components/UploadFromFileField";


export default function Upload({ auth, csrf_token }) {

    return (
        <AuthenticatedLayout auth={auth} header={''} csrf_token={csrf_token}>
            <Head title="Albums" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <UploadFromFileField auth={auth} header={''} csrf_token={csrf_token}></UploadFromFileField>
            </div>
            {/* <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <AlbumTable albums={albums} artists={artists} />
            </div> */}
        </AuthenticatedLayout>
    )
}