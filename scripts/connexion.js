document.addEventListener("DOMContentLoaded", () => {
    chargerPanier();
    mettreAJourPanierCount();

    // Ajouter au panier
    document.querySelectorAll(".ajouter-panier").forEach(button => {
        button.addEventListener("click", (e) => {
            const plat = e.target.closest(".plat");
            const nom = plat.querySelector("h3").innerText;
            const prix = parseFloat(plat.querySelector(".prix").innerText.replace("DT", ""));
            const image = plat.querySelector("img").src;
            ajouterAuPanier({ nom, prix, image });
        });
    });
});

// Ajouter un plat au panier
function ajouterAuPanier(plat) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let existant = panier.find(p => p.nom === plat.nom);
    if (existant) {
        existant.quantite++;
    } else {
        plat.quantite = 1;
        panier.push(plat);
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    mettreAJourPanierCount();
    chargerPanier();  // Mise à jour du panier après ajout
}

// Charger le panier
function chargerPanier() {
    const panierPage = document.getElementById("panier");
    if (!panierPage) return;

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panierPage.innerHTML = "";

    panier.forEach((plat, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${plat.image}" alt="${plat.nom}" width="50"> <span>${plat.nom}</span></td>
            <td>${plat.prix} DT</td>
            <td><input type="number"  value="${plat.quantite}" min="1" onchange="modifierQuantite(${index}, this.value)"></td>
            <td>${(plat.prix * plat.quantite).toFixed(2)} DT</td>
            <td><button class="btn-supprimer" onclick="supprimerDuPanier(${index})">Supprimer</button></td>
        `;
        panierPage.appendChild(row);
    });

    mettreAJourTotal();
    mettreAJourBoutonViderPanier();
}

// Modifier la quantité
function modifierQuantite(index, nouvelleQuantite) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let quantite = parseInt(nouvelleQuantite);

    // Si la quantité est inférieure à 1, on la remet à 1
    if (quantite < 1) {
        quantite = 1;
    }

    panier[index].quantite = quantite;
    localStorage.setItem("panier", JSON.stringify(panier));
    chargerPanier();
    mettreAJourPanierCount();
}

// Mettre à jour le compteur du panier
function mettreAJourPanierCount() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = panier.reduce((sum, p) => sum + p.quantite, 0);

    document.querySelectorAll(".cart-badge").forEach(badge => {
        badge.innerText = total;
    });
}

// Supprimer un plat du panier
function supprimerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    chargerPanier();
    mettreAJourPanierCount();
}

// Mettre à jour le total
function mettreAJourTotal() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = panier.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.innerText = `Total : ${total.toFixed(2)} DT`;
    }
}


// Afficher le modal de confirmation avant de vider le panier
function demanderConfirmationViderPanier() {
    const confirmViderPanierModal = document.getElementById('confirmViderPanier');
    if (confirmViderPanierModal) {
        let modal = new bootstrap.Modal(confirmViderPanierModal);
        modal.show();
    }
}

// Fonction qui vide réellement le panier après confirmation
function viderPanier() {
    localStorage.removeItem("panier");
    chargerPanier();
    mettreAJourPanierCount();

    // Fermer le modal après suppression
    const confirmViderPanierModal = document.getElementById('confirmViderPanier');
    if (confirmViderPanierModal) {
        let modal = bootstrap.Modal.getInstance(confirmViderPanierModal);
        if (modal) {
            modal.hide();
        }
    }
}

// Écouteur d'événement pour le bouton "Vider le panier" dans le modal
document.addEventListener("DOMContentLoaded", () => {
    const confirmViderBtn = document.getElementById("confirmVider");
    if (confirmViderBtn) {
        confirmViderBtn.addEventListener("click", viderPanier);
    }
});


// Vérifier si le panier est vide et désactiver le bouton "Vider le panier"
function mettreAJourBoutonViderPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let boutonVider = document.getElementById("btnViderPanier");

    if (boutonVider) {
        if (panier.length === 0) {
            boutonVider.setAttribute("disabled", "disabled");
        } else {
            boutonVider.removeAttribute("disabled");
        }
    }
}





// mes favoris

document.addEventListener("DOMContentLoaded", () => {
    chargerFavoris(); // Charger les favoris au chargement de la page

    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", function () {
            let platElement = this.closest(".plat");

            if (!platElement) {
                console.error("Élément plat introuvable !");
                return;
            }

            // Récupérer les infos dynamiquement depuis le HTML
            let plat = {
                id: platElement.getAttribute("data-id") || Math.random().toString(36).substr(2, 9),
                nom: platElement.querySelector("h3")?.innerText.trim() || "Nom inconnu",
                prix: platElement.querySelector(".prix")?.innerText.trim() || "Prix inconnu",
                image: platElement.querySelector("img")?.getAttribute("src") || "",
                description: platElement.querySelector(".plat-info")?.innerText.trim() || ""
            };

            console.log(plat); // Vérifie si les données sont bien récupérées

            toggleFavori(this, plat);
        });
    });

    // Si on est sur la page "Mes Favoris", charger les favoris
    if (document.getElementById("favoris-list")) {
        afficherFavoris();
    }
});

// Fonction pour ajouter ou retirer un plat des favoris
function toggleFavori(button, plat) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    let index = favoris.findIndex(p => p.id === plat.id);

    if (index === -1) {
        // Ajouter aux favoris
        favoris.push(plat);
        button.classList.add("liked");
        button.innerHTML = '<i class="bi bi-heart-fill"></i>'; // Icône cœur rempli rouge
    } else {
        // Retirer des favoris
        favoris.splice(index, 1);
        button.classList.remove("liked");
        button.innerHTML = '<i class="bi bi-heart" ></i>'; // Icône cœur vide
    }

    localStorage.setItem("favoris", JSON.stringify(favoris));

    // Rafraîchir la liste des favoris si on est sur la page "Mes Favoris"
    if (document.getElementById("favoris-list")) {
        afficherFavoris();
    }
}

// Charger les favoris et mettre à jour les boutons "Like"
function chargerFavoris() {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    document.querySelectorAll(".like-btn").forEach(button => {
        let platElement = button.closest(".plat");
        let platId = platElement.getAttribute("data-id");

        let estFavori = favoris.some(p => p.id === platId);

        if (estFavori) {
            button.classList.add("liked");
            button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        }
    });
}
// Fonction pour afficher les favoris dans la page "Mes Favoris"
function afficherFavoris() {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    let favorisList = document.getElementById("favoris-list");
    let viderFavorisBtn = document.getElementById("vider-favoris");

    if (!favorisList) return; // Si l'élément n'existe pas, ne pas continuer

    favorisList.innerHTML = ""; // Vider la liste avant de la remplir

    if (favoris.length === 0) {
        favorisList.innerHTML = "<p class='favoris-vide'>Oups 😔 vous n'avez aucun plat en favoris.<br>Likez les plats pour les ajouter à votre liste !</p>";
        if (viderFavorisBtn) {
            viderFavorisBtn.disabled = true; // Désactiver le bouton si la liste est vide
        }
        return;
    }

    if (viderFavorisBtn) {
        viderFavorisBtn.disabled = false; // Activer le bouton si la liste n'est pas vide
    }

    favoris.forEach(plat => {
        let platHTML = `
            <div class="col-md-6 col-lg-3">
                <div class="plat" data-id="${plat.id}">
                    <div class="img-contanair">
                        <img src="${plat.image}" alt="${plat.nom}">
                        <p class="plat-info">${plat.description}</p>
                    </div>
                    <div class="title-detail">
                        <h3>${plat.nom}</h3>
                        <p class="prix">${plat.prix}</p>
                    </div>
                    <div class="ajout-prix">
                        <button class="ajouter-panier"><i class="bi bi-bag"></i> Commander</button>
                        <div class="btn-detail">
                            <button class="like-btn liked" onclick="supprimerFavori('${plat.id}')"> 
                                <i class="bi bi-heart-fill"></i>
                            </button>
                            <button class="detail" data-bs-toggle="tooltip" title="Voir les détails">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        favorisList.innerHTML += platHTML;
    });
}

// Fonction pour vider tous les favoris après confirmation du modal
document.addEventListener("DOMContentLoaded", () => {
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", function () {
            localStorage.removeItem("favoris"); // Supprime tous les favoris du stockage
            afficherFavoris(); // Mettre à jour l'affichage
            const confirmDeleteModal = document.getElementById("confirmDeleteModal");
            if (confirmDeleteModal) {
                let modal = bootstrap.Modal.getInstance(confirmDeleteModal);
                if (modal) {
                    modal.hide(); // Fermer le modal après suppression
                }
            }
        });
    }
});

// Charger les favoris au chargement de la page
document.addEventListener("DOMContentLoaded", afficherFavoris);

function supprimerFavori(id) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris = favoris.filter(plat => plat.id !== id);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris(); // Mettre à jour l'affichage
}






