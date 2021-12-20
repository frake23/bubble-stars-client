import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import getBase64 from '../lib/getBase64';
import { InputControl } from './Controls';

interface BubbleVariantControlProps {
    inputLabel: string,
    fileLabel: string,
    register: UseFormRegister<any>,
    className?: string,
    error?: string,
    control: Control<any>,
    index: number
}

const BubbleVariantControl: React.FC<BubbleVariantControlProps> = ({inputLabel, fileLabel, register, className, error, control, index}) => {

    return (
        <div className={`flex flex-col ${className ? className : ''}`}>
            <InputControl
                title={`Вариант ${index+1}`}
                label={inputLabel}
                register={register}
                placeholder='Заголовок варианта'
                className="mb-2"
                error={error}
            />
            <Controller
                name={fileLabel}
                control={control}
                render={({field: {onChange, value}}) => <Dropzone onChange={(e: any) => onChange(e.target.files[0])} value={value}/>}
            />
            
        </div>
    )
}

const Dropzone = ({onChange, value}: {onChange: React.ChangeEventHandler, value?: File}) => {
    const [imgUrl, setImgUrl] = useState<any>(null);

    useEffect(() => {
        if (!value) setImgUrl(null)
    }, [value])

    const onDrop = useCallback(async (files: File[]) => {
        files.length && setImgUrl(await getBase64(files[0]))
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/jpeg, image/png, image/gif'
    })
    return (
        <div 
            className={`
                flex flex-col 
                border-2 border-dashed border-blue-500 
                text-sm text-blue-500 rounded-xl 
                p-4 text-center
            `}
            {...getRootProps()}
        >
            <input 
                {...getInputProps({onChange})}
            />
            {
                imgUrl ?
                    <Image src={imgUrl} alt="image" width="100%" height="100%" className="mt-2 rounded-xl" />
                    :
                    (isDragActive ? 'Перетащите картинку сюда...' : 'Нажмите или перетащите сюда картинку')
            }
        </div>
    )
}

export default BubbleVariantControl
