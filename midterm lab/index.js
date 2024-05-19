document.addEventListener('DOMContentLoaded', function () {
    var firstMenuItem = document.getElementById('first-menu-item');

    function setImageNameToMenuItem(event) {
        var imageName = event.target.getAttribute('data-image-name');
        firstMenuItem.textContent = imageName;
    }

    var images = document.querySelectorAll('img');
    images.forEach(function (image) {
        image.addEventListener('mouseover', setImageNameToMenuItem);
    });

    function resetMenuItemText() {
        firstMenuItem.textContent = '|';
    }
    images.forEach(function (image) {
        image.addEventListener('mouseout', resetMenuItemText);
    });
});