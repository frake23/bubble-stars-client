import type { Path, UseFormSetError } from "react-hook-form";

export default function setServerErrors<T>(
    errors: { [P in keyof T]?: string[] },
    setError: UseFormSetError<T>
) {
    return Object.keys(errors).forEach((key) => {
        setError(key as Path<T>, {
            message: errors[key as keyof T]!.join('. '),
        });
    });
}
