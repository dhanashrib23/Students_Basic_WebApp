import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [studentData, setStudentData] = useState({
    id: 0,
    name: "",
    address: "",
  });

  const ClearBoxes = () => {
    setStudentData({
      id: 0,
      name: "",
      address: "",
    });
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = () => {
    const helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        const result = JSON.parse(helper.responseText);
        setStudent(result);
      }
    };
    helper.open("GET", "http://localhost:9898/student");
    helper.send();
  };

  const onSearchBoxChange = (args) => {
    setSearch(args.target.value);
  };

  const onTextChange = (args) => {
    const updatedData = {
      ...studentData,
      [args.target.name]: args.target.value,
    };
    setStudentData(updatedData);
  };

  const AddStudent = () => {
    const helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        const reply = JSON.parse(helper.responseText);
        debugger;
        if (reply.affectedRows > 0) {
          getAllStudent();
          ClearBoxes();
        }
      }
    };
    helper.open("POST", "http://localhost:9898/student");
    helper.setRequestHeader("content-type", "application/json");
    helper.send(JSON.stringify(studentData));
  };

  const Edit = (std) => {
    setStudentData(std);
  };

  const UpdateRecord = () => {
    const helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        const output = JSON.parse(helper.responseText);
        if (output.affectedRows > 0) {
          getAllStudent();
          ClearBoxes();
        }
      }
    };
    helper.open("PUT", `http://localhost:9898/student/${studentData.id}`);
    helper.setRequestHeader("content-type", "application/json");
    helper.send(JSON.stringify(studentData));
  };

  const Delete = (stdId) => {
    const helper = new XMLHttpRequest();
    helper.onreadystatechange = () => {
      if (helper.readyState === 4 && helper.status === 200) {
        getAllStudent();
      }
    };
    helper.open("DELETE", `http://localhost:9898/student/${stdId}`);
    helper.send();
  };

  return (
    <div className="container">
      <br />
      <div>
        <center>
          <label>Search For Student </label>
          <input
            type="text"
            placeholder="Search here by name"
            className="form-control"
            value={search}
            onChange={onSearchBoxChange}
          />
        </center>
      </div>

      <br />
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr>
              <td className="text-center">
                <b>Name</b>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={onTextChange}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>Address</b>
                <input
                  type="text"
                  name="address"
                  value={studentData.address}
                  onChange={onTextChange}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <button className="btn btn-warning" onClick={AddStudent}>
                  Add Record
                </button>{" "}
                <button className="btn btn-info" onClick={ClearBoxes}>
                  Clear
                </button>{" "}
                <button className="btn btn-success" onClick={UpdateRecord}>
                  Update Record
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {student
              .filter((std) =>
                std.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((std) => (
                <tr key={std.id}>
                  <td>{std.id}</td>
                  <td>{std.name}</td>
                  <td>{std.address}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => Edit(std)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => Delete(std.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
