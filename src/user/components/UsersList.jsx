import UsersListItem from "./UsersListItem";

export default function UsersList({users}) {
  if (!users || !users.length)
    return (
      <div className='grid place-items-center min-h-screen'>
        <h2>No users found</h2>
      </div>
    )

  return (
    <div className='grid md:grid-cols-3 gap-4'>
      {users.map(user => (
        <UsersListItem key={user.id} user={user} />
      ))}
    </div>
  )
}