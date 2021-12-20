import type { FieldPath } from "react-hook-form";

export interface UserResponse {
    username: string,
    id: number
}

export type BubblesResponse = {
    id: number,
    title: string,
    description: string,
    username: string,
    user_id: number,
    images: [string, string]
}[]


export type FormResponse<T> = {
    errors: {
        [P in FieldPath<T>]: string[]
    },
    success: undefined
} | {
    success: true,
    errors: undefined
}

export type BubbleVariant = {id: number, image: string, name: string}

export type GameProcessResponse = {
    completed: false,
    bubble_variants: [BubbleVariant, BubbleVariant],
    round: number,
    of: number
} | {
    completed: true,
    bubble_variants: undefined,
    round: undefined,
    of: undefined
}
