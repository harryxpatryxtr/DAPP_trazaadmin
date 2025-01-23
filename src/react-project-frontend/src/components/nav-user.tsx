interface User {
  name: string;
  email: string;
  avatar: string;
}

interface NavUserProps {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
}
