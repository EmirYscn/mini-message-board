document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.querySelector('input[type="search"]');

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      if (!this.value) {
        window.location.href = "/";
      }
    });
  }

  searchForm.addEventListener("submit", function (event) {
    if (!searchInput.value.trim()) {
      event.preventDefault(); // Prevent form submission if input is empty
      window.location.href = "/"; // Redirect to homepage if search is cleared
    }
  });
});
