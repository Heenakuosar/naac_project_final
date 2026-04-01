import { useNavigate } from "react-router-dom";

const FacultyList = () => {
  const navigate = useNavigate();

  // abhi static data (baad me API se aayega)
  const faculty = [
    { id: 1, name: "Dr. Ayesha Begum" },
    { id: 2, name: "Dr. Rahman Ali" },
    { id: 3, name: "Dr. Fatima Noor" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Faculty List</h2>

      <ul className="space-y-2">
        {faculty.map((f) => (
          <li
            key={f.id}
            onClick={() => navigate(`/dashboard/faculty/${f.id}`)}
            className="p-3 border rounded cursor-pointer hover:bg-blue-50"
          >
            {f.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyList;