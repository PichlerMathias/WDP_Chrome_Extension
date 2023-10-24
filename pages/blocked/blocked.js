import * as websites from "../../db/websites.js";
import {getWebsiteList} from "../../db/websites.js";


function insertRow(website) {
    const table = document.getElementById('websiteTable');
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    const websiteCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    websiteCell.textContent = website;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        websites.removeWebsite(website, function () {

        });
        row.remove(); // Remove the row
    });
    actionCell.appendChild(deleteButton);

    row.appendChild(websiteCell);
    row.appendChild(actionCell);

    tbody.appendChild(row);
}

function refreshTable() {
    const table = document.getElementById('websiteTable');
    const tbody = table.querySelector('tbody');

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    getWebsiteList(function (websiteList) {

        websiteList.forEach(item => {
            insertRow(item);
        });
    });
}

refreshTable();

const addWebsiteForm = document.getElementById('addWebsiteForm');
addWebsiteForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input value
    const websiteInput = document.getElementById('websiteInput');
    const websiteUrl = websiteInput.value;

    // Check if the input is not empty
    if (websiteUrl.trim() !== '') {
        // Call the insertWebsite function with the URL


        websites.addWebsite(websiteUrl, function () {
            refreshTable();
        });

    }
});