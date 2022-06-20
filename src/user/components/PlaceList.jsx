import PlaceListItem from "./PlaceListItem";
import {Link } from "react-router-dom";

export default function PlaceList ({ places, onDelete}) {
  return (
    <>
      { !places || !places.length ? (
        <div >
          <div className="alert alert-info shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p>No places found</p>
              <Link to='/places/new' className="btn btn-outline btn-primary ml-auto">Share Place</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid md:grid-cols-2'>
          {places.map(place => <PlaceListItem key={place.id} place={place} onDelete={onDelete}/>)}
        </div>
      )}
    </>
  )
}