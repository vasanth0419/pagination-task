# TASK PAGINATION SUMMITED..

#### **Pagination in DOM Manipulation using git hub details given..**

#### _CREATE A HTML FILE NAME_: `index.html`

##### In head tag add css `style.css` % bootstrap link....

#### Codes..

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
  </head>

```

##### codes in body tag

```
<body>
  <div class="container">
    <div class="container-fluid">
      <h1 id="title">PAGINATION EXAMPLES</h1>
      <br />
      <p id="description">Select Number Of Rows</p>
      <div class="form-group table-responsive">
        <select class="form-control" name="state" id="maxRows">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="70">70</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>

    <div class="container">
      <div class="container-fluid">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>

          <tbody id="paginated-list"></tbody>
        </table>
      </div>

      <div id="buttons" class="d-flex justify-content-center">
        <nav class="pagination-container">
          <button
            class="pagination-button"
            id="first-button"
            aria-label="First page"
            title="First page"
          >
            First
          </button>

          <button
            class="pagination-button"
            id="prev-button"
            aria-label="Previous page"
            title="Previous page"
          >
            Prev
          </button>

          <div id="pagination-numbers"></div>

          <button
            class="pagination-button"
            id="next-button"
            aria-label="Next page"
            title="Next page"
          >
            Next
          </button>

          <button
            class="pagination-button"
            id="last-button"
            aria-label="Last page"
            title="Last page"
          >
            Last
          </button>
        </nav>
      </div>
    </div>
  </div>
</body>

```

##### codes in script tag

###### code this inside the end of body tag

```
  <script src="./js/script.js"></script>
    <script src="https://app.zenclass.in/sheets/v1/js/zen/suite/bundle.js"></script>

</html>


```

#### codes in the `style.css` file

```
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #ddd !important;
  background-color: black;
  border-radius: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.table-class {
  margin-top: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
}

.pagination-button {
  display: inline-block;
  padding: 10px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f2f2f2;
  border-radius: 15px;
}

.pagination-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-number {
  display: inline-block;
  padding: 10px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.pagination-number.active {
  background-color: #4caf50;
  color: white;
}


```

#### create a js file `script.js`.

##### codes in file.

```
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
    );
    const data = await response.json();

    const placeholder = document.getElementById("paginated-list");
    const maxRowsSelect = document.getElementById("maxRows");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const firstButton = document.getElementById("first-button");
    const lastButton = document.getElementById("last-button");
    const paginationNumbers = document.getElementById("pagination-numbers");

    let currentPage = 1;
    let rowsPerPage = parseInt(maxRowsSelect.value, 10);

    const updateTable = () => {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const slicedData = data.slice(startIndex, endIndex);

      const listItems = slicedData
        .map(
          (item) => `
          <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
          </tr>
        `
        )
        .join("");

      placeholder.innerHTML = listItems;
    };

    const handlePageButtonsStatus = () => {
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage * rowsPerPage >= data.length;
      firstButton.disabled = currentPage === 1;
      lastButton.disabled = currentPage * rowsPerPage >= data.length;
    };

    const handleActivePageNumber = () => {
      const pageButtons = document.querySelectorAll(".pagination-number");
      pageButtons.forEach((button, index) => {
        button.classList.toggle("active", index + 1 === currentPage);
      });
    };

    const appendPageNumber = (index) => {
      const pageNumber = document.createElement("button");
      pageNumber.className = "pagination-number";
      pageNumber.innerHTML = index;
      pageNumber.addEventListener("click", () => {
        currentPage = index;
        updateTable();
        handlePageButtonsStatus();
        handleActivePageNumber();
      });
      paginationNumbers.appendChild(pageNumber);
    };

    const getPaginationNumbers = () => {
      paginationNumbers.innerHTML = "";
      const pageCount = Math.ceil(data.length / rowsPerPage);

      for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
      }
    };

    const handlePrevButtonClick = () => {
      if (currentPage > 1) {
        currentPage--;
        updateTable();
        handlePageButtonsStatus();
        handleActivePageNumber();
      }
    };

    const handleNextButtonClick = () => {
      if (currentPage * rowsPerPage < data.length) {
        currentPage++;
        updateTable();
        handlePageButtonsStatus();
        handleActivePageNumber();
      }
    };

    const handleFirstButtonClick = () => {
      currentPage = 1;
      updateTable();
      handlePageButtonsStatus();
      handleActivePageNumber();
    };

    const handleLastButtonClick = () => {
      const pageCount = Math.ceil(data.length / rowsPerPage);
      currentPage = pageCount;
      updateTable();
      handlePageButtonsStatus();
      handleActivePageNumber();
    };

    maxRowsSelect.addEventListener("change", () => {
      rowsPerPage = parseInt(maxRowsSelect.value, 10);
      currentPage = 1;
      updateTable();
      getPaginationNumbers();
      handlePageButtonsStatus();
      handleActivePageNumber();
    });

    prevButton.addEventListener("click", handlePrevButtonClick);
    nextButton.addEventListener("click", handleNextButtonClick);
    firstButton.addEventListener("click", handleFirstButtonClick);
    lastButton.addEventListener("click", handleLastButtonClick);

    // Initial setup
    updateTable();
    getPaginationNumbers();
    handlePageButtonsStatus();
    handleActivePageNumber();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

```
