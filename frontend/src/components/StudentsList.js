import React, { useState, useEffect } from "react";
import StudentDataService from "../services/StudentService";
import { Link } from "react-router-dom";

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveStudents();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveStudents = () => {
        StudentDataService.getAll()
            .then(response => {
                setStudents(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveStudents();
        setCurrentStudent(null);
        setCurrentIndex(-1);
    };

    const setActiveStudent = (student, index) => {
        setCurrentStudent(student);
        setCurrentIndex(index);
    };

    const removeAllStudents = () => {
        StudentDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        StudentDataService.findByName(searchName)
            .then(response => {
                setStudents(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Students List</h4>

                <ul className="list-group">
                    {students &&
                    students.map((student, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveStudent(student, index)}
                            key={index}
                        >
                            {student.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllStudents}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentStudent ? (
                    <div>
                        <h4>Student</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentStudent.name}
                        </div>
                        <div>
                            <label>
                                <strong>Passport:</strong>
                            </label>{" "}
                            {currentStudent.passport}
                        </div>

                        <Link
                            to={"/students/" + currentStudent.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Student...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsList;