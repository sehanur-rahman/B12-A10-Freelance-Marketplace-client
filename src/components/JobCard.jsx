import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const JobCard = ({ job }) => {
    const { _id, title, category, postedBy, summary, coverImage } = job;

    return (
        <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -6 }}
            className="
        bg-base-100 text-base-content
        border border-base-300
        rounded-xl p-4
        shadow-md hover:shadow-xl
        transition-all duration-300
        flex flex-col
      "
        >
            <img
                src={coverImage}
                alt={title}
                className="h-44 w-full object-cover rounded-lg"
            />

            <h3 className="text-lg font-semibold mt-3">
                {title}
            </h3>

            <p className="text-sm opacity-70">
                <span className="font-medium">Category:</span> {category}
            </p>

            <p className="text-sm opacity-70">
                <span className="font-medium">Posted By:</span> {postedBy}
            </p>

            <p className="text-sm mt-1 line-clamp-2 opacity-80">
                {summary}
            </p>

            <div className="mt-auto pt-3">
                <Link to={`/allJobs/${_id}`}>
                    <button className="btn btn-primary btn-sm w-full">
                        View Details
                    </button>
                </Link>
            </div>
        </Motion.div>
    );
};

export default JobCard;
