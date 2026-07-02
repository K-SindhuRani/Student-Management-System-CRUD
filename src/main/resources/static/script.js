function addStudent() {

    const student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        course: document.getElementById("course").value
    };

    fetch("/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {
        alert("Student Added Successfully");
        loadStudents();
    });
}

function loadStudents() {

    fetch("/students")
    .then(response => response.json())
    .then(data => {

        let rows = "";

        data.forEach(student => {

            rows += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>

                <td>
                    <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById("studentTable").innerHTML = rows;
    });
}

function deleteStudent(id) {

    fetch(`/students/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Student Deleted Successfully");
        loadStudents();
    });
}

function updateStudent() {

    const id = document.getElementById("updateId").value;

    const student = {
        id: id,
        name: document.getElementById("updateName").value,
        course: document.getElementById("updateCourse").value
    };

    fetch(`/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {
        alert("Student Updated Successfully");
        loadStudents();
    });
}

window.onload = loadStudents;