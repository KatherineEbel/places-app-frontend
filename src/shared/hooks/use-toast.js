import {useToastContext} from "../context/toast";
import {v4 as uuid} from 'uuid'
import {useCallback} from "react";

export function useToast(delay = 5000) {
  const { addToast, deleteToast } = useToastContext();

  return useCallback(function toast(type, message) {
    const id = uuid();
    addToast(id, type, message)
    setTimeout(() => {
      deleteToast(id)
    }, delay)
  }, [addToast, delay, deleteToast])
}