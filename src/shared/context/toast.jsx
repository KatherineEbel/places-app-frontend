import {createContext, useCallback, useContext, useReducer} from "react";

const ToastContext = createContext({toasts: []});

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      }
    case 'DELETE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.payload),
      }
    default: throw new Error(`unknown action type ${action.type}`)
  }
}

export function ToastProvider({children}) {
  const [{ toasts}, dispatch] = useReducer(toastReducer, { toasts: []});

  const addToast = useCallback((id, type, message) => {
    dispatch({type: 'ADD_TOAST', payload: {id, type, message}});
  }, []) ;

  const deleteToast = useCallback((id) => {
    dispatch({type: 'DELETE_TOAST', payload: id});
  }, []);

  return <ToastContext.Provider value={{toasts, addToast, deleteToast}}>
    {children}
  </ToastContext.Provider>
}

export const useToastContext = () => useContext(ToastContext);