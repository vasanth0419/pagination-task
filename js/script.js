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
