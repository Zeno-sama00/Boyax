const ctx = document.getElementById('myChart').getContext('2d');

let chartData = {
    day: {
        labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
        datasets: [
            { label: 'Soil Moisture', data: [60, 62, 65, 67, 70, 73], borderColor: 'blue', fill: false },
            { label: 'Nitrogen', data: [20, 21, 22, 23, 24, 25], borderColor: 'green', fill: false },
            { label: 'Phosphorus', data: [15, 16, 16, 17, 18, 19], borderColor: 'purple', fill: false },
            { label: 'Potassium', data: [10, 11, 12, 12, 13, 14], borderColor: 'orange', fill: false }
        ]
    },
    week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            { label: 'Soil Moisture', data: [65, 67, 66, 68, 70, 72, 74], borderColor: 'blue', fill: false },
            { label: 'Nitrogen', data: [22, 23, 24, 24, 25, 26, 27], borderColor: 'green', fill: false },
            { label: 'Phosphorus', data: [16, 17, 17, 18, 19, 20, 21], borderColor: 'purple', fill: false },
            { label: 'Potassium', data: [12, 13, 14, 15, 15, 16, 17], borderColor: 'orange', fill: false }
        ]
    },
    month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            { label: 'Soil Moisture', data: [66, 67, 68, 69], borderColor: 'blue', fill: false },
            { label: 'Nitrogen', data: [23, 24, 25, 26], borderColor: 'green', fill: false },
            { label: 'Phosphorus', data: [17, 18, 19, 20], borderColor: 'purple', fill: false },
            { label: 'Potassium', data: [13, 14, 15, 16], borderColor: 'orange', fill: false }
        ]
    }
};

let myChart = new Chart(ctx, {
    type: 'line',
    data: chartData.day,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
        }
    }
});

function updateChart(period) {
    myChart.data = chartData[period];
    myChart.update();
}
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-option");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove "active" class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            // Add "active" class to the clicked button
            this.classList.add("active");
        });
    });
});
function updateMoistureLevel(value) {
    const circle = document.querySelector(".progress");
    const percentageText = document.getElementById("moisture-level");

    // Convert percentage to stroke-dashoffset value
    const maxStroke = 251.2; // Full circle length
    const offset = maxStroke - (value / 100) * maxStroke;

    // Use setProperty to update stroke-dashoffset
    circle.style.setProperty("stroke-dashoffset", offset);

    percentageText.textContent = value + "%";
}

// Example: Set initial moisture level (Can be updated from Firebase)
updateMoistureLevel(65);

document.addEventListener("DOMContentLoaded", function () {
    const newProductionBtn = document.getElementById("newProductionBtn");
    const newProductionPopup = document.getElementById("newProductionPopup");
    const calendarPopup = document.getElementById("calendarPopup");
    const nextStepBtn = document.getElementById("nextStepBtn");
    const confirmProductionBtn = document.getElementById("confirmProductionBtn");
    const closePopup = document.getElementById("closePopup");
    const closeCalendarPopup = document.getElementById("closeCalendarPopup");
    const productionTitle = document.getElementById("productionTitle");

    let productionName = "";

    // Open "New Production" Popup
    newProductionBtn.addEventListener("click", () => {
        newProductionPopup.style.display = "block";
    });

    // Close "New Production" Popup
    closePopup.addEventListener("click", () => {
        newProductionPopup.style.display = "none";
    });

    // Move to Calendar Popup
    nextStepBtn.addEventListener("click", () => {
        productionName = document.getElementById("productionName").value;
        if (productionName.trim() === "") {
            alert("Please enter a production name.");
            return;
        }
        newProductionPopup.style.display = "none";
        calendarPopup.style.display = "block";
    });

    // Close Calendar Popup
    closeCalendarPopup.addEventListener("click", () => {
        calendarPopup.style.display = "none";
    });

    // Confirm Production Start
    confirmProductionBtn.addEventListener("click", () => {
        const startDate = document.getElementById("startDate").value;

        if (startDate) {
            productionTitle.textContent = `Production: ${productionName} (Started on ${startDate})`;
            calendarPopup.style.display = "none";
        } else {
            alert("Please select a start date.");
        }
    });

    // End Production Button Click
    confirmEndProduction.addEventListener("click", () => {
        productionTitle.textContent = "No Production Started";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const endProductionBtn = document.getElementById("endProductionBtn");
    const endProductionModal = document.getElementById("endProductionModal");
    const confirmEndProduction = document.getElementById("confirmEndProduction");
    const cancelEndProduction = document.getElementById("cancelEndProduction");

    endProductionBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents unwanted page behavior
        endProductionModal.style.display = "flex"; // Show the confirmation modal
    });

    cancelEndProduction.addEventListener("click", function () {
        endProductionModal.style.display = "none"; // Hide the modal if user cancels
    });

    confirmEndProduction.addEventListener("click", function () {
        endProductionModal.style.display = "none"; // Close the modal
        setTimeout(() => {
            alert("Production has ended."); // Simulate ending production
        }, 100); // Small delay to ensure smooth transition

        // Here, add the logic to reset production if needed
        // Example: document.getElementById("productionName").textContent = "No Active Production";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profilePic");
    const profileDropdown = document.getElementById("profileDropdown");

    profilePic.addEventListener("click", function () {
        profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profilePic.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });
});

