import * as websites from "../../db/websites.js";
import {getWebsiteList} from "../../db/websites.js";

// adds row to table of blocked websites
function insertRow(website) {
    const table = document.getElementById('websiteTable');
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    const websiteCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    row.classList.add('website-row');

    websiteCell.textContent = website;
    websiteCell.classList.add('website-cell');

    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('custombtn');
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

// event listener for form
addWebsiteForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const websiteInput = document.getElementById('websiteInput');
    const websiteUrl = websiteInput.value;

    // Check if the input is not empty
    if (websiteUrl.trim() !== '') {
        websites.addWebsite(websiteUrl, function () {
            refreshTable();
        });
    }
});
