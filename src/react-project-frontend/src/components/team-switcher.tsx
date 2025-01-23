import { LucideIcon } from "lucide-react";

interface Team {
  name: string;
  logo: LucideIcon;
  plan: string;
}

interface TeamSwitcherProps {
  teams: Team[];
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  return (
    <div>
      {teams.map((team) => (
        <div key={team.name}>
          <team.logo /> {team.name}
        </div>
      ))}
    </div>
  );
}
