import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import AlbumsFromFile from "@/Components/AlbumsFromFile";

export default function UploadFromFileField() {

    const [filename, setFilename] = useState();
    const [filepath, setFilepath] = useState();
    const [load, setLoad] = useState(false);

    const onFileNameChange = (e) => {
        const filename = e.target.files[0].name;
        setFilename(filename);
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
            {load == true && <AlbumsFromFile filename={filename}></AlbumsFromFile>}
        </div>
    );
}
