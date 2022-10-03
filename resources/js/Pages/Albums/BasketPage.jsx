import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Basket from '@/Components/Basket';
import { Head } from '@inertiajs/inertia-react';
import TotalPrice from "@/Components/TotalPrice";
import { useState } from "react";

export default function BasketPage({ auth, csrf_token }) 
{
    return (
    <AuthenticatedLayout auth={auth} csrf_token={csrf_token}>
        <Head title="Basket" />
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-center font-monospace mt-5">Basket</h2>
            <Basket auth={auth} 
                    csrf_token={csrf_token} 
                    >
            </Basket>
        </div>
    </AuthenticatedLayout>
    )

}