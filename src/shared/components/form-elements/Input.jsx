import {useEffect, useReducer} from "react";
import {validate} from "../../util/validators";

function inputReducer(state, {type, payload}) {
  switch (type) {
    case 'CHANGE':
      const {value, validators} = payload
      return {
        ...state,
        value,
        valid: validate(value, validators),
      }
    case 'TOUCH':
      return {
        ...state,
        touched: true,
      }
    default: return state;
  }
}

export default function Input({label, errorText, onInput, valid: inputValid, validators, ...rest}) {
  const {id, type, value: initialValue} = rest
  const [{touched, valid, value}, dispatch] = useReducer(inputReducer, {value: initialValue || '', valid: inputValid || false, touched: false})
  const changeHandler = ({target}) => {
    const { value } = target
    dispatch({type: 'CHANGE', payload: {value, validators}})
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    })
  };

  useEffect(() => {
    onInput(id, value, valid)
  }, [id, onInput, value, valid])

  const el = typeof type !== "undefined"
    ? <input className={`input input-bordered w-full ${touched && !valid ? 'input-error' : ''}`} {...rest}
      onChange={changeHandler} value={value} onBlur={touchHandler}
    />
    : <textarea className={`textarea textarea-bordered w-full ${touched && !valid ? 'textarea-error' : ''}`} {...rest}
      onChange={changeHandler} value={value} onBlur={touchHandler}
    />;

  return (
    <div className="form-control w-full">
      <label htmlFor={rest.id} className="label">
        <span className="label-text">{label}</span>
      </label>
      {el}
      <label className="label">
        {touched && !valid && <span className="text-error label-text-alt">{errorText}</span>}
      </label>
    </div>  )
}