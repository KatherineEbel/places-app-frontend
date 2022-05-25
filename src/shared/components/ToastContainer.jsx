import Toast from "./Toast";
import { useToastContext } from "../context/toast";

export default function ToastContainer() {
  const { toasts } = useToastContext()
  return (
    <div className="absolute right-0 top-24 z-5">
      <div className="max-w-xl mx-auto">
        {toasts.map(({id, type, message}) => (
          <Toast
            id={id}
            key={id}
            type={type}
            message={message}
          />
        ))}
      </div>
    </div>
  )
}