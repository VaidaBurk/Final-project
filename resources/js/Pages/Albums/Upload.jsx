import React from "react";
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/inertia-react';
import UploadFromFileField from "@/Components/UploadFromFileField";


export default function Upload({ auth, csrf_token }) {

    return (
        <AdminLayout auth={auth} header={''} csrf_token={csrf_token}>
            <Head title="Albums" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <UploadFromFileField auth={auth} header={''} csrf_token={csrf_token}></UploadFromFileField>
            </div>
        </AdminLayout>
    )
}