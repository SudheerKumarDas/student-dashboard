let students = [];

function addStudent(){
    const name = document.getElementById("nameInput").value ;
    const marks =Number(document.getElementById("marksInput").value);

    if(name === "" || marks === ""){
        alert("Please enter both name and marks!");
        return;
    }

    if(marks < 0 || marks > 100){
        alert("Marks must be between 0 and 100");
        return;
    }

    const grade = 
        marks >= 90 ? "A" :
        marks >= 75 ? "B" :
        marks >= 60 ? "C" : "F";
    
    students.push({name, marks, grade});

    document.getElementById("nameInput").value = "";
    document.getElementById("marksInput").value = "";   

    renderTable();
    updateSummary();
}

function renderTable(){
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
            <td> <button onclick="deleteStudent(${index})">Delete</button> </td>
        </tr> 
        `;
    });
}

function deleteStudent(index){
    students.splice(index, 1);
    renderTable();
    updateSummary();
}

function updateSummary(){
    if(students.length === 0){
        document.getElementById("avgResult").innerText = "Average Marks : -";
        document.getElementById("topperResult").innerText = "Topper: -";
        return ;
    }

    const total = students.reduce((sum, s)=> sum + s.marks , 0);
    const average = total / students.length;


    const topper = students.reduce((max, s)=>
    s.marks > max.marks ? s : max);

    document.getElementById("avgResult").innerText =
        `Average Marks: ${average.toFixed(2)}`;

    document.getElementById("topperResult").innerText =
        `Topper: ${topper.name} (${topper.marks})`;
}