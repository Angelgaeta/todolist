var tacheInput = document.getElementById("nvl-tache");
var addButton = document.getElementsByTagName("button")[0];
var liste = document.getElementById("liste");
var effectuer = document.getElementById("effectuer");



//Nouvel élément à ajouter
//Créer un nouvel element
var creerunnouvelelement = function(nvlTache) {
  var itemListe = document.createElement("li"); //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  var label = document.createElement("label"); //label
  var editInput = document.createElement("input"); //input (text)
  var editButton = document.createElement("button"); //button.edit
  var deleteButton = document.createElement("button"); //button.delete
  
//Chaque élément modifié
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = nvlTache;
  
// chaque élément ajouté
  itemListe.appendChild(checkBox);
  itemListe.appendChild(label);
  itemListe.appendChild(editInput);
  itemListe.appendChild(editButton);
  itemListe.appendChild(deleteButton);

  return itemListe;
}


//----------------------------------------
// Ajouter une nouvelle tache dans la liste
var ajoutTache = function() {
  var itemListe = creerunnouvelelement(tacheInput.value);
  liste.appendChild(itemListe);
  eventtacheenfant(itemListe, tacheComplete);  
  tacheInput.value = "";   ;
}

//----------------------------------------
// Editer une tache existente
var editTache = function() {
  var itemListe = this.parentNode;
  var editInput = itemListe.querySelector("input[type=text]")
  var label = itemListe.querySelector("label");
  var containsClass = itemListe.classList.contains("editTache");
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  itemListe.classList.toggle("editTache");
}

//----------------------------------------
// Supprimer une tâche existante
var suppTache = function() {
  var itemListe = this.parentNode;
  var ul = itemListe.parentNode;
  // Supprimer l'élément de la liste des parents ul 
  ul.removeChild(itemListe);
}

//----------------------------------------
// Marquer une tache terminée
var tacheComplete = function() {
  var itemListe = this.parentNode;
  effectuer.appendChild(itemListe);
  eventtacheenfant(itemListe, tacheIncomplete);
}

//----------------------------------------
// Marquer comme une tache imcomplete
var tacheIncomplete = function() {
  // Lorsque la case n'est pas cochée
  // Ajouter l'élément de liste de tâches #liste
  var itemListe = this.parentNode;
  liste.appendChild(itemListe);
  eventtacheenfant(itemListe, tacheComplete);
}

//----------------------------------------
var eventtacheenfant = function(itemTache, checkBoxEventHandler) {
  console.log("Bind list item events");
//sélectionner les enfants de itemTache
  var checkBox = itemTache.querySelector("input[type=checkbox]");
  var editButton = itemTache.querySelector("button.edit");
  var deleteButton = itemTache.querySelector("button.delete");


//lier editTache au bouton d'édition
  editButton.onclick = editTache;
  
//suppTache pour supprimer le bouton
  deleteButton.onclick = suppTache;
  
//lier checkBoxEventHandler à la case à cocher
  checkBox.onchange = checkBoxEventHandler;
}


var ajaxRequest = function() {
}
//Définit le gestionnaire de clic sur la fonction ajoutTache
//ajoutbouton.onclick = ajoutTache;
addButton.addEventListener("click", ajoutTache);
addButton.addEventListener("click", ajaxRequest);


//Boucle sur les éléments de la liste tacheIncomplete ul
for(var i = 0; i <  liste.children.length; i++) {
//lie les événements aux enfants de l'élément de liste (tacheComplete)
  eventtacheenfant(liste.children[i], tacheComplete);
}
//Boucle sur les éléments de la liste tacheComplete ul
for(var i = 0; i <  effectuer.children.length; i++) {
//lie les événements aux enfants de l'élément de liste (tacheIncomplete)
  eventtacheenfant(effectuer.children[i], tacheIncomplete); 

}