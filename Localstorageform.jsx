import React, { useState, useEffect } from "react";

export default function Localstorageform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    checkbox: false,
    selection: ""
  });

  const [savedData, setSavedData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 3;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = savedData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(savedData.length / recordsPerPage);

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("users")) || [];
    setSavedData(oldData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedData;

    if (editData !== null) {
      updatedData = [...savedData];
      updatedData[editData] = formData;
      setEditData(null);
    } else {
      updatedData = [...savedData, formData];
    }

    setSavedData(updatedData);
    localStorage.setItem("users", JSON.stringify(updatedData));

    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      checkbox: false,
      selection: ""
    });
  };

  const Delete = (id) => {
    const updatedData = savedData.filter((_, index) => index !== id);

    setSavedData(updatedData);
    localStorage.setItem("users", JSON.stringify(updatedData));

    if (currentData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Edit = (id) => {
    setFormData(savedData[id]);
    setEditData(id);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone No</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="me-3">Gender:</label>

            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            <label className="ms-1 me-3">Male</label>

            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label className="ms-1">Female</label>
          </div>

          <div className="mb-3">
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
              required
            />
            <label className="ms-2">Accept Terms</label>
          </div>

          <div className="mb-3">
            <label>Select Course</label>

            <select
              name="selection"
              className="form-select"
              value={formData.selection}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Bootstrap">Bootstrap</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editData !== null ? "Update" : "Save"}
          </button>
        </form>
      </div>

      <div className="mt-5 bg-white rounded shadow p-4">
        <h3 className="mb-4">Saved Data</h3>

        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((el, index) => (
              <tr key={index}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
                <td>{el.gender}</td>
                <td>{el.selection}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => Delete(firstIndex + index)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-warning btn-sm ms-2"
                    onClick={() => Edit(firstIndex + index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span className="mx-3">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn btn-secondary"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}