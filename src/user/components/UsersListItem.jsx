import {Link} from "react-router-dom";

export default function UsersListItem({ user}) {
  const { name, image, id, places } = user;
  return (
    <Link to={`/${id}/places`}>
      <div className="card card-side items-center bg-base-200 shadow-xl group">
        <div className="avatar w-32 h-32 p-4">
          <div className="rounded-full overflow-hidden">
            <img className='group-hover:scale-125 group-hover:opacity-80 transition-transform duration-200' src={`http://localhost:5001/${image}`} alt={name}/>
          </div>
        </div>
        <div className="card-body items-center">
          <h2 className="card-title text-primary">{name}</h2>
          <p className='text-accent'>{places.length} {places.length === 1 ? 'Place' : 'Places'}</p>
        </div>
      </div>
    </Link>
  )
}