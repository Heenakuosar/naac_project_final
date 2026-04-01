import { useParams } from "react-router-dom";

const FacultyDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Faculty Details (ID: {id})
      </h2>

      <p>Yahan baad me:</p>
      <ul className="list-disc ml-6">
        <li>Awards</li>
        <li>Workshops</li>
        <li>Seed Money</li>
        <li>Research Papers</li>
      </ul>
    </div>
  );
};

export default FacultyDetail;