import { LucideIcon } from "lucide-react";

interface Project {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavProjectsProps {
  projects: Project[];
}

export function NavProjects({ projects }: NavProjectsProps) {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.name}>
          <project.icon /> {project.name}
        </div>
      ))}
    </div>
  );
}
