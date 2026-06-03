import React, { useState, useEffect } from "react";

export default function Localstorageform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    checkbox: false,
    selection: "",
  });

  const [savedData, setSavedData] = useState([]);
  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 3;

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("users")) || [];
    setSavedData(oldData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      selection: "",
    });
  };

  const Delete = (id) => {
    const updatedData = savedData.filter((_, index) => index !== id);

    setSavedData(updatedData);
    localStorage.setItem("users", JSON.stringify(updatedData));

    if (currentPage > 1 && currentData.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Edit = (id) => {
    setFormData(savedData[id]);
    setEditData(id);
  };

  
  const filteredData = savedData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = sortedData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <div className="mb-3">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
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
            />
            <label className="ms-2">Accept Terms</label>
          </div>

          <select
            name="selection"
            className="form-select mb-3"
            value={formData.selection}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Bootstrap">Bootstrap</option>
          </select>

          <button className="btn btn-primary w-100">
            {editData !== null ? "Update" : "Save"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded p-4 mt-5">
        <h3 className="mb-3">Saved Data</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Search By Name..." value={search}  onChange={(e) => {  setSearch(e.target.value);  setCurrentPage(1);   }} />
          </div>

          <div className="col-md-6">
            <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>
        </div>

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

        <div className="text-center mt-3">
          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            className="btn btn-secondary ms-2"
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