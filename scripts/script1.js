const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    // Liste de données simulées pour la recherche
    const data = ["Pizza", "Burger", "Sushi", "Pâtes", "Salade", "Steak", "Tacos", "Poulet", "Frites"];

    // Ouvrir le modal au clic sur l'icône de recherche
    document.getElementById("openSearchModal").addEventListener("click", function (event) {
        event.preventDefault();
        searchModal.show();
    });

    // Fermer le modal au scroll
    window.addEventListener("scroll", function () {
        searchModal.hide();
    });

    // Fonction de recherche
    function search() {
        let query = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = ""; 
        searchResults.style.display = "none";

        if (query === "") return;

        let results = data.filter(item => item.toLowerCase().includes(query));

        if (results.length > 0) {
            searchResults.style.display = "flex";
            results.forEach(result => {
                let p = document.createElement("p");
                p.textContent = result;
                searchResults.appendChild(p);
            });
        } else {
            searchResults.style.display = "flex";
            searchResults.innerHTML = "<p>Oups !  aucun résultat trouvé</p>";
        }
    }

    // Lancer la recherche au clic sur le bouton
    searchButton.addEventListener("click", search);

    // Lancer la recherche avec "Entrée"
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });

    // Fermer le modal si on clique en dehors
    document.getElementById("searchModal").addEventListener("click", function (event) {
        if (event.target === document.getElementById("searchModal")) {
            searchModal.hide();
        }
    });

    // Fermer avec la touche Échap
    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            searchModal.hide();
        }
    });


    document.addEventListener("DOMContentLoaded", function () {
        let searchModal = document.getElementById("searchModal");
        let searchInput = document.getElementById("searchInput"); // Champ de recherche
        let searchResults = document.getElementById("searchResults"); // Conteneur des résultats
    
        // Écoute la fermeture du modal
        searchModal.addEventListener("hidden.bs.modal", function () {
            // Réinitialise le champ de recherche
            searchInput.value = "";
    
            // Cache les résultats et remet le contenu à zéro
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
        });
    });



    // modal de footer 

  
document.addEventListener('DOMContentLoaded', function () {
    
    const links = document.querySelectorAll('.footer-search-icon a');

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const imageSrc = link.getAttribute('href');  
            openModal(imageSrc);
        });
    });
});


function openModal(imageSrc) {
    document.getElementById("modalImage").src = imageSrc;
    var myModal = new bootstrap.Modal(document.getElementById('imageModal'));
    myModal.show();
}




// panier et commande 






