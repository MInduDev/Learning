// Student Array

const students = [

    {
        name: "M Indu",
        marks: "49%",
        class: "3rd",
        address: "India"
    },

    {
        name: "Reetwika Sinha",
        marks: "85%",
        class: "10th",
        address: "123, ABC Colony, Delhi"
    },

    {
        name: "Rudiya Sharma",
        marks: "70%",
        class: "12th",
        address: "456, XYZ Street, Mumbai"
    },

    {
        name: "Aisha Patel",
        marks: "95%",
        class: "8th",
        address: "789, PQR Nagar, Bangalore"
    },

    {
        name: "Karan Mehta",
        marks: "60%",
        class: "9th",
        address: "101, LMN Road, Kolkata"
    },

    {
        name: "Sneha Reddy",
        marks: "80%",
        class: "11th",
        address: "222, DEF Avenue, Chennai"
    },

    {
        name: "Rahul Verma",
        marks: "75%",
        class: "10th",
        address: "345, GHI Colony, Jaipur"
    },

    {
        name: "Shrivansh Mehta",
        marks: "88%",
        class: "12th",
        address: "678, JKL Street, Lucknow"
    },

    {
        name: "Ayan Sharma",
        marks: "92%",
        class: "9th",
        address: "901, MNO Road, Pune"
    },

    {
        name: "Kanika Singh",
        marks: "76%",
        class: "10th",
        address: "345, GHI Colony, Jaipur"
    },

    {
        name: "Shorya Mehta",
        marks: "87%",
        class: "12th",
        address: "678, JKL Street, Lucknow"
    },

    {
        name: "Aryan Agarwal",
        marks: "95%",
        class: "9th",
        address: "901, MNO Road, Pune"
    }   

];

const studentContainer = document.getElementById("studentContainer");
const search = document.getElementById("search");

// Render Students

function displayStudents(studentList){

    if(studentList.length === 0){

        studentContainer.innerHTML =
        `<h2 class="no-data">No Student Found</h2>`;

        return;
    }

    studentContainer.innerHTML = studentList.map(student =>

        `
        <div class="card">

            <p><strong>Student Name:</strong> ${student.name}</p>
            <p><strong>Marks:</strong> ${student.marks}</p>
            <p><strong>Class:</strong> ${student.class}</p>
            <p><strong>Address:</strong> ${student.address}</p>

        </div>
        `

    ).join("");

}

// Initial Display

displayStudents(students);

// Search Functionality

search.addEventListener("keyup", function(){

    const searchText = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>

        student.name.toLowerCase().includes(searchText)

    );

    displayStudents(filteredStudents);

});
