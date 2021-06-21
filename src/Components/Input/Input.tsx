import {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import './input.scss'

interface InputType {
    type?: string;
    iconName?: IconProp;
    defaultValue?: string;
    callback: (inputValue: string) => any;
    placeholder?: string;
}

const Input: FunctionComponent<InputType> = ({callback, placeholder, iconName, type="text", defaultValue=""}) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [value, setValue] = useState(defaultValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setCallbackValue = useCallback(debounce((inputValue: string) => {
        callback(inputValue)
    }, 250), [])

    useEffect(() => {
        if (hasLoaded) {
            setCallbackValue(value)
        } else {
            setHasLoaded(true)
        }
    }, [value, setCallbackValue])

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className={classNames('input-container', {hasIcon: iconName})}>
            {iconName && <FontAwesomeIcon icon={iconName} />}
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

export default Input;
