import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import BubbleVariantControl from './BubbleVariantControl';
import Button from './Button';
import ControlWrapper from './ControlWrapper';
import { InputControl, SelectControl } from './Controls';
import Paper from './Paper';
import setServerErrors from '../lib/setServerErrors';
import { FormResponse } from '../types/responses';

interface BubbleFormProps {
    className?: string
}

interface BubbleFormData {
    title: string,
    description: string,
    variants_count: 8 | 16 | 32,
    bubble_variants: {
        image: File,
        name: string
    }[]
}

const BubbleForm:React.FC<BubbleFormProps> = ({className}) => {
    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors },
        watch,
        control,
        reset,
        setValue
    } = useForm<BubbleFormData>();

    const variantsCount = watch('variants_count', 8);
    const {fields, append, remove,} = useFieldArray<BubbleFormData>({name: 'bubble_variants', control})

    useEffect(() => {
        if (variantsCount > fields.length)
            for (let i = 0; i < variantsCount - fields.length; i++) append({image: undefined, name: ''})
        else if (variantsCount < fields.length)
            for (let i = fields.length; i >= variantsCount; i--) remove(i)
    }, [variantsCount]);

    const onSubmit = async (data: BubbleFormData) => {
        const {bubble_variants, ...fData} = data;

        const formData = new FormData();
        bubble_variants.forEach((v, i) => {
            formData.append(`image-${i}`, v.image);
            formData.append(`name-${i}`, v.name)
        });
        Object.keys(fData).forEach(d => formData.append(d, `${fData[d as keyof typeof fData]}`));
        const json: FormResponse<BubbleFormData> = await fetch(process.env.NEXT_PUBLIC_API_HOST! + '/bubbles', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(res => res.json());
        if (json.errors) {
            setServerErrors<BubbleFormData>(json.errors, setError);
            return
        }
        reset({
            title: '', 
            description: '', 
            variants_count: 8, 
            bubble_variants: Array(8).fill(0).map(() => ({name: '', image: undefined}))
        });
    }

    return (
        <Paper className={`flex flex-col w-full ${className ? className : ''}`}>
            <h1 className="text-2xl font-bold mb-2">Создание bubble</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <InputControl
                    title="Заголовок"
                    placeholder="Введите заголовок"
                    label="title"
                    register={register}
                    className="mb-2"
                    error={errors.title?.message}
                    titleClassName='text-lg font-medium'
                />
                <InputControl
                    title="Описание"
                    placeholder="Введите описание"
                    label="description"
                    register={register}
                    className="mb-2"
                    error={errors.description?.message}
                    titleClassName='text-lg font-medium'
                />
                <SelectControl
                    title="Количество вариантов"
                    label="variants_count"
                    register={register}
                    options={[
                        {text: '8', value: 8}, {text: '16', value: 16}, {text: '32', value: 32},
                    ]}
                    className="mb-2"
                    error={errors.variants_count?.message}
                    titleClassName='text-lg font-medium'
                />
                <ControlWrapper title="Варианты" className="flex flex-col mb-6" titleClassName='text-lg font-medium'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {fields.map((_, i) => 
                            <BubbleVariantControl
                                register={register}
                                fileLabel={`bubble_variants.${i}.image`}
                                inputLabel={`bubble_variants.${i}.name`}
                                key={`variant-${i}`}
                                className="col-span-1"
                                error={
                                    errors.bubble_variants &&
                                    errors.bubble_variants[i] ? 
                                    Object.values(errors.bubble_variants[i]).map(k => k.message).join('. ') :
                                    undefined
                                }
                                control={control}
                                index={i}
                            />
                        )}
                    </div>
                </ControlWrapper>
                <Button title="Создать" color="pink" className="self-end"/>
            </form>
        </Paper>
    )
}

export default BubbleForm
