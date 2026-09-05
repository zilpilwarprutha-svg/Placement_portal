/* ==========================================
   YCCE TRAINING & PLACEMENT PORTAL
========================================== */


/* ==========================================
   INITIAL STUDENT DATA
========================================== */

let students = JSON.parse(
    localStorage.getItem("ycceStudents")
) || [

    {
        name: "Aarav Sharma",
        roll: "YCCE001",
        email: "aarav@example.com",
        phone: "9876543210",
        branch: "CSE",
        cgpa: 9.1,
        status: "Placed",
        company: "TCS",
        package: 8
    },

    {
        name: "Prutha Zilpilwar",
        roll: "YCCE002",
        email: "prutha@example.com",
        phone: "9876543211",
        branch: "AIML",
        cgpa: 9.2,
        status: "Not Placed",
        company: "",
        package: 0
    },

    {
        name: "Riya Patil",
        roll: "YCCE003",
        email: "riya@example.com",
        phone: "9876543212",
        branch: "ECE",
        cgpa: 8.7,
        status: "Placed",
        company: "Infosys",
        package: 6.5
    },

    {
        name: "Aditya Joshi",
        roll: "YCCE004",
        email: "aditya@example.com",
        phone: "9876543213",
        branch: "CSE",
        cgpa: 8.5,
        status: "Not Placed",
        company: "",
        package: 0
    },

    {
        name: "Sneha Deshmukh",
        roll: "YCCE005",
        email: "sneha@example.com",
        phone: "9876543214",
        branch: "AIML",
        cgpa: 9.0,
        status: "Placed",
        company: "Accenture",
        package: 7.2
    }

];


/* ==========================================
   COMPANY DATA
========================================== */

const companies = [

    {
        name: "TCS",
        role: "Software Development",
        package: "8 LPA"
    },

    {
        name: "Infosys",
        role: "System Engineer",
        package: "6.5 LPA"
    },

    {
        name: "Accenture",
        role: "Associate Software Engineer",
        package: "7.2 LPA"
    },

    {
        name: "Capgemini",
        role: "Analyst",
        package: "5.5 LPA"
    },

    {
        name: "Deloitte",
        role: "Technology Analyst",
        package: "8.5 LPA"
    },

    {
        name: "Wipro",
        role: "Project Engineer",
        package: "5 LPA"
    }

];


/* ==========================================
   DOM ELEMENTS
========================================== */

const studentTableBody =
    document.getElementById("studentTableBody");

const studentSearch =
    document.getElementById("studentSearch");

const branchFilter =
    document.getElementById("branchFilter");

const statusFilter =
    document.getElementById("statusFilter");

const studentModal =
    document.getElementById("studentModal");

const profileModal =
    document.getElementById("profileModal");

const studentForm =
    document.getElementById("studentForm");


/* ==========================================
   SAVE DATA
========================================== */

function saveStudents() {

    localStorage.setItem(
        "ycceStudents",
        JSON.stringify(students)
    );

}


/* ==========================================
   DASHBOARD STATISTICS
========================================== */

function updateDashboard() {

    const total = students.length;

    const placed = students.filter(
        student => student.status === "Placed"
    ).length;

    const rate =
        total === 0
            ? 0
            : Math.round((placed / total) * 100);


    const packages = students
        .filter(student => student.package > 0)
        .map(student => student.package);


    const highest =
        packages.length
            ? Math.max(...packages)
            : 0;


    const average =
        packages.length
            ? packages.reduce((a, b) => a + b, 0)
              / packages.length
            : 0;


    document.getElementById("totalStudents")
        .textContent = total;


    document.getElementById("placedStudents")
        .textContent = placed;


    document.getElementById("totalCompanies")
        .textContent = companies.length;


    document.getElementById("highestPackage")
        .textContent = `₹${highest} LPA`;


    document.getElementById("placementRate")
        .textContent = `${rate}%`;


    document.getElementById("placementProgress")
        .style.width = `${rate}%`;


    document.getElementById("placedMini")
        .textContent = placed;


    document.getElementById("unplacedMini")
        .textContent = total - placed;


    document.getElementById("placementTotal")
        .textContent = total;


    document.getElementById("placementPlaced")
        .textContent = placed;


    document.getElementById("placementPercentage")
        .textContent = `${rate}%`;


    document.getElementById("averagePackage")
        .textContent =
        `₹${average.toFixed(2)} LPA`;

}


/* ==========================================
   DISPLAY STUDENTS
========================================== */

function renderStudents() {

    const search =
        studentSearch.value.toLowerCase();

    const branch =
        branchFilter.value;

    const status =
        statusFilter.value;


    const filteredStudents =
        students.filter(student => {

            const matchesSearch =

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search);


            const matchesBranch =
                branch === "all"
                || student.branch === branch;


            const matchesStatus =
                status === "all"
                || student.status === status;


            return (
                matchesSearch
                &&
                matchesBranch
                &&
                matchesStatus
            );

        });


    studentTableBody.innerHTML = "";


    if (filteredStudents.length === 0) {

        studentTableBody.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center;padding:40px">

                    No students found.

                </td>

            </tr>

        `;

        return;

    }


    filteredStudents.forEach((student) => {

        const originalIndex =
            students.indexOf(student);


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="student-name">

                    <div class="student-avatar">

                        ${student.name.charAt(0)}

                    </div>

                    <div>

                        <strong>
                            ${student.name}
                        </strong>

                        <small>
                            ${student.email}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${student.roll}
            </td>


            <td>
                ${student.branch}
            </td>


            <td>
                ${student.cgpa}
            </td>


            <td>

                <span class="badge
                    ${student.status === "Placed"
                        ? "placed"
                        : "not-placed"}">

                    ${student.status}

                </span>

            </td>


            <td>

                ${student.company || "—"}

            </td>


            <td>

                <button
                    class="action-btn view-btn"
                    onclick="viewStudent(${originalIndex})"
                    title="View">

                    <i class="fa-solid fa-eye"></i>

                </button>


                <button
                    class="action-btn edit-btn"
                    onclick="editStudent(${originalIndex})"
                    title="Edit">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${originalIndex})"
                    title="Delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });


    renderRecentStudents();

}


/* ==========================================
   RECENT STUDENTS
========================================== */

function renderRecentStudents() {

    const container =
        document.getElementById("recentStudents");


    const recent =
        students.slice(-4).reverse();


    container.innerHTML = "";


    recent.forEach(student => {

        container.innerHTML += `

            <div class="student-name"
                 style="margin-bottom:15px">

                <div class="student-avatar">

                    ${student.name.charAt(0)}

                </div>

                <div>

                    <strong>
                        ${student.name}
                    </strong>

                    <small>
                        ${student.branch}
                        • CGPA ${student.cgpa}
                    </small>

                </div>

            </div>

        `;

    });

}


/* ==========================================
   OPEN ADD STUDENT MODAL
========================================== */

function openStudentModal() {

    studentForm.reset();

    document.getElementById("editIndex")
        .value = "";

    document.getElementById("modalTitle")
        .textContent = "Add Student";


    studentModal.classList.add("active");

}


/* ==========================================
   CLOSE STUDENT MODAL
========================================== */

function closeStudentModal() {

    studentModal.classList.remove("active");

}


/* ==========================================
   ADD / EDIT STUDENT
========================================== */

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const editIndex =
            document.getElementById("editIndex").value;


        const student = {

            name:
                document.getElementById("studentName").value,

            roll:
                document.getElementById("studentRoll").value,

            email:
                document.getElementById("studentEmail").value,

            phone:
                document.getElementById("studentPhone").value,

            branch:
                document.getElementById("studentBranch").value,

            cgpa:
                parseFloat(
                    document.getElementById("studentCGPA").value
                ),

            status:
                document.getElementById("studentStatus").value,

            company:
                document.getElementById("studentCompany").value,

            package:
                0

        };


        if (editIndex === "") {

            students.push(student);

            showToast(
                "Student added successfully!"
            );

        } else {

            students[editIndex] = student;

            showToast(
                "Student updated successfully!"
            );

        }


        saveStudents();

        renderStudents();

        updateDashboard();

        closeStudentModal();

    }
);


/* ==========================================
   EDIT STUDENT
========================================== */

function editStudent(index) {

    const student =
        students[index];


    document.getElementById("modalTitle")
        .textContent = "Edit Student";


    document.getElementById("editIndex")
        .value = index;


    document.getElementById("studentName")
        .value = student.name;


    document.getElementById("studentRoll")
        .value = student.roll;


    document.getElementById("studentEmail")
        .value = student.email;


    document.getElementById("studentPhone")
        .value = student.phone;


    document.getElementById("studentBranch")
        .value = student.branch;


    document.getElementById("studentCGPA")
        .value = student.cgpa;


    document.getElementById("studentStatus")
        .value = student.status;


    document.getElementById("studentCompany")
        .value = student.company;


    studentModal.classList.add("active");

}


/* ==========================================
   DELETE STUDENT
========================================== */

function deleteStudent(index) {

    const student =
        students[index];


    if (
        confirm(
            `Are you sure you want to delete ${student.name}?`
        )
    ) {

        students.splice(index, 1);

        saveStudents();

        renderStudents();

        updateDashboard();

        showToast(
            "Student deleted successfully!"
        );

    }

}


/* ==========================================
   VIEW STUDENT
========================================== */

function viewStudent(index) {

    const student =
        students[index];


    document.getElementById("profileContent")
        .innerHTML = `

            <div class="profile-header">

                <div class="large-avatar">

                    ${student.name.charAt(0)}

                </div>

                <h2>
                    ${student.name}
                </h2>

                <p>
                    ${student.roll}
                </p>

            </div>


            <div class="profile-details">

                <div class="detail">

                    <span>Email</span>

                    ${student.email}

                </div>


                <div class="detail">

                    <span>Phone</span>

                    ${student.phone}

                </div>


                <div class="detail">

                    <span>Branch</span>

                    ${student.branch}

                </div>


                <div class="detail">

                    <span>CGPA</span>

                    ${student.cgpa}

                </div>


                <div class="detail">

                    <span>Status</span>

                    ${student.status}

                </div>


                <div class="detail">

                    <span>Company</span>

                    ${student.company || "Not placed"}

                </div>

            </div>

        `;


    profileModal.classList.add("active");

}


/* ==========================================
   CLOSE PROFILE
========================================== */

function closeProfileModal() {

    profileModal.classList.remove("active");

}


/* ==========================================
   COMPANIES
========================================== */

function renderCompanies() {

    const container =
        document.getElementById("companyGrid");


    container.innerHTML = "";


    companies.forEach(company => {

        container.innerHTML += `

            <div class="company-card">

                <div class="company-logo">

                    ${company.name.charAt(0)}

                </div>

                <h3>
                    ${company.name}
                </h3>

                <p>
                    ${company.role}
                </p>

                <strong>
                    ${company.package}
                </strong>

            </div>

        `;

    });

}


/* ==========================================
   NAVIGATION
========================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const section =
                this.dataset.section;


            showSection(section);


            navLinks.forEach(
                item =>
                    item.classList.remove("active")
            );


            this.classList.add("active");

        }
    );

});


function showSection(sectionId) {

    document
        .querySelectorAll(".content-section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document
        .getElementById(sectionId)
        .classList.add("active");


    const titles = {

        dashboard: "Dashboard",

        students: "Student Information",

        companies: "Recruiting Companies",

        placements: "Placement Statistics",

        announcements: "Announcements"

    };


    document.getElementById("pageTitle")
        .textContent = titles[sectionId];

}


/* ==========================================
   SEARCH
========================================== */

studentSearch.addEventListener(
    "input",
    renderStudents
);


branchFilter.addEventListener(
    "change",
    renderStudents
);


statusFilter.addEventListener(
    "change",
    renderStudents
);


/* ==========================================
   DARK MODE
========================================== */

document.getElementById("themeToggle")
    .addEventListener(
        "click",
        function() {

            document.body.classList.toggle("dark");


            const isDark =
                document.body.classList.contains("dark");


            this.innerHTML = isDark

                ? `<i class="fa-solid fa-sun"></i> Light Mode`

                : `<i class="fa-solid fa-moon"></i> Dark Mode`;

        }
    );


/* ==========================================
   MOBILE MENU
========================================== */

document.getElementById("menuBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("sidebar")
                .classList.toggle("open");

        }
    );


/* ==========================================
   EXPORT CSV
========================================== */

function exportCSV() {

    if (students.length === 0) {

        showToast("No student data to export.");

        return;

    }


    const headers = [

        "Name",
        "Roll Number",
        "Email",
        "Phone",
        "Branch",
        "CGPA",
        "Status",
        "Company"

    ];


    const rows =
        students.map(student => [

            student.name,
            student.roll,
            student.email,
            student.phone,
            student.branch,
            student.cgpa,
            student.status,
            student.company

        ]);


    const csv = [

        headers,

        ...rows

    ]

        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )

        .join("\n");


    const blob =
        new Blob(
            [csv],
            { type: "text/csv" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "YCCE_Student_Data.csv";


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Student data exported successfully!"
    );

}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.style.display = "block";


    setTimeout(
        () => {

            toast.style.display = "none";

        },
        2500
    );

}


/* ==========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================== */

studentModal.addEventListener(
    "click",
    function(event) {

        if (event.target === studentModal) {

            closeStudentModal();

        }

    }
);


profileModal.addEventListener(
    "click",
    function(event) {

        if (event.target === profileModal) {

            closeProfileModal();

        }

    }
);


/* ==========================================
   INITIALIZE APPLICATION
========================================== */

renderStudents();

renderCompanies();

updateDashboard();