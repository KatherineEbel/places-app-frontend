import UsersList from "../components/UsersList";
import {useEffect, useState} from "react";
import Loader from "../../shared/components/loader/loader";
import {useHttpClient} from "../../shared/hooks/use-http-client";


export default function Users() {
  const [users, setUsers] = useState(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    (async () => {
      console.log('fetching users')
      const data = await sendRequest('/api/users');
      if (data) setUsers(data)
    })()
  }, [sendRequest])

  return (
    <main className="p-8 grid place-items-center">
      {users ? (
        <UsersList users={users} />
      ) : (
        <Loader/>
      )}
    </main>
  );
}
