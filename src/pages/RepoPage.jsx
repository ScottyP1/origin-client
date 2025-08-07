import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddRepoButton from "../components/AddRepoButton";
import RepoCard from "../components/RepoCard";

export default function RepoPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="px-8 md:px-24 py-10 opacity-0 animate-fade-in transition-opacity duration-500 ease-in">
      <div className="flex mb-6 absolute right-0">
        <AddRepoButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {user?.tracked_repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
