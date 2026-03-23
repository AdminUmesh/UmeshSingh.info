function openPopup() {
    document.getElementById("profilePopup").style.display = "block";
}

function closePopup() {
    document.getElementById("profilePopup").style.display = "none";
}

// Optional: close when clicking outside
window.onclick = function(event) {
    let popup = document.getElementById("profilePopup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}