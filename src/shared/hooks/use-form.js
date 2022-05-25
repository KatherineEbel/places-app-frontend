import {useCallback, useReducer} from "react";

const formReducer = (state, {type, payload}) => {
  switch (type) {
    case 'INPUT_CHANGED':
      const {id, value, valid: inputValid} = payload
      const valid = Object.keys(state.inputs).every(inputId => {
        if (inputId === id) return inputValid;

        return state.inputs[inputId].valid
      });
      return {
        ...state, inputs: {
          ...state.inputs, [id]: {
            value, valid: inputValid
          }
        },
        valid,
      };
    case 'SET_DATA':
      const {inputs, valid: formValid} = payload;
      console.log(inputs, formValid)
      return {
        inputs,
        valid: formValid,
      }
    default:
      return state;
  }
}

export const useForm = (inputs, valid) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs,
    valid,
  });

  const inputHandler = useCallback((id, value, valid) => {
    dispatch({
      type: 'INPUT_CHANGED',
      payload: {id, value, valid}
    });
  }, []);

  const setFormData = useCallback((inputs, valid) => {
    dispatch({
      type: 'SET_DATA',
      payload: {
        inputs,
        valid,
      }
    })
  }, []);

  return {...state, inputHandler, setFormData}
}