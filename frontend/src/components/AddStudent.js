import React, { useState } from "react";
import StudentDataService from "../services/StudentService";

const AddStudent = () => {
    const initialStudentState = {
        id: null,
        name: "",
        passport: ""
    };
    const [student, setStudent] = useState(initialStudentState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };

    const saveStudent = () => {
        let data = {
            name: student.name,
            passport: student.passport
        };

        StudentDataService.create(data)
            .then(response => {
                setStudent({
                    id: response.data.id,
                    name: response.data.name,
                    passport: response.data.passport,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newStudent = () => {
        setStudent(initialStudentState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newStudent}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={student.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passport">Passport</label>
                        <input
                            type="text"
                            className="form-control"
                            id="passport"
                            required
                            value={student.passport}
                            onChange={handleInputChange}
                            name="passport"
                        />
                    </div>

                    <button onClick={saveStudent} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddStudent;