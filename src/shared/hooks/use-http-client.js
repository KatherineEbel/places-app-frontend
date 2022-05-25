import {useCallback, useEffect, useRef, useState} from "react";
import {useToast} from "./use-toast";

export function useHttpClient() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [processing, setProcessing] = useState(false);
  const toast = useToast(5000);
  const requests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    let abortController;
    try {
      setProcessing(true)
      abortController = new AbortController();
      requests.current.push(abortController);
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        body,
        headers,
        signal: abortController.signal,
      });
      let data = response.status === 204 ? { success: true } : await response.json();
      requests.current = requests.current.filter(ctrl => ctrl !== abortController);
      if (!response.ok) {
        toast('error', data.message)
      }
      return data;
    } catch (e) {
      if (!abortController.signal.aborted) {
        toast('error', e.toString())
      }
      return null;
    } finally {
      setProcessing(false)
    }
  }, [BASE_URL, toast])

  useEffect(() => {
    const activeRequests = requests.current
    return () => {
      activeRequests.forEach(ctrl => ctrl.abort());
    }
  }, [])

  return { processing, sendRequest }
}