
import { Switch } from '@headlessui/react';
import { Control, useController } from 'react-hook-form';

interface ToggleSwitchProps {
    label: string;
    name: string;
    control: Control<any>;
    readonly?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, name, control, readonly = false }) => {
    const {
        field: { onChange, onBlur, value },
    } = useController({
        name,
        control,
    });

    return (
        <div className="flex items-center justify-between w-full space-x-2">
            <label>{label}</label>
            <Switch
                disabled={readonly}
                checked={value}
                onChange={(e)=>{ e ? onChange(1): onChange(0)}}
                onBlur={onBlur}
                className={`${value ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                <span className="sr-only">Toggle</span>
                <span
                    className={`${value ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
            </Switch>
        </div>
    );
};

export default ToggleSwitch;
