import { useState, useMemo } from 'react';
import { ShoppingBag, Plus, Minus, Send, Phone as WhatsApp, X, Trash2, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MenuItem, CartItem } from '../App';

const MENU_DATA: MenuItem[] = [
  // Starters (Gustări)
  { id: 101, name: "Bruschete clasice (150 gr)", nameEn: "Classic Bruschetta", description: "Bruschete cu roșii, usturoi și busuioc.", descriptionEn: "Bruschetta with tomatoes, garlic, and basil.", price: 25, category: "Gustări", image: "images/Bruschete rosii usturoi_converted.webp" },
  { id: 102, name: "Bruschete cu ton (150 gr)", nameEn: "Tuna Bruschetta", description: "Bruschete cu ton, ceapă și lămâie.", descriptionEn: "Bruschetta with tuna, onions, and lemon.", price: 30, category: "Gustări" },
  { id: 103, name: "Pită de casă cu salată de vinete (150 gr)", nameEn: "House Bread with Eggplant Salad", description: "Salată de vinete tradițională servită cu pită de casă.", descriptionEn: "Traditional eggplant salad served with house bread.", price: 25, category: "Gustări" },
  { id: 104, name: "Pită de casă cu zacuscă (150 gr)", nameEn: "House Bread with Zacusca", description: "Zacuscă tradițională servită cu pită de casă.", descriptionEn: "Traditional vegetable spread served with house bread.", price: 22, category: "Gustări" },
  { id: 105, name: "Cașcaval pane (250 gr)", nameEn: "Fried Breaded Cheese", description: "Cașcaval pane crocant.", descriptionEn: "Crispy fried breaded cheese.", price: 20, category: "Gustări", image: "images/Cascaval Pane_converted.webp" },
  { id: 106, name: "Bulete de cașcaval (250 gr)", nameEn: "Cheese Bullets", description: "Bulete de cașcaval delicioase.", descriptionEn: "Delicious fried cheese balls.", price: 25, category: "Gustări" },

  // Salate
  { id: 201, name: "Salată Caesar (350 gr)", nameEn: "Caesar Salad", description: "Salată, piept de pui, crutoane, dressing, bacon, roșii cherry.", descriptionEn: "Salad, chicken breast, croutons, dressing, bacon, cherry tomatoes.", price: 40, category: "Salate", image: "images/Salata Caesar_converted.webp" },
  { id: 202, name: "Salată Pui Crispy (350 gr)", nameEn: "Crispy Chicken Salad", description: "Roșii, castraveți, salată, ceapă, pui, cuburi de brânză.", descriptionEn: "Tomatoes, cucumbers, salad, onion, chicken, cheese cubes.", price: 42, category: "Salate" },
  { id: 203, name: "Salată Grecească (350 gr)", nameEn: "Greek Salad", description: "Roșii, castraveți, ceapă, măsline, feta, dressing.", descriptionEn: "Tomatoes, cucumbers, onion, olives, feta, dressing.", price: 42, category: "Salate", image: "images/Salata Greceasca_converted.webp" },
  { id: 204, name: "Salată Ton (350 gr)", nameEn: "Tuna Salad", description: "Salată verde, porumb, ceapă roșie, măsline, ton.", descriptionEn: "Green salad, corn, red onion, olives, tuna.", price: 42, category: "Salate" },

  // Burgeri
  { id: 301, name: "Burger Clasic (350 gr)", nameEn: "Classic Burger", description: "Vită Black Angus, roșii, cașcaval, salată verde, sos Calypso, castravete murat. Servit cu cartofi prăjiți.", descriptionEn: "Black Angus beef, tomatoes, cheese, green salad, Calypso sauce, pickled cucumber. Served with fries.", price: 50, category: "Burgeri" },
  { id: 302, name: "Burger La Mișcă (400 gr)", nameEn: "La Mișcă Burger", description: "Vită Black Angus, bacon, dulceață de ceapă, cașcaval, ou, salată, sos Calypso, roșii, castravete murat. Servit cu cartofi prăjiți.", descriptionEn: "Black Angus beef, bacon, onion jam, cheese, egg, salad, Calypso sauce, tomatoes, pickled cucumber. Served with fries.", price: 55, category: "Burgeri", image: "images/Burgher La Misca_converted.webp" },
  { id: 303, name: "Burger de Pui Crispy (400 gr)", nameEn: "Crispy Chicken Burger", description: "Pulpă de pui, fulgi amestec, ceapă murată, castravete verde, sos Calypso, roșii, salată, cașcaval. Servit cu cartofi prăjiți.", descriptionEn: "Chicken thigh, mixed flakes, pickled onion, green cucumber, Calypso sauce, tomatoes, salad, cheese. Served with fries.", price: 50, category: "Burgeri" },
  { id: 304, name: "Burger Halloumi (300 gr)", nameEn: "Halloumi Burger", description: "Dovlecel, ceapă, ardei, brânză Halloumi, sos. Servit cu cartofi prăjiți.", descriptionEn: "Zucchini, onion, pepper, Halloumi cheese, sauce. Served with fries.", price: 45, category: "Burgeri" },

  // Supe și Ciorbe
  { id: 401, name: "Supă cremă de ciuperci cu crutoane (350 gr)", nameEn: "Mushroom Cream Soup", description: "Supă cremoasă de ciuperci proaspete.", descriptionEn: "Creamy fresh mushroom soup with croutons.", price: 27, category: "Supe & Ciorbe" },
  { id: 402, name: "Supă cremă de legume cu crutoane (350 gr)", nameEn: "Vegetable Cream Soup", description: "Supă cremoasă de legume de sezon.", descriptionEn: "Creamy seasonal vegetable soup with croutons.", price: 27, category: "Supe & Ciorbe", image: "images/Ciorba Burta - Supa Crema Legume - Ciorba Perisoare_converted.webp" },
  { id: 403, name: "Ciorbă de burtă (350 gr)", nameEn: "Tripe Soup", description: "Ciorbă tradițională de burtă.", descriptionEn: "Traditional Romanian tripe soup.", price: 27, category: "Supe & Ciorbe", image: "images/Ciorba Burta - Supa Crema Legume - Ciorba Perisoare_converted.webp" },
  { id: 404, name: "Ciorba zilei (350 gr)", nameEn: "Soup of the Day", description: "Întrebați personalul despre ciorba zilei.", descriptionEn: "Ask the staff about today's special soup.", price: 27, category: "Supe & Ciorbe" },

  // Paste
  { id: 501, name: "Spaghete Carbonara (300 gr)", nameEn: "Spaghetti Carbonara", description: "Bacon, sos alb, parmezan.", descriptionEn: "Bacon, white sauce, parmesan.", price: 40, category: "Paste", image: "images/Paste Carbonara_converted.webp" },
  { id: 502, name: "Spaghete Bolognese (300 gr)", nameEn: "Spaghetti Bolognese", description: "Ragu de vită, parmezan.", descriptionEn: "Beef ragu, parmesan.", price: 40, category: "Paste" },
  { id: 503, name: "Spaghete cu creveți (300 gr)", nameEn: "Spaghetti with Shrimp", description: "Creveți, vin, usturoi, roșii cherry, pătrunjel.", descriptionEn: "Shrimp, wine, garlic, cherry tomatoes, parsley.", price: 60, category: "Paste", image: "images/Paste Creveti Sos Rosu_converted.webp" },
  { id: 504, name: "Penne Quattro Formaggi (300 gr)", nameEn: "Penne Quattro Formaggi", description: "Sos alb, parmezan, gorgonzola, cașcaval.", descriptionEn: "White sauce, parmesan, gorgonzola, cheese.", price: 42, category: "Paste" },
  { id: 505, name: "Penne Siciliene cu pui gratinate (300 gr)", nameEn: "Sicilian Penne with Chicken", description: "Pui, bacon, sos roșii, ciuperci.", descriptionEn: "Chicken, bacon, tomato sauce, mushrooms, gratinated.", price: 45, category: "Paste" },
  { id: 506, name: "Spaghete AOP (300 gr)", nameEn: "Spaghetti Aglio, Olio e Peperoncino", description: "Ulei măsline, ardei iute, pătrunjel, usturoi.", descriptionEn: "Olive oil, chili pepper, parsley, garlic.", price: 35, category: "Paste" },

  // Preparate din Carne
  { id: 601, name: "Pui cu smântână și ciuperci cu mămăligă (300 gr)", nameEn: "Chicken with Cream and Mushrooms", description: "Fâșii de pui în sos cremos cu mămăliguță.", descriptionEn: "Chicken strips in creamy sauce with polenta.", price: 45, category: "Preparate Carne" },
  { id: 602, name: "Piept de pui cu sos cremos de gorgonzola și piure (300 gr)", nameEn: "Chicken Breast with Gorgonzola Sauce", description: "Piept de pui fraged cu sos gorgonzola.", descriptionEn: "Tender chicken breast with gorgonzola sauce and mash.", price: 50, category: "Preparate Carne" },
  { id: 603, name: "Șnițel de pui La Mișcă gratinat (300 gr)", nameEn: "La Mișcă Gratinated Chicken Schnitzel", description: "Șnițel pui, sos de roșii, mozzarella, parmezan.", descriptionEn: "Chicken schnitzel, tomato sauce, mozzarella, parmesan.", price: 50, category: "Preparate Carne" },
  { id: 604, name: "Șnițel de pui în panko cu cartofi prăjiți (300 gr)", nameEn: "Panko Chicken Schnitzel", description: "Șnițel crocant de pui.", descriptionEn: "Crispy panko chicken schnitzel with fries.", price: 45, category: "Preparate Carne", image: "images/Snitel Pui Cartofi Prajiti_converted.webp" },
  { id: 605, name: "Șnițel de porc în panko cu cartofi prăjiți (300 gr)", nameEn: "Panko Pork Schnitzel", description: "Șnițel crocant de porc.", descriptionEn: "Crispy panko pork schnitzel with fries.", price: 50, category: "Preparate Carne" },
  { id: 606, name: "Șnițel Vienez (300 gr)", nameEn: "Wiener Schnitzel", description: "Șnițel tradițional vienez.", descriptionEn: "Traditional Wiener schnitzel.", price: 70, category: "Preparate Carne" },
  { id: 607, name: "Gujoane de pui crispy cu cartofi prăjiți (250 gr)", nameEn: "Crispy Chicken Goujons", description: "Fâșii de pui crocante.", descriptionEn: "Crispy chicken strips with fries.", price: 45, category: "Preparate Carne" },
  { id: 608, name: "Tigaie picantă de pui (300 gr)", nameEn: "Spicy Chicken Pan", description: "Ardei iute, ceapă, piept de pui, sos de roșii, usturoi.", descriptionEn: "Chili, onion, chicken breast, tomato sauce, garlic.", price: 45, category: "Preparate Carne" },
  { id: 609, name: "Aripioare picante crispy cu cartofi prăjiți (300 gr)", nameEn: "Spicy Crispy Wings", description: "Aripioare de pui picante.", descriptionEn: "Spicy crispy chicken wings with fries.", price: 47, category: "Preparate Carne", image: "images/Aripioare Crispy_converted.webp" },
  { id: 610, name: "Adana la farfurie cu cartofi prăjiți și salată de ceapă (300 gr)", nameEn: "Adana Plate", description: "Kebab tradițional Adana.", descriptionEn: "Traditional Adana kebab with fries and onion salad.", price: 48, category: "Preparate Carne" },
  { id: 611, name: "Ficăței de pui cu bacon și mămăligă (300 gr)", nameEn: "Chicken Livers with Bacon", description: "Ficăței de pui savuroși cu bacon.", descriptionEn: "Tasty chicken livers with bacon and polenta.", price: 42, category: "Preparate Carne", image: "images/Ficatei Ceapa Bacon_converted.webp" },
  { id: 612, name: "Pastramă de oaie cu mămăligă și murături (250 gr)", nameEn: "Mutton Pastrami", description: "Pastramă de oaie tradițională.", descriptionEn: "Traditional mutton pastrami with polenta and pickles.", price: 57, category: "Preparate Carne" },
  { id: 613, name: "Ceafă La Mișcă cu cartofi prăjiți și murături (250 gr)", nameEn: "La Mișcă Pork Neck", description: "Ceafă de porc fragedă.", descriptionEn: "Tender pork neck with fries and pickles.", price: 52, category: "Preparate Carne", image: "images/Ceafa La Misca_converted.webp" },
  { id: 614, name: "Mușchi de vită cu unt, gorgonzola și piure cu trufe (200 gr)", nameEn: "Beef Tenderloin with Truffle Mash", description: "Delicatesă de vită cu arome de trufe.", descriptionEn: "Beef tenderloin with butter, gorgonzola, and truffle mash.", price: 100, category: "Preparate Carne", image: "images/Muschi Vita Gorgonzola_converted.webp" },
  { id: 615, name: "Pui la jar cu mămăligă și mujdei (300 gr)", nameEn: "Grilled Chicken", description: "Pui gătit la foc deschis.", descriptionEn: "Open-fire grilled chicken with polenta and garlic sauce.", price: 50, category: "Preparate Carne" },

  // Grătar
  { id: 701, name: "Pulpă de pui (250 gr)", nameEn: "Chicken Thigh", description: "Pulpă de pui la grătar.", descriptionEn: "Grilled chicken thigh.", price: 30, category: "Grătar" },
  { id: 702, name: "Piept de pui (250 gr)", nameEn: "Chicken Breast", description: "Piept de pui la grătar.", descriptionEn: "Grilled chicken breast.", price: 31, category: "Grătar" },
  { id: 703, name: "Cotlet de porc (400 gr)", nameEn: "Pork Chop", description: "Cotlet de porc suculent.", descriptionEn: "Juicy grilled pork chop.", price: 35, category: "Grătar" },
  { id: 704, name: "Ceafă de porc (250 gr)", nameEn: "Pork Neck", description: "Ceafă de porc clasică.", descriptionEn: "Classic grilled pork neck.", price: 30, category: "Grătar" },
  { id: 705, name: "Scăricică (350 gr)", nameEn: "Pork Ribs", description: "Coaste de porc la grătar.", descriptionEn: "Grilled pork ribs.", price: 33, category: "Grătar" },
  { id: 706, name: "Cârnați afumați (250 gr)", nameEn: "Smoked Sausages", description: "Cârnați afumați la jar.", descriptionEn: "Open-fire smoked sausages.", price: 30, category: "Grătar" },
  { id: 707, name: "Mici (1 buc / 80 gr)", nameEn: "Mici (1 pc)", description: "Tradiționalul mic românesc.", descriptionEn: "Traditional Romanian grilled minced meat roll.", price: 7, category: "Grătar" },
  { id: 708, name: "Cotlete de berbecuț (240 gr)", nameEn: "Lamb Chops", description: "Cotlete de berbecuț fragede.", descriptionEn: "Tender grilled lamb chops.", price: 65, category: "Grătar", image: "images/Cotlete Berbecut_converted.webp" },
  { id: 709, name: "Cârnați de Pleșcoi (230 gr)", nameEn: "Pleșcoi Sausages", description: "Cârnați de Pleșcoi picanți.", descriptionEn: "Spicy traditional Pleșcoi sausages.", price: 35, category: "Grătar" },

  // Platouri
  { id: 801, name: "Platou cald (2 persoane)", nameEn: "Hot Platter (2 persons)", description: "Pulpă pui, ceafă, cârnați afumați, 2 mici, scăricică, cartofi prăjiți.", descriptionEn: "Chicken thigh, pork neck, smoked sausages, 2 mici, ribs, fries.", price: 175, category: "Platouri" },
  { id: 802, name: "Platou La Mișcă (4 persoane)", nameEn: "La Mișcă Platter (4 persons)", description: "Pastramă, ceafă, pulpe pui, cârnați Pleșcoi, scăricică, 4 mici, cotlete berbecuț, cartofi, usturoi, parmezan, mămăligă, murături.", descriptionEn: "Pastrami, pork neck, chicken thighs, sausages, ribs, 4 mici, lamb chops, fries, garlic, parmesan, polenta, pickles.", price: 320, category: "Platouri" },
  { id: 803, name: "Platou special de pui (2-3 persoane)", nameEn: "Special Chicken Platter (2-3 persons)", description: "Mix delicios de preparate din pui.", descriptionEn: "Delicious mix of chicken specialties.", price: 150, category: "Platouri" },
  { id: 804, name: "Platou rece", nameEn: "Cold Platter", description: "Cârnați semiafumați, șuncă, salam, cașcaval pane, ardei gras, ceapă, brânză, măsline.", descriptionEn: "Semi-smoked sausages, ham, salami, breaded cheese, bell pepper, onion, cheese, olives.", price: 90, category: "Platouri" },

  // Pește și Fructe de Mare
  { id: 901, name: "Dorada la grătar cu cartofi copți (400 gr)", nameEn: "Grilled Seabream", description: "Pește Dorada întreg la jar.", descriptionEn: "Whole seabream grilled over fire with baked potatoes.", price: 60, category: "Pește & Fructe de mare", image: "images/Dorada Cartofi Cuptor_converted.webp" },
  { id: 902, name: "Somon la grătar cu cartofi copți (200 gr)", nameEn: "Grilled Salmon", description: "File de somon la grătar.", descriptionEn: "Grilled salmon fillet with baked potatoes.", price: 70, category: "Pește & Fructe de mare", image: "images/Somon Gratar Cartofi Cuptor_converted.webp" },
  { id: 903, name: "File de șalău cu cartofi copți (400 gr)", nameEn: "Pikeperch Fillet", description: "File de șalău fraged.", descriptionEn: "Tender pikeperch fillet with baked potatoes.", price: 70, category: "Pește & Fructe de mare" },
  { id: 904, name: "Creveți în sos de vin și usturoi (250 gr)", nameEn: "Shrimp in Wine and Garlic Sauce", description: "Creveți sotați în vin alb și usturoi.", descriptionEn: "Shrimp sautéed in white wine and garlic.", price: 60, category: "Pește & Fructe de mare" },
  { id: 905, name: "Creveți panko (200 gr)", nameEn: "Panko Shrimp", description: "Creveți crocanți în crustă panko.", descriptionEn: "Crispy panko-crusted shrimp.", price: 60, category: "Pește & Fructe de mare" },

  // Pizza
  { id: 1001, name: "Pizza La Mișcă", nameEn: "La Mișcă Pizza", description: "Mozzarella, prosciutto crudo, rucola, roșii seci, buffala.", descriptionEn: "Mozzarella, prosciutto crudo, arugula, sun-dried tomatoes, buffala.", price: 43, category: "Pizza" },
  { id: 1002, name: "Pizza Margherita bocconcini", nameEn: "Margherita Bocconcini Pizza", description: "Bocconcini, roșii cherry, busuioc.", descriptionEn: "Bocconcini, cherry tomatoes, basil.", price: 39, category: "Pizza" },
  { id: 1003, name: "Pizza Prosciutto", nameEn: "Prosciutto Pizza", description: "Mozzarella, prosciutto.", descriptionEn: "Mozzarella, prosciutto.", price: 37, category: "Pizza" },
  { id: 1004, name: "Pizza Prosciutto e Funghi", nameEn: "Prosciutto e Funghi Pizza", description: "Mozzarella, prosciutto, ciuperci.", descriptionEn: "Mozzarella, prosciutto, mushrooms.", price: 39, category: "Pizza" },
  { id: 1005, name: "Pizza Salami", nameEn: "Salami Pizza", description: "Mozzarella, chorizo.", descriptionEn: "Mozzarella, chorizo.", price: 41, category: "Pizza" },
  { id: 1006, name: "Pizza Diavola", nameEn: "Diavola Pizza", description: "Mozzarella, salam Ventricina.", descriptionEn: "Mozzarella, Ventricina salami.", price: 41, category: "Pizza" },
  { id: 1007, name: "Pizza Capricciosa", nameEn: "Capricciosa Pizza", description: "Prosciutto, ciuperci, măsline Kalamata.", descriptionEn: "Prosciutto, mushrooms, Kalamata olives.", price: 40, category: "Pizza" },
  { id: 1008, name: "Pizza Quattro Stagioni", nameEn: "Quattro Stagioni Pizza", description: "Chorizo, prosciutto, ciuperci, măsline.", descriptionEn: "Chorizo, prosciutto, mushrooms, olives.", price: 42, category: "Pizza" },
  { id: 1009, name: "Pizza Salsiccia", nameEn: "Salsiccia Pizza", description: "Cârnați proaspeți.", descriptionEn: "Fresh sausages.", price: 39, category: "Pizza" },
  { id: 1010, name: "Pizza Pollo", nameEn: "Pollo Pizza", description: "Piept de pui, ciuperci, porumb.", descriptionEn: "Chicken breast, mushrooms, corn.", price: 42, category: "Pizza" },
  { id: 1011, name: "Pizza Carnivore", nameEn: "Carnivore Pizza", description: "Cârnați afumați, prosciutto, chorizo.", descriptionEn: "Smoked sausages, prosciutto, chorizo.", price: 42, category: "Pizza" },
  { id: 1012, name: "Pizza Țărănească", nameEn: "Country Style Pizza", description: "Bacon, ceapă roșie, ardei gras, cârnați afumați.", descriptionEn: "Bacon, red onion, bell pepper, smoked sausages.", price: 42, category: "Pizza" },
  { id: 1013, name: "Pizza Quattro Formaggi", nameEn: "Quattro Formaggi Pizza", description: "Gorgonzola, cheddar, parmezan.", descriptionEn: "Gorgonzola, cheddar, parmesan.", price: 43, category: "Pizza" },
  { id: 1014, name: "Pizza Tonno", nameEn: "Tonno Pizza", description: "Ton, ceapă roșie, măsline.", descriptionEn: "Tuna, red onion, olives.", price: 43, category: "Pizza" },
  { id: 1015, name: "Pizza Vegetariană", nameEn: "Vegetarian Pizza", description: "Legume grill, măsline, roșii cherry.", descriptionEn: "Grilled vegetables, olives, cherry tomatoes.", price: 40, category: "Pizza" },
  { id: 1016, name: "Pizza de Post", nameEn: "Fasting Pizza", description: "Legume grill, fără mozzarella.", descriptionEn: "Grilled vegetables, no mozzarella (vegan).", price: 35, category: "Pizza" },
  { id: 1017, name: "Pizza Siciliană", nameEn: "Sicilian Pizza", description: "Anșoa, capere, măsline.", descriptionEn: "Anchovies, capers, olives.", price: 38, category: "Pizza" },
  { id: 1018, name: "Focaccia Oregano", nameEn: "Oregano Focaccia", description: "Pită de pizza cu oregano.", descriptionEn: "Pizza bread with oregano.", price: 12, category: "Pizza" },
  { id: 1019, name: "Focaccia Parmezan", nameEn: "Parmesan Focaccia", description: "Pită de pizza cu parmezan.", descriptionEn: "Pizza bread with parmesan.", price: 15, category: "Pizza" },
  { id: 1020, name: "Focaccia Usturoi", nameEn: "Garlic Focaccia", description: "Pită de pizza cu usturoi.", descriptionEn: "Pizza bread with garlic.", price: 13, category: "Pizza" },

  // Desert
  { id: 1101, name: "Papanași (250 gr)", nameEn: "Papanasi", description: "Papanași cu smântână și dulceață.", descriptionEn: "Traditional donuts with sour cream and jam.", price: 30, category: "Desert" },
  { id: 1102, name: "Clătite cu Dulceață (200 gr)", nameEn: "Jam Pancakes", description: "Clătite pufoase cu dulceață de casă.", descriptionEn: "Fluffy pancakes with homemade jam.", price: 25, category: "Desert" },
  { id: 1103, name: "Clătite cu Nutella (200 gr)", nameEn: "Nutella Pancakes", description: "Clătite pufoase cu Nutella.", descriptionEn: "Fluffy pancakes with Nutella.", price: 25, category: "Desert" },
  { id: 1104, name: "Apple Pie cu înghețată", nameEn: "Apple Pie with Ice Cream", description: "Plăcintă cu mere caldă servită cu înghețată.", descriptionEn: "Warm apple pie served with ice cream.", price: 30, category: "Desert" },
  { id: 1105, name: "Lava Cake cu înghețată", nameEn: "Lava Cake with Ice Cream", description: "Prăjitură de ciocolată cu inimă curgătoare.", descriptionEn: "Chocolate cake with a molten core, served with ice cream.", price: 30, category: "Desert" },
  { id: 1106, name: "Pistachio Cake", nameEn: "Pistachio Cake", description: "Tort delicios de fistic.", descriptionEn: "Delicious pistachio cake.", price: 30, category: "Desert" },
  { id: 1107, name: "Oreo Cake", nameEn: "Oreo Cake", description: "Tort crocant cu biscuiți Oreo.", descriptionEn: "Crunchy cake with Oreo cookies.", price: 30, category: "Desert" },
  { id: 1108, name: "Cherry Cake", nameEn: "Cherry Cake", description: "Tort răcoritor cu cireșe.", descriptionEn: "Refreshing cherry cake.", price: 30, category: "Desert" },
  { id: 1109, name: "Înghețată asortată (200 gr)", nameEn: "Assorted Ice Cream", description: "Selecție de înghețată artizanală.", descriptionEn: "Selection of artisanal ice cream.", price: 20, category: "Desert" },

  // Cafea & Băuturi
  { id: 1201, name: "Espresso", nameEn: "Espresso", description: "Cafea scurtă intensă.", descriptionEn: "Short intense coffee.", price: 13, category: "Băuturi", image: "images/Cappucino Caffe Latte Espresso_converted.webp" },
  { id: 1202, name: "Espresso lung", nameEn: "Long Espresso", description: "Cafea lungă aromată.", descriptionEn: "Long aromatic coffee.", price: 13, category: "Băuturi" },
  { id: 1203, name: "Cappuccino", nameEn: "Cappuccino", description: "Espresso, lapte și spumă de lapte.", descriptionEn: "Espresso, milk, and milk foam.", price: 16, category: "Băuturi", image: "images/Cappucino Caffe Latte Espresso_converted.webp" },
  { id: 1204, name: "Caffe Latte", nameEn: "Caffe Latte", description: "Cafea lungă cu mult lapte.", descriptionEn: "Long coffee with plenty of milk.", price: 20, category: "Băuturi" },
  { id: 1205, name: "Frappe", nameEn: "Frappe", description: "Băutură răcoritoare pe bază de cafea.", descriptionEn: "Refreshing coffee-based drink.", price: 25, category: "Băuturi", image: "images/Frappe_converted.webp" },
  { id: 1206, name: "Flat White", nameEn: "Flat White", description: "Espresso dublu cu lapte cremos.", descriptionEn: "Double espresso with creamy milk.", price: 23, category: "Băuturi" },
  { id: 1207, name: "Limonadă (300 ml)", nameEn: "Lemonade", description: "Lămâie, apă, miere/zahăr.", descriptionEn: "Lemon, water, honey/sugar.", price: 22, category: "Băuturi" },
  { id: 1208, name: "Limonadă cu mentă (300 ml)", nameEn: "Mint Lemonade", description: "Limonadă proaspătă cu frunze de mentă.", descriptionEn: "Fresh lemonade with mint leaves.", price: 23, category: "Băuturi", image: "images/Limonada Menta-Capsuni-Mango_converted.webp" },
  { id: 1209, name: "Fresh Portocale (300 ml)", nameEn: "Fresh Orange Juice", description: "Suc de portocale proaspăt stors.", descriptionEn: "Freshly squeezed orange juice.", price: 30, category: "Băuturi" },
  { id: 1210, name: "Fresh Grapefruit (300 ml)", nameEn: "Fresh Grapefruit Juice", description: "Suc de grapefruit proaspăt stors.", descriptionEn: "Freshly squeezed grapefruit juice.", price: 30, category: "Băuturi" },
  { id: 1211, name: "Bere Heineken (330 ml)", nameEn: "Heineken Beer", description: "Bere blondă premium.", descriptionEn: "Premium lager beer.", price: 15, category: "Băuturi" },
  { id: 1212, name: "Bere Birra Moretti (330 ml)", nameEn: "Birra Moretti Beer", description: "Bere blondă tradițională italiană.", descriptionEn: "Traditional Italian lager beer.", price: 15, category: "Băuturi" },

  // Meniul Zilei
  { id: 1301, name: "Meniul Zilei (Luni-Vineri)", nameEn: "Daily Menu (Mon-Fri)", description: "Ciorbă + Felul doi + Desert.", descriptionEn: "Soup + Main course + Dessert.", price: 35, category: "Meniul Zilei" },
];

const CATEGORY_MAP: Record<string, string> = {
  "Toate": "cat.all",
  "Gustări": "cat.starters",
  "Salate": "cat.salads",
  "Burgeri": "cat.burgers",
  "Supe & Ciorbe": "cat.soups",
  "Paste": "cat.pasta",
  "Preparate Carne": "cat.meat",
  "Grătar": "cat.grill",
  "Platouri": "cat.platters",
  "Pește & Fructe de mare": "cat.fish",
  "Pizza": "cat.pizza",
  "Desert": "cat.dessert",
  "Băuturi": "cat.drinks",
  "Meniul Zilei": "cat.daily"
};

const CATEGORIES = [
  "Toate", "Gustări", "Salate", "Burgeri", "Supe & Ciorbe", 
  "Paste", "Preparate Carne", "Grătar", "Platouri", 
  "Pește & Fructe de mare", "Pizza", "Desert", "Băuturi", "Meniul Zilei"
];

interface MenuProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export default function Menu({ cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();

  const filteredItems = useMemo(() => {
    let items = MENU_DATA;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.nameEn && item.nameEn.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(query))
      );
    }

    // Filter by category (if not searching or if category is explicitly selected)
    if (activeCategory !== "Toate") {
      items = items.filter(item => item.category === activeCategory);
    }

    return items;
  }, [activeCategory, searchQuery]);

  const groupedItems = useMemo(() => {
    const categoriesToRender = activeCategory === "Toate" 
      ? CATEGORIES.filter(cat => cat !== "Toate")
      : [activeCategory];

    return categoriesToRender.map(cat => ({
      category: cat,
      items: filteredItems.filter(item => item.category === cat)
    })).filter(group => group.items.length > 0);
  }, [activeCategory, filteredItems]);

  const total = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const getItemQuantity = (id: number) => {
    const item = cart.find(i => i.item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div style={{ minHeight: '80vh', padding: 'var(--spacing-xl) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 className="section-title">{t('menu.title')}</h1>
          <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--spacing-md)' }}>
            {t('menu.subtitle')} Telefon: +40 727 783 800
          </p>

          {/* Search Bar */}
          <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto var(--spacing-md)',
            position: 'relative'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--color-text-light)',
                opacity: 0.5
              }} 
            />
            <input 
              type="text"
              placeholder={t('menu.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 15px 15px 45px',
                borderRadius: '30px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'var(--transition)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
            />
          </div>
          
          {/* Category Filter */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'var(--spacing-xs)', 
            flexWrap: 'wrap',
            marginBottom: 'var(--spacing-md)'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : '#ddd'}`,
                  backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'white',
                  color: activeCategory === cat ? 'var(--color-white)' : 'var(--color-text)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {t(CATEGORY_MAP[cat]).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {groupedItems.length > 0 ? (
          groupedItems.map(group => (
            <div key={group.category} style={{ marginBottom: 'var(--spacing-xl)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '20px', 
                marginBottom: 'var(--spacing-md)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                paddingBottom: '10px'
              }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: 'var(--color-text)'
                }}>
                  {t(CATEGORY_MAP[group.category])}
                </h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-primary)', opacity: 0.3 }}></div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: 'var(--spacing-md)' 
              }}>
                {group.items.map(item => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div key={item.id} style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'var(--transition)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                    }} className="menu-item-card">
                      {/* Item Image */}
                      <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                            <ShoppingBag size={48} opacity={0.2} />
                          </div>
                        )}
                      </div>

                      <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                              {language === 'en' && item.nameEn ? item.nameEn : item.name}
                            </h3>
                            <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.1rem', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                              {item.price} lei
                            </span>
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-sm)', lineHeight: '1.4' }}>
                            {language === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
                          </p>
                        </div>
                        
                        {quantity === 0 ? (
                          <button 
                            onClick={() => addToCart(item)}
                            className="btn-primary" 
                            style={{ width: '100%', padding: '12px', fontSize: '0.85rem', fontWeight: 700, marginTop: '10px' }}
                          >
                            {t('menu.add_to_cart')}
                          </button>
                        ) : (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '20px',
                            marginTop: '10px',
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: '30px',
                            padding: '8px'
                          }}>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              style={{ 
                                background: 'white', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: '28px', 
                                height: '28px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'var(--color-primary)',
                                cursor: 'pointer'
                              }}
                            >
                              <Minus size={18} />
                            </button>
                            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', minWidth: '20px', textAlign: 'center' }}>
                              {quantity}
                            </span>
                            <button 
                              onClick={() => addToCart(item)}
                              style={{ 
                                background: 'white', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: '28px', 
                                height: '28px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'var(--color-primary)',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', opacity: 0.5 }}>
            <Search size={48} style={{ marginBottom: 'var(--spacing-sm)' }} />
            <h3>{t('menu.no_results')}</h3>
          </div>
        )}
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cart.length > 0 && !isCartOpen && (
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: 'var(--color-text)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          <ShoppingBag size={20} />
          <span style={{ fontWeight: 700 }}>{t('menu.view_order')} ({total} LEI)</span>
        </button>
      )}

      <style>{`
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        .btn-primary:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
