import React, { useState, useEffect } from "react";
import StudentDataService from "../services/StudentService";

const Student = props => {
    const initialStudentState = {
        id: null,
        name: "",
        passport: ""
    };
    const [currentStudent, setCurrentStudent] = useState(initialStudentState);
    const [message, setMessage] = useState("");

    const getStudent = id => {
        StudentDataService.get(id)
            .then(response => {
                setCurrentStudent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStudent(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };

    const updateStudent = () => {
        StudentDataService.update(currentStudent.id, currentStudent)
            .then(response => {
                console.log(response.data);
                setMessage("The student was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteStudent = () => {
        StudentDataService.remove(currentStudent.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/students");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentStudent ? (
                <div className="edit-form">
                    <h4>Student</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentStudent.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passport">Passport</label>
                            <input
                                type="text"
                                className="form-control"
                                id="passport"
                                name="passport"
                                value={currentStudent.passport}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                    <button className="badge badge-danger mr-2" onClick={deleteStudent}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateStudent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Student...</p>
                </div>
            )}
        </div>
    );
};

export default Student;