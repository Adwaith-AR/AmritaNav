/* =========================================================
   AMRITANAV - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   ROOM DATABASE
   ========================================================= */
const rooms = {

    /* =========================
       N BLOCK
       ========================= */

    "N001": {
        name: "Admission Office",
        floor: "ground",
        marker: "marker-N001"
    },
    "N-001": {
        name: "Admission Office",
        floor: "ground",
        marker: "marker-N001"
    },

    "N002": {
        name: "Mechanical Professors Room",
        floor: "ground",
        marker: "marker-N002"
    },
    "N-002": {
        name: "Mechanical Professors Room",
        floor: "ground",
        marker: "marker-N002"
    },

    "N003": {
        name: "CR Seminar Room",
        floor: "ground",
        marker: "marker-N003"
    },
    "N-003": {
        name: "CR Seminar Room",
        floor: "ground",
        marker: "marker-N003"
    },

    "N004": {
        name: "Amrita Center for Nano Sciences",
        floor: "ground",
        marker: "marker-N004"
    },
    "N-004": {
        name: "Amrita Center for Nano Sciences",
        floor: "ground",
        marker: "marker-N004"
    },

    "N005-006": {
        name: "Nano Science Storage / Module Research Lab",
        floor: "ground",
        marker: "marker-N005006"
    },
    "N-005-006": {
        name: "Nano Science Storage / Module Research Lab",
        floor: "ground",
        marker: "marker-N005006"
    },

    "N007": {
        name: "Thermal Engineering Lab",
        floor: "ground",
        marker: "marker-N007"
    },
    "N-007": {
        name: "Thermal Engineering Lab",
        floor: "ground",
        marker: "marker-N007"
    },

    "N008": {
        name: "M Tech Lab",
        floor: "ground",
        marker: "marker-N008"
    },
    "N-008": {
        name: "M Tech Lab",
        floor: "ground",
        marker: "marker-N008"
    },

    "N009": {
        name: "Amrita Center",
        floor: "ground",
        marker: "marker-N009"
    },
    "N-009": {
        name: "Amrita Center",
        floor: "ground",
        marker: "marker-N009"
    },

    "N010": {
        name: "Staff Room",
        floor: "ground",
        marker: "marker-N010"
    },
    "N-010": {
        name: "Staff Room",
        floor: "ground",
        marker: "marker-N010"
    },

    "N011": {
        name: "Student Affairs",
        floor: "ground",
        marker: "marker-N011"
    },
    "N-011": {
        name: "Student Affairs",
        floor: "ground",
        marker: "marker-N011"
    },

    "N012": {
        name: "HR Department",
        floor: "ground",
        marker: "marker-N012"
    },
    "N-012": {
        name: "HR Department",
        floor: "ground",
        marker: "marker-N012"
    },

    "N013": {
        name: "Principal",
        floor: "ground",
        marker: "marker-N013"
    },
    "N-013": {
        name: "Principal",
        floor: "ground",
        marker: "marker-N013"
    },

    "N014": {
        name: "Machinery Lab",
        floor: "ground",
        marker: "marker-N014"
    },
    "N-014": {
        name: "Machinery Lab",
        floor: "ground",
        marker: "marker-N014"
    },

    "N015": {
        name: "Fluid Mechanics Lab",
        floor: "ground",
        marker: "marker-N015"
    },
    "N-015": {
        name: "Fluid Mechanics Lab",
        floor: "ground",
        marker: "marker-N015"
    },

    "N016": {
        name: "CAE Cell",
        floor: "ground",
        marker: "marker-N016"
    },
    "N-016": {
        name: "CAE Cell",
        floor: "ground",
        marker: "marker-N016"
    },

    "N017": {
        name: "MC Dynamics Lab",
        floor: "ground",
        marker: "marker-N017"
    },
    "N-017": {
        name: "MC Dynamics Lab",
        floor: "ground",
        marker: "marker-N017"
    },

    "N019": {
        name: "Electrical Machines Lab",
        floor: "ground",
        marker: "marker-N019"
    },
    "N-019": {
        name: "Electrical Machines Lab",
        floor: "ground",
        marker: "marker-N019"
    },

    "N020": {
        name: "Prayer Hall",
        floor: "ground",
        marker: "marker-N020"
    },
    "N-020": {
        name: "Prayer Hall",
        floor: "ground",
        marker: "marker-N020"
    },


    /* =========================
       S BLOCK
       ========================= */

    "S001": {
        name: "S-001",
        floor: "ground",
        marker: "marker-S001"
    },
    "S-001": {
        name: "S-001",
        floor: "ground",
        marker: "marker-S001"
    },

    "S002": {
        name: "S-002",
        floor: "ground",
        marker: "marker-S002"
    },
    "S-002": {
        name: "S-002",
        floor: "ground",
        marker: "marker-S002"
    },

    "S003": {
        name: "S-003",
        floor: "ground",
        marker: "marker-S003"
    },
    "S-003": {
        name: "S-003",
        floor: "ground",
        marker: "marker-S003"
    },

    "S004": {
        name: "S-004",
        floor: "ground",
        marker: "marker-S004"
    },
    "S-004": {
        name: "S-004",
        floor: "ground",
        marker: "marker-S004"
    },

    "S004A": {
        name: "S-004A",
        floor: "ground",
        marker: "marker-S004A"
    },
    "S-004A": {
        name: "S-004A",
        floor: "ground",
        marker: "marker-S004A"
    },

    "S005": {
        name: "Material Testing Lab",
        floor: "ground",
        marker: "marker-S005"
    },
    "S-005": {
        name: "Material Testing Lab",
        floor: "ground",
        marker: "marker-S005"
    },

    "S006": {
        name: "Staff Room",
        floor: "ground",
        marker: "marker-S006"
    },
    "S-006": {
        name: "Staff Room",
        floor: "ground",
        marker: "marker-S006"
    },

    "S007": {
        name: "Director / Associate Dean",
        floor: "ground",
        marker: "marker-S007"
    },
    "S-007": {
        name: "Director / Associate Dean",
        floor: "ground",
        marker: "marker-S007"
    },

    "S008": {
        name: "Principal Arts & Science",
        floor: "ground",
        marker: "marker-S008"
    },
    "S-008": {
        name: "Principal Arts & Science",
        floor: "ground",
        marker: "marker-S008"
    },

    "S009": {
        name: "S-009",
        floor: "ground",
        marker: "marker-S009"
    },
    "S-009": {
        name: "S-009",
        floor: "ground",
        marker: "marker-S009"
    },

    "S010": {
        name: "Conference Room",
        floor: "ground",
        marker: "marker-S010"
    },
    "S-010": {
        name: "Conference Room",
        floor: "ground",
        marker: "marker-S010"
    },

    "S011": {
        name: "CNC Robotics & Automation Lab",
        floor: "ground",
        marker: "marker-S011"
    },
    "S-011": {
        name: "CNC Robotics & Automation Lab",
        floor: "ground",
        marker: "marker-S011"
    },

    "S012": {
        name: "College Admin Office",
        floor: "ground",
        marker: "marker-S012"
    },
    "S-012": {
        name: "College Admin Office",
        floor: "ground",
        marker: "marker-S012"
    },

    "S013": {
        name: "Computer Lab",
        floor: "ground",
        marker: "marker-S013"
    },
    "S-013": {
        name: "Computer Lab",
        floor: "ground",
        marker: "marker-S013"
    },

    "S014": {
        name: "Nanotech Lab",
        floor: "ground",
        marker: "marker-S014"
    },
    "S-014": {
        name: "Nanotech Lab",
        floor: "ground",
        marker: "marker-S014"
    },


    /* =========================
       A BLOCK
       ========================= */

    "A001": {
        name: "A-001",
        floor: "ground",
        marker: "marker-A001"
    },
    "A-001": {
        name: "A-001",
        floor: "ground",
        marker: "marker-A001"
    },

    "A002": {
        name: "A-002",
        floor: "ground",
        marker: "marker-A002"
    },
    "A-002": {
        name: "A-002",
        floor: "ground",
        marker: "marker-A002"
    },

    "A003": {
        name: "A-003",
        floor: "ground",
        marker: "marker-A003"
    },
    "A-003": {
        name: "A-003",
        floor: "ground",
        marker: "marker-A003"
    },

    "A004": {
        name: "A-004",
        floor: "ground",
        marker: "marker-A004"
    },
    "A-004": {
        name: "A-004",
        floor: "ground",
        marker: "marker-A004"
    },

    "A005": {
        name: "A-005",
        floor: "ground",
        marker: "marker-A005"
    },
    "A-005": {
        name: "A-005",
        floor: "ground",
        marker: "marker-A005"
    },

    "A006": {
        name: "A-006",
        floor: "ground",
        marker: "marker-A006"
    },
    "A-006": {
        name: "A-006",
        floor: "ground",
        marker: "marker-A006"
    }
};


/* =========================================================
   FLOOR SWITCHING
   ========================================================= */

function showFloor(floor) {

    const groundWrapper =
        document.getElementById("groundMapWrapper");

    const secondWrapper =
        document.getElementById("secondMapWrapper");

    const groundMap =
        document.getElementById("groundMap");

    const secondMap =
        document.getElementById("secondMap");

    const groundBtn =
        document.getElementById("groundBtn");

    const secondBtn =
        document.getElementById("secondBtn");

    const floorTitle =
        document.getElementById("floorTitle");


    if (floor === "ground") {

        groundWrapper.classList.add("active-wrapper");
        secondWrapper.classList.remove("active-wrapper");

        groundMap.classList.add("active-map");
        secondMap.classList.remove("active-map");

        groundBtn.classList.add("active");
        secondBtn.classList.remove("active");

        floorTitle.textContent = "Ground Floor";

    }


    if (floor === "second") {

        secondWrapper.classList.add("active-wrapper");
        groundWrapper.classList.remove("active-wrapper");

        secondMap.classList.add("active-map");
        groundMap.classList.remove("active-map");

        secondBtn.classList.add("active");
        groundBtn.classList.remove("active");

        floorTitle.textContent = "Second Floor";

    }

}


/* =========================================================
   REMOVE ALL HIGHLIGHTS
   ========================================================= */

function clearHighlights() {

    document
        .querySelectorAll(".room-marker")
        .forEach(function(marker) {

            marker.classList.remove("selected");

        });

}


/* =========================================================
   HIGHLIGHT ROOM
   ========================================================= */

function highlightRoom(markerId) {

    clearHighlights();

    if (!markerId) {
        return;
    }

    const marker =
        document.getElementById(markerId);

    if (marker) {

        marker.classList.add("selected");

        return marker;

    }

    return null;
}


/* =========================================================
   SEARCH ROOM
   ========================================================= */

function searchRoom() {

    const input =
        document.getElementById("roomSearch");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultText =
        document.getElementById("resultText");

    const mapView =
        document.querySelector(".map-view");


    let search =
        input.value.trim().toUpperCase();


    /* Empty search */

    if (search === "") {

        clearHighlights();

        resultTitle.textContent =
            "Search for a location";

        resultText.textContent =
            "Enter a room number or location above.";

        return;

    }


    /* Allow S013 as well as S-013 */

    if (!search.includes("-") && search.length > 1) {

        search =
            search.charAt(0) +
            "-" +
            search.substring(1);

    }


    const room =
        rooms[search];


    /* Room not found */

    if (!room) {

        clearHighlights();

        resultTitle.textContent =
            "Location not found";

        resultText.textContent =
            "We couldn't find that room. Try S-013.";

        return;

    }


    /* Switch floor */

    showFloor(room.floor);


    /* Highlight */

    const marker =
        highlightRoom(room.marker);


    /* Update result */

    resultTitle.textContent =
        room.name;

    resultText.textContent =
        "Room " +
        search +
        " • " +
        (room.floor === "ground"
            ? "Ground Floor"
            : "Second Floor");


    /* Scroll map to room */

    if (marker && mapView) {

        setTimeout(function() {

            const markerTop =
                marker.offsetTop;

            const markerHeight =
                marker.offsetHeight;

            const mapHeight =
                mapView.clientHeight;


            mapView.scrollTo({

                top:
                    markerTop -
                    (mapHeight / 2) +
                    (markerHeight / 2),

                behavior: "smooth"

            });

        }, 200);

    }

}


/* =========================================================
   CLICK ROOM MARKER
   ========================================================= */

function selectRoom(roomNumber) {

    const room =
        rooms[roomNumber];


    if (!room) {
        return;
    }


    /* Switch floor */

    showFloor(room.floor);


    /* Highlight */

    const marker =
        highlightRoom(room.marker);


    /* Update result */

    document.getElementById("resultTitle").textContent =
        roomNumber + " — " + room.name;

    document.getElementById("resultText").textContent =
        room.name +
        " • " +
        (room.floor === "ground"
            ? "Ground Floor"
            : "Second Floor");


    /* Scroll map to selected room */

    const mapView =
        document.querySelector(".map-view");


    if (marker && mapView) {

        setTimeout(function() {

            const markerTop =
                marker.offsetTop;

            const markerHeight =
                marker.offsetHeight;

            const mapHeight =
                mapView.clientHeight;


            mapView.scrollTo({

                top:
                    markerTop -
                    (mapHeight / 2) +
                    (markerHeight / 2),

                behavior: "smooth"

            });

        }, 200);

    }

}


/* =========================================================
   ENTER KEY SEARCH
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    const searchInput =
        document.getElementById("roomSearch");


    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchRoom();

            }

        }
    );

});