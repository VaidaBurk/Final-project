import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import AlbumsFromFile from "@/Components/AlbumsFromFile";

export default function UploadFromFileField( {auth, header, csrf_token }) {

    const [file, setFile] = useState();
    const [load, setLoad] = useState(false);

    const onFileNameChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    return (
        <div className="flex flex-col items-start mt-5">
            <label className='form-label fw-bold mb-3'>Upload data from file:</label>
            <input
                type='file'
                //value={filename}
                name='upload_from_file'
                className='form-control border-gray-300 focus:border-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                onChange={onFileNameChange}
            />
            <button 
                className='mt-3 btn btn-dark uppercase'
                onClick={() => (setLoad(true))}
                >
                    Upload
            </button>
            {load == true && <AlbumsFromFile file={file} csrf_token={csrf_token}></AlbumsFromFile>}
        </div>
    );
}
