/* =========================================================
   GoûtAfricain — carte du restaurant
   Pour modifier le menu, il suffit d'éditer la liste ci-dessous :
   [image, nom, pays/région, prix, description]
   ========================================================= */

const MENU = [
    {
        id: 'plats', label: 'Plats principaux', icon: 'fa-utensils', dir: 'images/menu/plats_principaux/',
        items: [
            ['poulet_yasa.jpg', 'Poulet Yassa', 'Sénégal', 30, "Poulet mariné dans une sauce à base de citron, d'oignons et de moutarde, accompagné de riz"],
            ['res3.jpg', 'Thiéboudienne', 'Sénégal', 25, 'Riz accompagné de poisson, légumes et sauce tomate épicée, plat traditionnel sénégalais'],
            ['mafe.jpg', 'Mafé', 'Mali', 30, "Viande de bœuf dans une sauce épicée à base d'arachide, accompagnée de riz"],
            ['jollof.jpg', 'Jollof Rice', 'Nigeria', 35, 'Riz cuit dans une sauce tomate épicée, accompagné de viande ou de poisson'],
            ['gaba.jpg', 'Garba', "Côte d'Ivoire", 25, "Plat ivoirien emblématique à base d'attiéké et de poisson frit, relevé de piments et d'oignons"],
            ['cous.jpg', 'Couscous aux légumes', 'Maroc', 25, 'Semoule de blé servie avec des légumes cuits dans une sauce savoureuse'],
            ['biryani.jpg', 'Biryani', "Afrique de l'Est", 40, "Riz épicé servi avec du poulet, de l'agneau ou des légumes"],
            ['ragout.jpeg', "Ragoût de bœuf à l'africaine", "Afrique de l'Ouest", 25, 'Ragoût de bœuf avec des légumes et des épices traditionnelles'],
            ['fufu.jpg', 'Fufu et sauce gombo', 'Cameroun', 25, 'Fufu servi avec une sauce épicée à base de gombo'],
            ['riZPoi.jpeg', 'Riz au poisson', 'Nigeria', 30, 'Riz cuit avec des légumes et du poisson frit, dans une sauce épicée'],
        ],
    },
    {
        id: 'vege', label: 'Végétarien', icon: 'fa-leaf', dir: 'images/menu/plats_vegetariens/',
        items: [
            ['legume.jpg', 'Riz aux légumes', 'Sénégal', 22, 'Riz cuit avec un assortiment de légumes de saison'],
            ['yam.jpg', 'Yam frit', 'Nigeria', 20, 'Patates douces frites, servies avec une sauce épicée'],
            ['nedole.webp', 'Ndolé végétarien', 'Cameroun', 15, 'Feuilles de bitterleaf cuites avec des épices et des légumes'],
            ['taj.jpeg', 'Tajine de légumes', 'Maroc', 40, 'Mélange de légumes mijoté dans une sauce épicée'],
            ['cure.jpeg', 'Curry de légumes', "Afrique de l'Est", 25, 'Légumes cuits dans une sauce crémeuse au lait de coco'],
            ['eba.png', 'Eba et sauce aux légumes', 'Nigeria', 20, 'Boulettes de manioc servies avec une sauce végétarienne épicée'],
            ['avocat.jpg', 'Salade de mangue et avocat', "Côte d'Ivoire", 18, "Mélange de mangue fraîche et d'avocat avec une vinaigrette légère"],
            ['kocha.jpeg', 'Koshari', 'Égypte', 30, 'Mélange de lentilles, riz, pâtes et pois chiches, servi avec une sauce tomate épicée'],
            ['tuni.webp', 'Couscous végétarien', 'Tunisie', 15, 'Couscous accompagné de légumes de saison cuits dans un bouillon épicé'],
            ['banane.jpeg', 'Plantain frit', 'Ouganda / Kenya', 30, 'Bananes plantains frites servies avec un mélange de légumes épicés'],
        ],
    },
    {
        id: 'entrees', label: 'Entrées', icon: 'fa-pepper-hot', dir: 'images/menu/entrées/',
        items: [
            ['samosa.jpg', 'Samosas', "Afrique de l'Ouest", 15, 'Pâtisseries frites farcies avec un mélange de légumes ou de viande hachée épicée'],
            ['soupeivoir.jpeg', 'Soupe de poisson', "Côte d'Ivoire", 30, 'Soupe épicée de poisson servie avec du riz ou du pain'],
            ['accra.jpg', 'Accara', "Côte d'Ivoire", 20, 'Beignets frits à base de haricots noirs, servis avec une sauce pimentée'],
            ['brochette.jpg', 'Brochettes de légumes', 'Cameroun', 25, 'Brochettes de légumes grillés, accompagnées de sauce épicée'],
            ['tunisi.jpeg', 'Chakchouka', 'Tunisie', 25, "Mélange d'œufs et de légumes cuits dans une sauce tomate épicée"],
            ['saladeivoir.jpeg', 'Salade de palme', "Côte d'Ivoire", 20, 'Salade de cœur de palmier, légumes frais et sauce épicée'],
            ['thon.jpg', "Tartare de thon à l'africaine", "Afrique de l'Ouest", 40, 'Thon cru mariné dans une sauce épicée, servi avec des légumes frais'],
            ['avocat.webp', "Salade d'avocat et mangue", "Afrique de l'Ouest", 30, "Mélange d'avocat, de mangue et d'assaisonnements légers"],
            ['ober.jpeg', "Caviar d'aubergine épicé", 'Maghreb', 25, "Aubergines grillées écrasées avec de l'ail, du citron et des épices"],
            ['falfal.webp', 'Falafel', 'Égypte', 20, 'Boulettes frites de pois chiches ou de fèves'],
        ],
    },
    {
        id: 'desserts', label: 'Desserts', icon: 'fa-birthday-cake', dir: 'images/menu/entrées/',
        items: [
            ['tarte.jpeg', 'Tarte à la noix de coco', "Côte d'Ivoire", 40, "Pâte sablée garnie d'une crème à la noix de coco sucrée"],
            ['manioc.webp', 'Gâteau au manioc', "Côte d'Ivoire", 30, 'Gâteau moelleux préparé avec de la farine de manioc'],
            ['bacla.jpg', 'Baklava', 'Afrique du Nord', 40, 'Pâtisserie feuilletée à base de noix et de miel'],
            ['crepe.jpeg', 'Crêpes à la banane', "Afrique de l'Ouest", 25, 'Crêpes servies avec des bananes caramélisées'],
            ['mangue.jpeg', 'Panna cotta mangue', "Afrique de l'Est", 25, 'Crème à la vanille, nappée de purée de mangue'],
            ['beignet.jpg', 'Beignets africains', "Afrique de l'Ouest", 15, 'Petits beignets moelleux parfumés à la vanille ou à la muscade'],
            ['douce.jpg', 'Gâteau à la patate douce', "Afrique de l'Ouest", 15, 'Gâteau fondant à la patate douce, parfumé à la cannelle et à la muscade'],
            ['makh.jpg', 'Makroudh', 'Maghreb', 10, "Pâtisserie fourrée aux dattes, parfumée à l'eau de fleur d'oranger et trempée dans le miel"],
            ['halwa.jpeg', 'Halwa tunisienne', 'Maghreb', 25, 'Douceur à base de semoule, sucre et beurre, agrémentée de pistaches'],
            ['malva.jpeg', 'Malva pudding', 'Afrique du Sud', 20, "Pudding moelleux et caramélisé à base d'abricot"],
        ],
    },
    {
        id: 'fruits', label: 'Fruits', icon: 'fa-apple-alt', dir: 'images/menu/boissons/',
        items: [
            ['mangue.jpg', 'Mangue', 'Fruit frais', 15, 'Délicieusement sucrée et juteuse, riche en vitamines A et C'],
            ['pasteque.jpg', 'Pastèque', 'Fruit frais', 20, "Composée à 92 % d'eau, parfaite pour se rafraîchir"],
            ['papaye.jpg', 'Papaye', 'Fruit frais', 15, 'Douce et légèrement crémeuse, elle favorise la digestion'],
            ['goyave.avif', 'Goyave', 'Fruit frais', 20, 'Goût doux et acidulé, riche en vitamine C et en fibres'],
            ['ananas.jpg', 'Ananas', 'Fruit frais', 15, 'Juteux et sucré, une explosion de saveurs tropicales'],
            ['Corossol.webp', 'Corossol', 'Fruit frais', 15, 'Fruit crémeux au goût légèrement acidulé'],
            ['noix-de-coco.jpg', 'Coco', 'Fruit frais', 10, 'Eau de coco naturelle, riche en électrolytes'],
            ['Orange-1000.jpg', 'Orange locale', 'Fruit frais', 10, 'Riche en vitamine C et en jus'],
            ['zaban.jpg', 'Zaban', "Pomme sauvage d'Afrique", 10, 'Fruit acidulé, consommé frais ou en jus'],
            ['datte.webp', 'Datte', 'Fruit frais', 15, "Sucrée et énergétique, une source d'énergie rapide"],
            ['figue.jpeg', 'Figue de Barbarie', 'Fruit frais', 20, 'Juteuse et sucrée, idéale contre la chaleur'],
            ['caramboul.jpg', 'Carambole', 'Fruit frais', 10, 'Goût acidulé et jolie forme étoilée'],
        ],
    },
    {
        id: 'boissons', label: 'Boissons', icon: 'fa-cocktail', dir: 'images/menu/boissons/',
        items: [
            ['bissap.jpeg', 'Jus de bissap', 'Sénégal', 40, "Jus à base de fleurs d'hibiscus, sucré et rafraîchissant"],
            ['coteivor.jpeg', 'Gnamakoudji', "Côte d'Ivoire", 30, 'Boisson au gingembre, sucre et citron'],
            ['tamar.jpeg', 'Jus de tamarin', "Afrique de l'Ouest", 40, 'Jus sucré et légèrement acide, préparé avec des tamarins frais'],
            ['lassi.webp', 'Lassi mangue', "Afrique de l'Ouest", 25, 'Boisson au yaourt et à la mangue, douce et crémeuse'],
            ['miel.webp', 'Tej', 'Éthiopie', 25, 'Vin de miel épicé traditionnel'],
            ['cafe.jpg', 'Café à la cardamome', "Afrique de l'Est", 20, 'Café traditionnel préparé avec des graines de cardamome'],
            ['neriko.jpeg', 'Nerikodo', "Côte d'Ivoire", 40, 'Boisson à base de lait fermenté et de millet'],
            ['afriquesud.jpeg', 'Smoothie tropical', 'Afrique du Sud', 30, 'Mélange de fruits tropicaux frais'],
        ],
    },
];

const tabs = document.querySelector('.tabs');
const grid = document.querySelector('.menu-grid');

tabs.innerHTML = MENU.map((cat, i) =>
    `<button class="tab${i === 0 ? ' is-active' : ''}" data-id="${cat.id}"><i class="fa ${cat.icon}"></i>${cat.label}</button>`
).join('') + '<span class="tabs__pill"></span>';

const pill = tabs.querySelector('.tabs__pill');

function movePill(tab) {
    pill.style.left = tab.offsetLeft + 'px';
    pill.style.width = tab.offsetWidth + 'px';
}

function showCategory(id) {
    const cat = MENU.find(c => c.id === id);
    grid.innerHTML = cat.items.map(([img, name, origin, price, desc], i) => `
        <article class="menu-item" style="--i:${i}">
            <div class="menu-item__img"><img src="${cat.dir}${img}" alt="${name}" loading="lazy"></div>
            <div class="menu-item__body">
                <div class="menu-item__head"><h3>${name}</h3><span class="dots"></span><span class="menu-item__price">${price} dt</span></div>
                <span class="menu-item__origin">${origin}</span>
                <p>${desc}</p>
            </div>
        </article>`).join('');
}

tabs.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab || tab.classList.contains('is-active')) return;
    tabs.querySelector('.is-active').classList.remove('is-active');
    tab.classList.add('is-active');
    movePill(tab);
    tab.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    showCategory(tab.dataset.id);
});

showCategory(MENU[0].id);
addEventListener('load', () => movePill(tabs.querySelector('.is-active')));
addEventListener('resize', () => movePill(tabs.querySelector('.is-active')));
document.fonts.ready.then(() => movePill(tabs.querySelector('.is-active')));
