import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AssignmentList() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      const res = await fetch("http://localhost:5000/api/assignments");
      const data = await res.json();
      setAssignments(data);
    }

    fetchAssignments();
  }, []);

  return (
    <div className="assignment-list">
      <h2>SQL Practice Question</h2>

      {assignments.map((assignment, index) => (
        <div
          key={assignment._id}
          className="assignment-card"
          onClick={() => navigate(`/assignment/${assignment._id}`)}
        >
          <div className="assignment-header">
            <h3>
              Q.{index + 1} {assignment.title}
            </h3>
            <span
              className={`difficulty ${assignment.description.toLowerCase()}`}
            >
              {assignment.description}
            </span>
          </div>

          <p>{assignment.question}</p>
        </div>
      ))}
    </div>
  );
}

export default AssignmentList;
