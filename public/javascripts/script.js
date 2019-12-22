/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("navtop");
    var searchBar = document.getElementById("bar")
    if (x.className === "topnav") {
      x.className += " responsive";
      x.style.display = "block";
    } else {
      x.className = "topnav";
      x.style.display = "flex";
    }
    if (searchBar.className === "searchBar") {
      searchBar.className += " responsive";
    } else {
      searchBar.className = "searchBar";
    }
  }