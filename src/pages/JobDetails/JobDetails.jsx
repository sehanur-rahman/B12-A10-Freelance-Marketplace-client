import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        axios
            .get(`/jobs/${id}`)
            .then((res) => setJob(res.data))
            .catch(() => toast.error("Failed to load job"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingSpinner />;

    if (!job)
        return <div className="text-center text-slate-300 py-10">Job not found</div>;

    const acceptJob = async () => {
        if (!user?.email) return toast.error("Please login to accept jobs");
        if (job.userEmail === user.email)
            return toast.error("You cannot accept your own job!");

        setAccepting(true);

        try {
            await axios.post("/accept-task", {
                jobId: job._id,
                title: job.title,
                acceptedBy: user.email,
            });
            toast.success("Job accepted!");
            navigate("/my-accepted-tasks");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to accept job");
        } finally {
            setAccepting(false);
        }
    };

    return (

        <div className="max-w-6xl mx-auto mt-6 px-4">
            <div
                className="
        grid grid-cols-1 md:grid-cols-2 gap-8
        bg-base-100 text-base-content
        border border-base-300
        rounded-2xl p-6
        shadow-lg
      "
            >
                {/* LEFT: Image */}
                <div className="w-full">
                    <img
                        src={job.coverImage}
                        alt={job.title}
                        className="
            w-full h-[260px] md:h-full
            object-cover rounded-xl
          "
                    />
                </div>

                {/* RIGHT: Content */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {job.title}
                    </h1>

                    <div className="space-y-2 text-sm md:text-base opacity-80 mb-5">
                        <p>
                            <span className="font-semibold">Category:</span>{" "}
                            {job.category}
                        </p>
                        <p>
                            <span className="font-semibold">Posted By:</span>{" "}
                            {job.postedBy}
                        </p>
                        <p>
                            <span className="font-semibold">Posted At:</span>{" "}
                            {new Date(job.postedAt).toLocaleString()}
                        </p>
                    </div>

                    <p className="leading-relaxed opacity-90 mb-6">
                        {job.summary}
                    </p>

                    {/* Buttons */}
                    <div className="mt-auto flex flex-wrap gap-4">
                        <button
                            onClick={acceptJob}
                            disabled={accepting}
                            className="btn btn-primary"
                        >
                            {accepting ? "Processing..." : "Accept Job"}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default JobDetails;
