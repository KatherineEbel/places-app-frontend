import PlaceList from "../../user/components/PlaceList";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "../../shared/components/loader/loader";
import {useHttpClient} from "../../shared/hooks/use-http-client";

export default function UserPlaces() {
  const { sendRequest } = useHttpClient();
  const { userId } = useParams()
  const [userPlaces, setUserPlaces] = useState(null)

  const handleDelete = (placeId) => {
    setUserPlaces(userPlaces.filter(p => p.id !== placeId));
  }

  useEffect(() => {
    (async () => {
      if (!userId) return;
      const data = await sendRequest(`/api/places/user/${userId}`);
      data && setUserPlaces(data)
    })();
  }, [sendRequest, userId])

  return (
    <main className='grid place-items-center min-h-screen'>
      { userPlaces ? (
        <PlaceList places={userPlaces} onDelete={handleDelete}/>
      ) : (
        <Loader/>
      )}
    </main>
  )
}