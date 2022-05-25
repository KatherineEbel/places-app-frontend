import {Link } from "react-router-dom";
import Modal from "../../shared/components/ui-elements/Modal";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Popup } from 'react-leaflet/Popup'
import { Marker } from "react-leaflet/Marker";
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from "leaflet";
import {useHttpClient} from "../../shared/hooks/use-http-client";
import {useToast} from "../../shared/hooks/use-toast";
import {useAuth} from "../../shared/context/auth";

export default function PlaceListItem({place, onDelete}) {
  const { processing, sendRequest } = useHttpClient();
  const { user } = useAuth();
  const toast = useToast();
  const position = Object.values(place.location);

  const deletePlace = async () => {
    const { id } = place;
    const data = await sendRequest(`/api/places/${id}`, 'DELETE', null, {
      Authorization: `Bearer ${user.token}`
    });
    if (!data.success) return;
    toast('success', 'Place deleted')
    onDelete(place.id)
  }

  return (
    <>
      <li className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={`http://localhost:5001/${place.image}`} alt="Shoes" className="rounded-xl"/>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{place.title}</h2>
          <h3 className='text-lg font-medium'>{place.address}</h3>
          <p>{place.description}</p>

          <div className="card-actions">
            <a className="btn btn-primary" href="#modal-map">View on map</a>
            { user && user.id === place.creator && (
              <>
                <Link className="btn btn-secondary" to={`/places/${place.id}`}>Edit</Link>
                <a className={`btn btn-error ${processing ? 'loading' : ''}`} href="#modal-confirm">Delete</a>
              </>
            )}
          </div>
        </div>
      </li>
      <Modal id="modal-confirm">
        <p>Are you sure you want to remove this place? This cannot be undone.</p>
        <div className='modal-action'>
          <a className='btn btn-primary' href="#root">Cancel</a>
          <a className='btn btn-error' href="#root" onClick={deletePlace}>Confirm</a>
        </div>
      </Modal>
      <Modal id="modal-map">
        <h3 className="font-bold text-lg">The Map</h3>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}
                  icon={new Icon({iconUrl: markerIconPng})}
          >
            <Popup>
              {place.title}
            </Popup>
          </Marker>
        </MapContainer>

        <div className="modal-action">
          <a href="#root" className="btn">Close</a>
        </div>
      </Modal>
    </>
  )

}