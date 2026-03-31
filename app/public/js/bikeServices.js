document.querySelectorAll(".bike-toggle-details").forEach(button => {
    button.addEventListener("click", () => {
        const bikeId = button.dataset.bikeId;
        const detailsRow = document.getElementById(`bike-details-${bikeId}`);

        if(detailsRow.style.display === "none") {
            detailsRow.style.display = "table-row";
        } else {
            detailsRow.style.display = "none";
        }
    });
});
