function InputError({ErrorMessage}) {
    return (
        <div>
            <p className="text-red-600 font-bold">{ErrorMessage}</p>
        </div>
    )
}

export default InputError;