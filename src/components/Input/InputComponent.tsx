import { IInput } from '../../interfaces/components/input.interface'
import { INPUT_TYPE_ENUM } from '../../enums/input.enum'

const InputComponent = ({
    label,
    type,
    register,
    errors,
    disable = false,
    readonly = false
}: IInput) => {
    return (
        <div>
            <div className="relative mb-1 w-full">
                <div className="mb-[0.3rem] flex items-center justify-between">
                    <p className="font-semibold">{label}</p>
                </div>
                <div className=" flex w-full items-center rounded-md">
                    <>
                        {type != INPUT_TYPE_ENUM.TEXTAREA && <input
                            {...register}
                            disabled={disable}
                            step="any"
                            type={type ?? "text"}
                            readOnly={readonly}
                            className='"w-full px-3 py-1 border rounded-md w-full'
                        />}
                        {type == INPUT_TYPE_ENUM.TEXTAREA &&
                            <textarea
                                {...register}
                                readOnly={readonly}
                                className='"w-full px-3 py-1 border rounded-md w-full'
                            />}
                    </>

                </div>
                {errors && <p className="text-sm text-red-500">{errors}</p>}
            </div>
        </div>
    )
}

export default InputComponent