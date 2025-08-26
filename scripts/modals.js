// appel pour voir detail
  
document.getElementById('voirTajineDeLegumes').addEventListener('click', function() {
    ouvrirModalPlat(
      'Tajine de légumes',
      40,
      'Mélange de légumes mijoté dans une sauce épicée.',
      ['../images/menu/plats_vegetariens/taj.jpeg', '../images/menu/plats_vegetariens/taj2.jpeg', '../images/menu/plats_vegetariens/taj3.jpeg']
    );
  });
  
  document.getElementById('voirCurryDeLegumes').addEventListener('click', function() {
    ouvrirModalPlat(
      'Curry de légumes',
      25,
      'Légumes cuits dans une sauce crémeuse au lait de coco.',
      ['../images/menu/plats_vegetariens/cure.jpeg', '../images/menu/plats_vegetariens/cure2.jpeg']
    );
  });
  
  document.getElementById('voirEba').addEventListener('click', function() {
    ouvrirModalPlat(
      'Eba et sauce',
      20,
      'Boulettes de manioc servies avec une sauce végétarienne épicée.',
      ['../images/menu/plats_vegetariens/eba.png', '../images/menu/plats_vegetariens/eba2.png']
    );
  });
  
  document.getElementById('voirSaladeMangueAvocat').addEventListener('click', function() {
    ouvrirModalPlat(
      'Salade d\'avocat',
      18,
      'Mélange de mangue fraîche et d\'avocat avec une vinaigrette légère.',
      ['../images/menu/plats_vegetariens/avocat.jpg', '../images/menu/plats_vegetariens/avocat2.jpg']
    );
  });


  document.getElementById('voirPouletYassa').addEventListener('click', function() {
    ouvrirModalPlat(
      'Poulet Yassa',
      30,
      'Poulet mariné dans une sauce à base de moutarde, citron et oignons, puis grillé.',
      ['../images/menu/plats_principaux/poulet_yasa.jpg', '../images/menu/plats_principaux/poulet_yasa.jpg']
    );
  });

  document.getElementById('voirThieboudienne').addEventListener('click', function() {
    ouvrirModalPlat(
      'Thiéboudienne',  
      20, 
      'Riz accompagné de poisson, légumes et sauce tomate épicée, plat traditionnel sénégalais', 
       ['../images/menu/plats_principaux/res3.jpg', '../images/menu/plats_principaux/res3.jpg']
    );
  });
  

  // Script pour le plat Mafé
document.getElementById('voirMafe').addEventListener('click', function() {
    ouvrirModalPlat(
      'Mafé',
      30,
      'Viande de bœuf dans une sauce épicée à base d\'arachide, accompagnée de riz.',
      ['../images/menu/plats_principaux/mafe.jpg']
    );
  });
  
  // Script pour le plat Jollof Rice
  document.getElementById('voirJollof').addEventListener('click', function() {
    ouvrirModalPlat(
      'Jollof Rice',
      35,
      'Riz cuit dans une sauce tomate épicée, accompagné de viande ou de poisson.',
      ['../images/menu/plats_principaux/jollof.jpg']
    );
  });
  
  // Script pour le plat Garba
  document.getElementById('voirGarba').addEventListener('click', function() {
    ouvrirModalPlat(
      'Garba',
      25,
      'Un plat ivoirien emblématique à base d’attiéké et de poisson frit, relevé avec des piments et des oignons.',
      ['../images/menu/plats_principaux/gaba.jpg']
    );
  });
  
  // Script pour le plat Couscous aux légumes
  document.getElementById('voirCouscous').addEventListener('click', function() {
    ouvrirModalPlat(
      'Couscous aux légumes',
      25,
      'Semoule de blé servie avec des légumes cuits dans une sauce savoureuse.',
      ['../images/menu/plats_principaux/cous.jpg']
    );
  });
  

  // Script pour le plat : Biryani
document.getElementById('voirBiryani').addEventListener('click', function() {
    ouvrirModalPlat(
      'Biryani',
      40,
      'Riz épicé servi avec du poulet, de l\'agneau ou des légumes.',
      ['../images/menu/plats_principaux/biryani.jpg']
    );
  });
  
  // Script pour le plat : Ragoût de bœuf à l\'africaine
  document.getElementById('voirRagout').addEventListener('click', function() {
    ouvrirModalPlat(
      'Ragoût',
      25,
      'Ragoût de bœuf avec des légumes et des épices traditionnelles.',
      ['../images/menu/plats_principaux/ragout.jpeg']
    );
  });
  
  // Script pour le plat : Fufu et sauce gombo
  document.getElementById('voirFufu').addEventListener('click', function() {
    ouvrirModalPlat(
      'Fufu et sauce gombo',
      25,
      'Fufu servi avec une sauce épicée à base de gombo.',
      ['../images/menu/plats_principaux/fufu.jpg']
    );
  });
  
  // Script pour le plat : Riz au poisson
  document.getElementById('voirRizPoisson').addEventListener('click', function() {
    ouvrirModalPlat(
      'Riz au poisson',
      30,
      'Riz cuit avec des légumes et du poisson frit, dans une sauce épicée.',
      ['../images/menu/plats_principaux/riZPoi.jpeg']
    );
  });

  

// Script pour le plat : Riz aux légumes
document.getElementById('voirRizLegumes').addEventListener('click', function() {
    ouvrirModalPlat(
      'Riz aux légumes',
      22,
      'Riz cuit avec un assortiment de légumes de saison.',
      ['../images/menu/plats_vegetariens/legume.jpg']
    );
  });
  
  // Script pour le plat : Yam frit
  document.getElementById('voirYamFrit').addEventListener('click', function() {
    ouvrirModalPlat(
      'Yam frit',
      20,
      'Patates douces frites, servies avec une sauce épicée.',
      ['../images/menu/plats_vegetariens/yam.jpg']
    );
  });
  
  // Script pour le plat : Ndolé végétarien
  document.getElementById('voirNdoleVegetarien').addEventListener('click', function() {
    ouvrirModalPlat(
      'Ndolé végétarien',
      15,
      'Feuilles de bitterleaf cuites avec des épices et des légumes.',
      ['../images/menu/plats_vegetariens/nedole.webp']
    );
  });
  


  document.getElementById('voirKoshari').addEventListener('click', function() {
    ouvrirModalPlat(
      'Koshari',
      30,
      'Mélange de lentilles, riz, pâtes et pois chiches, servi avec une sauce tomate épicée',
      ['../images/menu/plats_vegetariens/kocha.jpeg']
    );
  });
  
  document.getElementById('voirVegetarianCouscous').addEventListener('click', function() {
    ouvrirModalPlat(
      'Vegetarian couscous',
      15,
      'Couscous accompagné de légumes de saison cuits dans un bouillon épicé',
      ['../images/menu/plats_vegetariens/tuni.webp']
    );
  });
  
  document.getElementById('voirFried').addEventListener('click', function() {
    ouvrirModalPlat(
      'Fried',
      30,
      'Bananes plantains frites servies avec un mélange de légumes épicés',
      ['../images/menu/plats_vegetariens/banane.jpeg']
    );
  });


  document.getElementById('voirSamosas').addEventListener('click', function() {
    ouvrirModalPlat(
      'Samosas',
      15,
      'Pâtisseries frites farcies avec un mélange de légumes ou de viande hachée épicée',
      ['../images/menu/entrées/samosa.jpg']
    );
  });
  
  document.getElementById('voirSoupePoisson').addEventListener('click', function() {
    ouvrirModalPlat(
      'Soupe de poisson',
      30,
      'Soupe épicée de poisson servie avec du riz ou du pain',
      ['../images/menu/entrées/soupeivoir.jpeg']
    );
  });
  
  document.getElementById('voirAccara').addEventListener('click', function() {
    ouvrirModalPlat(
      'Accara',
      20,
      'Beignets frits à base de haricots noirs, souvent servis avec une sauce pimentée',
      ['../images/menu/entrées/accra.jpg']
    );
  });

  
  document.getElementById('voirBrochettes').addEventListener('click', function() {
    ouvrirModalPlat(
      'Brochettes de légumes',
      25,
      'Brochettes de légumes grillés, souvent accompagnées de sauce épicée',
      ['../images/menu/entrées/brochette.jpg']
    );
  });
  
  document.getElementById('voirChakchouka').addEventListener('click', function() {
    ouvrirModalPlat(
      'Chakchouka',
      25,
      'Mélange d\'œufs et de légumes cuits dans une sauce tomate épicée',
      ['../images/menu/entrées/tunisi.jpeg']
    );
  });
  
  document.getElementById('voirSaladePalme').addEventListener('click', function() {
    ouvrirModalPlat(
      'Salade de palme',
      20,
      'Salade à base de cœur de palmier, de légumes frais et de sauce épicée',
      ['../images/menu/entrées/saladeivoir.jpeg']
    );
  });
  
  document.getElementById('voirTartareThon').addEventListener('click', function() {
    ouvrirModalPlat(
      'Tartare de thon à l\'africaine',
      40,
      'Thon cru mariné dans une sauce épicée, servi avec des légumes frais',
      ['../images/menu/entrées/thon.jpg']
    );
  });

  
  document.getElementById('voirSaladeAvocatMangue').addEventListener('click', function() {
    ouvrirModalPlat(
      'Salade d\'avocat et mangue', 
      30, 
      'Salade fraîche composée d\'avocat, mangue et d\'une vinaigrette légère', 
      ['../images/menu/entrées/avocat.webp']
    );
  });
  
  document.getElementById('voirCaviarAubergine').addEventListener('click', function() {
    ouvrirModalPlat(
      'Caviar d\'aubergine épicé', 
      25, 
      'Caviar d\'aubergine avec une touche d\'épices, délicieux sur du pain grillé', 
      ['../images/menu/entrées/ober.jpeg']
    );
  });
  
  document.getElementById('voirFalafel').addEventListener('click', function() {
    ouvrirModalPlat(
      'Falafel', 
      20, 
      'Falafel croustillant, à base de pois chiches et d\'herbes fraîches', 
      ['../images/menu/entrées/falfal.webp']
    );
  });


  document.getElementById('voirTarte').addEventListener('click', function() {
    ouvrirModalPlat(
      'Tarte à la noix de coco',
      40,
      'Pâte sablée garnie d\'une crème à la noix de coco sucrée',
      ['../images/menu/entrées/tarte.jpeg']
    );
  });
  
  document.getElementById('voirManioc').addEventListener('click', function() {
    ouvrirModalPlat(
      'Gâteau au manioc',
      30,
      'Gâteau moelleux préparé avec de la farine de manioc',
      ['../images/menu/entrées/manioc.webp']
    );
  });
  
  document.getElementById('voirBaklava').addEventListener('click', function() {
    ouvrirModalPlat(
      'Baklava',
      40,
      'Pâtisserie feuilletée à base de noix et de miel',
      ['../images/menu/entrées/bacla.jpg']
    );
  });

  document.getElementById('voirCrepes').addEventListener('click', function() {
    ouvrirModalPlat(
      'Crêpes à la banane',
      25,
      'Crêpes servies avec des bananes caramélisées',
      ['../images/menu/entrées/crepe.jpeg']
    );
  });

  document.getElementById('voirPannaCotta').addEventListener('click', function() {
    ouvrirModalPlat(
      'Panna cotta à la mangue',
      25,
      'Crème à la vanille, nappée de purée de mangue',
      ['../images/menu/entrées/mangue.jpeg']
    );
  });


 
document.getElementById('voirBeignet').addEventListener('click', function() {
  ouvrirModalPlat(
    'Beignets africains',
    15,
    'De petits beignets moelleux et sucrés, parfumés à la vanille ou à la muscade, parfaits pour accompagner une boisson chaude',
    ['../images/menu/entrées/beignet.jpg']
  );
});


document.getElementById('voirDouce').addEventListener('click', function() {
  ouvrirModalPlat(
    'Gâteau à la patate douce',
    15,
    'Un gâteau fondant préparé avec de la purée de patate douce, parfumé à la cannelle et à la noix de muscade',
    ['../images/menu/entrées/douce.jpg']
  );
});


document.getElementById('voirMakroudh').addEventListener('click', function() {
  ouvrirModalPlat(
    'Makroudh',
    10,
    'Pâtisserie maghrébine fourrée aux dattes ou aux amandes, parfumée à l\'eau de fleur d\'oranger et trempée dans du miel',
    ['../images/menu/entrées/makh.jpg']
  );
});



document.getElementById('voirHalwa').addEventListener('click', function() {
 
  ouvrirModalPlat(
    'Halwa tunisienne', 
    25, 
    'Une douceur à base de semoule, sucre et beurre, souvent agrémentée de pistaches ou de noisettes',
    ['../images/menu/entrées/halwa.jpeg']
  );
});


document.getElementById('voirMalva').addEventListener('click', function() {
 
  ouvrirModalPlat(
    'Malva pudding', 
    20, 
    'Dessert d\'Afrique du Sud, ce pudding moelleux est à base d\'abricot',
    ['../images/menu/entrées/malva.jpeg']
  );
});

document.getElementById('voirMangue').addEventListener('click', function() {
  
  ouvrirModalPlat(
    'Mangue', 
    15, 
    'Délicieusement sucrée et juteuse, la mangue est riche en vitamines A et C, idéale pour une collation nourrissante et rafraîchissante',
    ['../images/menu/boissons/mangue.jpg']
  );
});

document.getElementById('voirPasteque').addEventListener('click', function() {
 
  ouvrirModalPlat(
    'Pastèque', 
    20, 
    'Composée à 92 % d’eau, la pastèque est le fruit parfait pour s’hydrater et se rafraîchir lors des journées chaudes',
    ['../images/menu/boissons/pasteque.jpg']
  );
});

document.getElementById('voirPapaye').addEventListener('click', function() {
  
  ouvrirModalPlat(
    'Papaye', 
    15, 
    'Douce et légèrement crémeuse, la papaye est riche en enzymes qui favorisent la digestion, en plus d’être un régal frais et sucré',
    ['../images/menu/boissons/papaye.jpg']
  );
});
document.getElementById('voirPapaye').addEventListener('click', function() {
  ouvrirModalPlat(
    'Papaye', 
    15, 
    'Douce et légèrement crémeuse, la papaye est riche en enzymes qui favorisent la digestion, en plus d’être un régal frais et sucré',
    ['../images/menu/boissons/papaye.jpg']
  );
});

document.getElementById("voirGoyave").addEventListener("click", function() {
  ouvrirModalPlat(
      "Goyave", 
      20, 
      "Ce fruit tropical, au goût doux et acidulé, est riche en vitamine C et en fibres, parfait pour renforcer l’immunité tout en se désaltérant", 
      ["../images/menu/boissons/goyave.avif"]
  );
});

document.getElementById("voirAnanas").addEventListener("click", function() {
  ouvrirModalPlat(
      "Ananas", 
      15, 
      "Juteux et sucré, l'ananas est une explosion de saveurs tropicales, idéal pour les jus ou les desserts rafraîchissants", 
      ["../images/menu/boissons/ananas.jpg"]
  );
});

document.getElementById("voirCorossol").addEventListener("click", function() {
  ouvrirModalPlat(
      "Corossol", 
      15, 
      "Ce fruit crémeux au goût légèrement acidulé est souvent utilisé pour préparer des boissons glacées et des desserts rafraîchissants", 
      ["../images/menu/boissons/Corossol.webp"]
  );
});

document.getElementById("voirCoco").addEventListener("click", function() {
  ouvrirModalPlat(
      "Coco", 
      10, 
      "L’eau de coco est une boisson naturelle riche en électrolytes, idéale pour se réhydrater rapidement lors de journées chaudes", 
      ["../images/menu/boissons/noix-de-coco.jpg"]
  );
});

document.getElementById("voirOrange").addEventListener("click", function() {
  ouvrirModalPlat(
      "Orange locale", 
      10, 
      "Riche en vitamine C et en jus, l’orange locale est parfaite pour les petits-déjeuners ou les pauses rafraîchissantes", 
      ["../images/menu/boissons/Orange-1000.jpg"]
  );
});

document.getElementById("voirZaban").addEventListener("click", function() {
  ouvrirModalPlat(
      "Zaban", 
      10, 
      "Ce fruit acidulé est consommé frais ou utilisé pour préparer des jus et confitures désaltérants", 
      ["../images/menu/boissons/zaban.jpg"]
  );
});

document.getElementById("voirDatte").addEventListener("click", function() {
  ouvrirModalPlat(
      "Datte", 
      15, 
      "Sucrée et énergétique, la datte est une collation idéale pour les journées chaudes et une source d'énergie rapide", 
      ["../images/menu/boissons/datte.webp"]
  );
});

document.getElementById("voirCactus").addEventListener("click", function() {
  ouvrirModalPlat(
      "Cactus", 
      20, 
      "Ce fruit juteux et sucré, également appelé 'poire cactus', est idéal pour lutter contre la chaleur", 
      ["../images/menu/boissons/figue.jpeg"]
  );
});

document.getElementById("voirCarambole").addEventListener("click", function() {
  ouvrirModalPlat(
      "Carambole (Starfruit)", 
      10, 
      "Avec son goût légèrement acidulé et sa forme étoilée, la carambole est parfaite pour des salades de fruits rafraîchissantes", 
      ["../images/menu/boissons/caramboul.jpg"]
  );
});



document.getElementById("voirBissap").addEventListener("click", function() {
  ouvrirModalPlat(
      "Jus de Bissap", 
      40, 
      "Jus à base de fleurs d'hibiscus, sucré et rafraîchissant", 
      ["../images/menu/boissons/bissap.jpeg"]
  );
});

document.getElementById("voirGnamakoudji").addEventListener("click", function() {
  ouvrirModalPlat(
      "Gnamakoudji", 
      30, 
      "Boisson à base de gingembre, de sucre et de citron, très populaire en Afrique de l'Ouest", 
      ["../images/menu/boissons/coteivor.jpeg"]
  );
});

document.getElementById("voirTamarind").addEventListener("click", function() {
  ouvrirModalPlat(
      "Jus de Tamarind", 
      40, 
      "Jus sucré et légèrement acide, préparé avec des tamarins frais", 
      ["../images/menu/boissons/tamar.jpeg"]
  );
});

document.getElementById("voirLassi").addEventListener("click", function() {
  ouvrirModalPlat(
      "Lassi Mangue", 
      25, 
      "Boisson à base de yaourt et de mangue, douce et crémeuse", 
      ["../images/menu/boissons/lassi.webp"]
  );
});

document.getElementById("voirTej").addEventListener("click", function() {
  ouvrirModalPlat(
      "Tej (Éthiopie)", 
      25, 
      "Vin de miel épicé traditionnellement servi en Éthiopie", 
      ["../images/menu/boissons/miel.webp"]
  );
});

document.getElementById("voirCafe").addEventListener("click", function() {
  ouvrirModalPlat(
      "Café à la Cardamome", 
      20, 
      "Café traditionnel préparé avec des graines de cardamome", 
      ["../images/menu/boissons/cafe.jpg"]
  );
});

document.getElementById("voirNerikodo").addEventListener("click", function() {
  ouvrirModalPlat(
      "Nerikodo", 
      40, 
      "Boisson à base de lait fermenté et de millet, populaire dans certaines régions de la Côte d'Ivoire", 
      ["../images/menu/boissons/neriko.jpeg"]
  );
});

document.getElementById("voirSmoothie").addEventListener("click", function() {
  ouvrirModalPlat(
      "Smoothie", 
      30, 
      "Mélange sucré de fruits tropicaux frais, parfait pour accompagner un repas léger", 
      ["../images/menu/boissons/afriquesud.jpeg"]
  );
});
