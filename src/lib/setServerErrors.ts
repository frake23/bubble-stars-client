import type { FieldPath, Path, UseFormSetError } from "react-hook-form";

export default function setServerErrors<T>(
    errors: { [P in FieldPath<T>]: string[] },
    setError: UseFormSetError<T>
) {
    return Object.keys(errors).forEach((key) => {
        setError(key as FieldPath<T>, {
            message: errors[key as FieldPath<T>]!.join('. '),
        });
    });
}
