const quizDdata = [
  {
    id: 1,
    type:"single_choice",
    ennonce:"Quel est le nom du père de Luke Skywalker?",
    choices:[
      {id:1, text:"Darth Sidious" },
      {id:2, text:"Obi-Wan Kenobi" },
      {id:3, text:"Darth Vader"},
      {id:4, text:"Count Dooku" },
      {id:5, text:"Han Solo" },
    ],
    solus:3
  },
  {
    id: 2,
    type:"ordering_choice",
    ennonce:"Quelle est l'ordre correct des épisodes de Stars Wars?",
    choices:[
      {id:1, text:"Star Wars: Épisode V - L'Empire contre-attaque"},
      {id:2, text:"Star Wars: Épisode III - La Revanche des Sith"},
      {id:3, text:"Star Wars: Épisode I - La Menace fantôme"},
      {id:4, text:"Star Wars: Épisode VI - Le Retour du Jedi",},
    ],
    solus:[1,4,3,2]
  },
  {
    id: 3,
    type:"single_choice",
    ennonce:"Qui est le réalisateur de l'episode VI: Le retour du Jedi?",
    choices:[
      {id:1, text:"George Lucas"},
      {id:2, text:"Richard Marquand"},
      {id:3, text:"Ivin Kershner"},
      {id:4, text:"Ron Howard"},
      {id:5, text:"J.J Abrams"},
    ],
    solus:2
  },
  {
    id: 4,
    type:"single_choice",
    ennonce:"le quel de ces personnages ne fait pas parti de l'univers Start Wars?",
    choices:[
      {id:1, text:"Mace Windu"},
      {id:2, text:"Padmé Amidala" },
      {id:3, text:"Darth Bane" },
      {id:4, text:"Denethor II" },
      {id:5, text:"Mara Jade"},
    ],
    solus:4
  },
  {
    id: 5,
    type:"multi_choice",
    ennonce:"Qui était Darth Vader avant de sombrer du côté obscure de la force?",
    choices:[
      {id:1, text:"un chevalier Jedi"},
      {id:2, text:"Un chevalier du zodiaque"},
      {id:3, text:"Anakin Skywalker" },
      {id:4, text:"Han Solo"},
      {id:5, text:"l'apprentis de Obi-Wan Kenobi" },
    ],
    solus:[1,3,5]
  },
];
export default quizDdata;