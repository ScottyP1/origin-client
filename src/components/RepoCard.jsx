import { PiGearSixLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const RepoCard = ({ repo }) => {
  return (
    <div className="bg-black/30 border border-white/10 backdrop-blur-md p-5 rounded-xl flex flex-col gap-2 font-[Mokoto] shadow-md hover:border-purple-300 transition duration-300">
      <div className="flex items-center">
        <h1 className="text-white text-lg tracking-wider">{repo.name}</h1>
        <PiGearSixLight color="white" size={22} className="ml-auto" />
      </div>

      <div className="text-sm text-gray-400 mt-2 space-y-1">
        <p>Commits: {repo.commit_count}</p>
        <p>PRs: {repo.open_pr_count}</p>
        <p>Issues: {repo.open_issue_count}</p>
      </div>

      <Link
        to={repo.url}
        target="_blank"
        className="mt-auto text-sm text-purple-300/[.8] hover:underline text-center"
      >
        [ VIEW ON GITHUB ]
      </Link>
    </div>
  );
};

export default RepoCard;
