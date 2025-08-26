document.addEventListener("DOMContentLoaded", function() {
    const panierSection = document.getElementById("panier-section");
    const commandeSection = document.getElementById("commande-section");
    const confirmationSection = document.getElementById("confirmation-section");
    const genererPdfBtn = document.getElementById("genererPdf");
    const annulerCommandeBtn = document.getElementById("annulerCommande");
    const messageAnnulation = document.getElementById("messageAnnulation");
    const btnCommander = document.getElementById("btnCommander");
    const next1 = document.getElementById("next1");
    const prev1 = document.getElementById("prev1");
    const prev2 = document.getElementById("prev2");
    const retourPanier = document.getElementById("retourPanier");
    const confirmValidation = document.getElementById("confirmValidation");
    const countdownElement = document.getElementById("countdown");

    let timeCommandeValidee = localStorage.getItem("timeCommandeValidee");
    let countdownInterval;

    // Charger la section active enregistrée
    chargerSectionActive();

    if (genererPdfBtn) {
        genererPdfBtn.addEventListener("click", function () {
            genererFacturePDF();
        });
    }

    // Vérification et passage à la commande
    if (btnCommander) {
        btnCommander.addEventListener("click", function() {
            let panier = JSON.parse(localStorage.getItem("panier")) || [];
            if (panier.length === 0) {
                let modal = new bootstrap.Modal(document.getElementById('confirmPanierVide'));
                modal.show();
            } else {
                panierSection.classList.add("hidden");
                commandeSection.classList.remove("hidden");
                enregistrerSectionActive("commande-section");
            }
        });
    }

    // Affichage du modal avant de passer à la confirmation
    if (next1) {
        next1.addEventListener("click", function() {
            if (validerFormulaire()) {
                let modal = new bootstrap.Modal(document.getElementById('confirmValidationModal'));
                modal.show();
            }
        });
    }

    // Validation et passage à la confirmation après le clic sur "Oui, valider"
    if (confirmValidation) {
        confirmValidation.addEventListener("click", function() {
            let modalElement = document.getElementById('confirmValidationModal');
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();

            let nomComplet = document.getElementById("nom-complet").value;
            let adresse = document.getElementById("adresse").value;
            let modePaiement = document.getElementById("mode-paiement").value;

            localStorage.setItem("nomComplet", nomComplet);
            localStorage.setItem("adresse", adresse);
            localStorage.setItem("modePaiement", modePaiement); 

            commandeSection.classList.add("hidden");
            confirmationSection.classList.remove("hidden");
            enregistrerSectionActive("confirmation-section");
            genererFacture();

            // Enregistrer l'heure de validation de la commande
            let currentTime = Date.now();
            localStorage.setItem("timeCommandeValidee", currentTime);
            annulerCommandeBtn.classList.remove('disabled');

            // Désactiver le bouton d'annulation après 3 minutes
            startCountdown();
        });
    }

    // Retour à la commande
    if (prev1) {
        prev1.addEventListener("click", function() {
            commandeSection.classList.add("hidden");
            panierSection.classList.remove("hidden");
            enregistrerSectionActive("panier-section");
        });
    }

    // Retour au formulaire de commande
    if (prev2) {
        prev2.addEventListener("click", function() {
            confirmationSection.classList.add("hidden");
            commandeSection.classList.remove("hidden");
            enregistrerSectionActive("commande-section");
        });
    }

    // Retour au panier avec confirmation
    if (retourPanier) {
        retourPanier.addEventListener("click", function() {
            let modal = new bootstrap.Modal(document.getElementById('confirmRetourPanierModal'));
            modal.show();

            const confirmerRetour = document.getElementById("confirmerRetour");
            confirmerRetour.addEventListener("click", function() {
                localStorage.removeItem("panier");
                document.getElementById("panier").innerHTML = "";
                document.getElementById("total").textContent = "Total : 0.00 DT";
                confirmationSection.classList.add("hidden");
                panierSection.classList.remove("hidden");
                enregistrerSectionActive("panier-section");
                mettreAJourBoutonViderPanier();
                mettreAJourPanierCount();
                effacerFacture();

                // Réactiver le bouton d'annulation
                annulerCommandeBtn.disabled = false;
                annulerCommandeBtn.classList.remove('disabled');
                clearInterval(countdownInterval);
                countdownElement.textContent = "";
                localStorage.removeItem("timeCommandeValidee");

                modal.hide();
            });
        });
    }

    // Modal de confirmation d'annulation de commande
    if (annulerCommandeBtn) {
        annulerCommandeBtn.addEventListener("click", function() {
            let modal = new bootstrap.Modal(document.getElementById('confirmAnnulationModal'));
            modal.show();
        });
    }

    // Si l'utilisateur valide l'annulation de la commande
    const confirmAnnulation = document.getElementById("confirmAnnulation");
    if (confirmAnnulation) {
        confirmAnnulation.addEventListener("click", function() {
            let modalElement = document.getElementById('confirmAnnulationModal');
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();

            let modePaiement = localStorage.getItem("modePaiement");
            
            if (modePaiement === "livraison") {
                messageAnnulation.textContent = "Commande annulée. Vous payiez à la livraison.";
            } else {
                messageAnnulation.textContent = "Commande annulée. Votre argent a été remboursé.";
            }
            messageAnnulation.style.display = "block";

            setTimeout(function() {
                messageAnnulation.style.display = "none";
            }, 15000);

            localStorage.removeItem("panier");
            document.getElementById("panier").innerHTML = "";
            document.getElementById("total").textContent = "Total : 0.00 DT";
            confirmationSection.classList.add("hidden");
            panierSection.classList.remove("hidden");
            enregistrerSectionActive("panier-section");

            effacerFacture();
            mettreAJourBoutonViderPanier();
            mettreAJourPanierCount();

            // Réactiver le bouton d'annulation
            annulerCommandeBtn.disabled = false;
            annulerCommandeBtn.classList.remove('disabled');
            clearInterval(countdownInterval);
            countdownElement.textContent = "";
            localStorage.removeItem("timeCommandeValidee");
        });
    }

    // Fonction pour démarrer le compte à rebours
    function startCountdown() {
        let timeCommandeValidee = localStorage.getItem("timeCommandeValidee");
        if (timeCommandeValidee) {
            let currentTime = Date.now();
            let elapsedTime = currentTime - timeCommandeValidee;
            let remainingTime = 180000 - elapsedTime;

            if (remainingTime > 0) {
                countdownInterval = setInterval(function() {
                    remainingTime -= 1000;
                    if (remainingTime <= 0) {
                        clearInterval(countdownInterval);
                        annulerCommandeBtn.disabled = true;
                        annulerCommandeBtn.classList.add('disabled');
                        countdownElement.textContent = "Annulation impossible";
                    } else {
                        let minutes = Math.floor(remainingTime / 60000);
                        let seconds = Math.floor((remainingTime % 60000) / 1000);
                        countdownElement.textContent = `Annulation possible : ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                    }
                }, 1000);
            } else {
                annulerCommandeBtn.disabled = true;
                annulerCommandeBtn.classList.add('disabled');
                countdownElement.textContent = "Annulation impossible";
            }
        }
    }

    // Démarrer le compte à rebours au chargement de la page
    if (timeCommandeValidee) {
        startCountdown();
    }

    // Gestion du type de contact
    const contactType = document.getElementById("contact-type");
    if (contactType) {
        contactType.addEventListener("change", function() {
            document.getElementById("tel-field").classList.toggle("d-none", this.value !== "tel");
            document.getElementById("email-field").classList.toggle("d-none", this.value !== "email");
        });
    }

    // Affichage conditionnel de la section paiement
    const modePaiement = document.getElementById("mode-paiement");
    if (modePaiement) {
        modePaiement.addEventListener("change", function() {
            document.getElementById("paiement-section").classList.toggle("hidden", this.value !== "carte");
        });
    }

    function validerFormulaire() {
        let isValid = true;
    
        function verifierChamp(id, regex) {
            let champ = document.getElementById(id);
            let erreur = document.getElementById(id + "-error");
            if (!regex.test(champ.value.trim())) {
                erreur.style.display = "block";
                isValid = false;
            } else {
                erreur.style.display = "none";
            }
        }
    
        verifierChamp("adresse", /.+/);
        verifierChamp("nom-complet", /^[a-zA-Z\s]+$/);
    
        if (contactType) {
            let contactTypeValue = contactType.value;
            if (contactTypeValue === "tel") {
                verifierChamp("telephone", /^\d{8,15}$/);
            } else {
                verifierChamp("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            }
        }
    
        if (modePaiement && modePaiement.value === "carte") {
            verifierChamp("numero-carte", /^\d{16}$/);
            verifierChamp("expiration", /^(0[1-9]|1[0-2])\/(\d{2})$/);
            verifierChamp("cvv", /^\d{3}$/);
        }
    
        return isValid;
    }

    function genererFacture() {
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        let factureBody = document.getElementById("facture-body");
        let sousTotalElem = document.getElementById("sous-total");
        let totalCommandeElem = document.getElementById("total-commande");
    
        let nomComplet = localStorage.getItem("nomComplet");
        let adresse = localStorage.getItem("adresse");
        let modePaiement = localStorage.getItem("modePaiement");
    
        if (!factureBody || !sousTotalElem || !totalCommandeElem) return;
    
        // ✅ GÉNÉRER OU RÉCUPÉRER LE NUMÉRO DE FACTURE
        let numeroFacture = localStorage.getItem("numeroFacture");
        if (!numeroFacture) {
            numeroFacture = "FAC-" + Date.now(); // Générer un ID unique basé sur le temps
            localStorage.setItem("numeroFacture", numeroFacture);
        }
        
        // ✅ AFFICHER LES INFOS DANS LA FACTURE
        document.getElementById("num-facture").innerText = numeroFacture; // Affichage
        document.getElementById("nom-client").innerText = nomComplet;
        document.getElementById("adresse-client").innerText = adresse;
        document.getElementById("mode-paiement-facture").innerText = modePaiement;
        document.getElementById("date-facture").innerText = new Date().toLocaleString();
    
        factureBody.innerHTML = "";
        let sousTotal = 0;
        let fraisLivraison = 3.00;
    
        panier.forEach(plat => {
            let row = document.createElement("tr");
            let totalPlat = plat.prix * plat.quantite;
            sousTotal += totalPlat;
    
            row.innerHTML = `
                <td>${plat.nom}</td>
                <td>${plat.prix.toFixed(2)}</td>
                <td>${plat.quantite}</td>
                <td>${totalPlat.toFixed(2)}</td>
            `;
    
            factureBody.appendChild(row);
        });
    
        let totalCommande = sousTotal + fraisLivraison;
        sousTotalElem.innerText = sousTotal.toFixed(2);
        totalCommandeElem.innerText = `Total : ${totalCommande.toFixed(2)} DT`;
    
        localStorage.setItem("sousTotal", sousTotal.toFixed(2));
        localStorage.setItem("totalCommande", totalCommande.toFixed(2));
    }
    

    function genererFacturePDF() {
        const factureContent = document.getElementById("facturePdf");

        html2canvas(factureContent, {
            scale: 2,
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 1.0);
            const pdf = new jspdf.jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("facture.pdf");
        });
    }

    // Enregistrer la section active
    function enregistrerSectionActive(sectionId) {
        localStorage.setItem("sectionActive", sectionId);
    }

    // Fonction pour effacer la facture
    function effacerFacture() {
        let factureBody = document.getElementById("facture-body");
        let sousTotalElem = document.getElementById("sous-total");
        let totalCommandeElem = document.getElementById("total-commande");

        if (!factureBody || !sousTotalElem || !totalCommandeElem) return;

        factureBody.innerHTML = "";
        sousTotalElem.innerText = "0.00";
        totalCommandeElem.innerText = "0.00";
    }

    // Charger la section active au démarrage
    function chargerSectionActive() {
        let sectionActive = localStorage.getItem("sectionActive") || "panier-section";
        document.getElementById("panier-section").classList.add("hidden");
        document.getElementById("commande-section").classList.add("hidden");
        document.getElementById("confirmation-section").classList.add("hidden");

        document.getElementById(sectionActive).classList.remove("hidden");
    }

    genererFacture() ;
    startCountdown();
});