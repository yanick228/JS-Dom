// Code javascript
//importe les fichier
import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./function.js";

//Affichage de la liste de produit
const productscontainer = document.querySelector(".produits");

const dialog = document.querySelector("dialog");
//dialog.showModal();

  let produitsCarte = []

  // Initialisé le nombre de produit
const nombreProduit = document.querySelector(".carte .nombre");
nombreProduit.textContent = produitsCarte.length;




// Rechercher un produit
const input = document.querySelector(".recherche");

input.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  //filtrer les produit
  const filtre = data.filter((p) => p.nom.toLowerCase().includes(e.target.value.toLowerCase()));
  // console.log(filtre);
  productscontainer.innerHTML = "";
  
  // Condition pour rendre les produits
  if (filtre.length > 0) {
    afficherProduit(filtre);
  }
  else {
    const vide = document.createElement("h3");
    vide.textContent = "Aucun produit na ete trompé";
    productscontainer.appendChild(vide);
  }

});
// console.log(data);
// Loop. entre differents éléments
const afficherProduit = (produits) => {
  
      produits.forEach((produit) => {
      const produitHTML = document.createElement("div");
      produitHTML.classList.add("carte-produit");
        
        // faire pour trouver id sur lequel on a cliquer
      produitHTML.setAttribute("data-id", produit.id);
      produitHTML.innerHTML = generateProductHTML(produit);
                
      productscontainer.appendChild(produitHTML);
     });         
};

afficherProduit(data);

const testerSiProduitExiste = (arr, produit) => {
  const el = arr.find((p) => p.id === produit.id);
  return el ? true : false;
}

//Action sur les produits
const cartes = document.querySelectorAll(".carte-produit");

cartes.forEach(produit => {
  produit.addEventListener("click", () => {

    const contenuDialog = document.querySelector(".dialog-menu");
    
    // effacer le contenue passé
    contenuDialog && contenuDialog.remove();

    dialog.showModal();
    console.log(produit.dataset);
    const curentproduct = data.filter(p => p.id == produit.dataset.id)[0];
    
    const section = document.createElement("section");
    section.classList.add("dialog-menu");
    section.innerHTML = generateDialogHTML(curentproduct);
    dialog.appendChild(section);
    // console.log(curentproduct);
    
    // Changer la couleur
    const couleurs = document.querySelectorAll(".color.change");
    //console.log(couleurs)
    couleurs.forEach((couleur,key) => {
      couleur.addEventListener("click", () => {
        //alert("je suis cliqué");
        const backgroundImg = document.querySelector(".gauche");

        // Faire un switch
        switch (key) {
          case 0:
            backgroundImg.style.background = "#ff6b58";
            break;
          default:
            backgroundImg.style.background = "#5f69d5";
            break;
        }
      });
    });

    // Ajouter produit au panier
    const ajouter = document.querySelector(".ajouter");
    const qte = document.querySelector(".qte");
    qte.textContent = 0;
    ajouter.addEventListener("click", () => {
      if (testerSiProduitExiste(produitsCarte, curentproduct)) {
        const btnText = `<div class="icon"><i class="fa-solid fa-plus"></i></div>
        <p>Ajouter au panier</p>`;
        ajouter.innerHTML = btnText;
        ajouter.classList.remove("ajoute");
        produitsCarte = produitsCarte.filter(p => p.id != curentproduct.id);
        nombreProduit.textContent = produitsCarte.length;
      } else {
        produitsCarte.push(curentproduct);
        ajouter.textContent = "Effacer du panier";
        ajouter.classList.add("ajoute");
        nombreProduit.textContent = produitsCarte.length;
        qte.textContent = 1;
      }
    });
  
    // tester si une fois le produit existe et afficher directement le message
    //effacer
    if(testerSiProduitExiste(produitsCarte,curentproduct))
    {
      ajouter.textContent = "Effacer du panier";
      ajouter.classList.add("ajoute")
    }

    // Quantité
    const reduireBtn = document.querySelector(".counter .fa-minus");
    const incrementerBtn = document.querySelector(".counter .fa-plus");
   
      let qteProduit = testerSiProduitExiste(produitsCarte, curentproduct) ? 1 : 0
      incrementerBtn.addEventListener("click", () => {
        qteProduit = qteProduit + 1;
        qte.textContent = qteProduit;
      });
    
    //reduie
    reduireBtn.addEventListener("click", () => {
      qteProduit = qteProduit - 1;
      qte.textContent = qteProduit;
    });

    });
  });

console.log(cartes);


// Fermer notre dialog
const close = document.querySelector(".close");
close.addEventListener("click", () => {
  dialog.close();

});