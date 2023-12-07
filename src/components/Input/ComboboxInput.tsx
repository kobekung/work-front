import { Controller } from 'react-hook-form'
import ComboboxBase from './ComboboxBase'
import { IInput } from '../../interfaces/components/input.interface'

const ComboboxInput = ({
    label,
    control,
    name,
    dataSelect,
    errors,
    disable = false
}: IInput) => {
    return (
        <div className="relative mb-1 w-full">
            <div className="mb-[0.3rem] flex items-center justify-between">
                <p className="font-semibold">{label ?? ''}</p>
            </div>
            <div className=" flex w-full items-center rounded-md border border-gray ">
                <Controller
                    name={name!}
                    rules={{ required: 'please select data' }}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <ComboboxBase
                                disable={disable}
                                dataset={dataSelect ?? []}
                                defaultValue={value}
                                onChange={onChange}
                            />
                        )
                    }}
                />
            </div>
            {errors && <p className="text-sm text-red-500">{errors}</p>}
        </div>
    )
}

export default ComboboxInput