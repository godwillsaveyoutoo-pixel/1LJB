/* =========================
   Wiskunde Quest – questions.js
   Volledige vragenbank 
========================= */

const BANK = {
  inhoud: {

    /* =========================
       BASIC (eenheden kiezen)
       Visual: echte object-SVG
    ========================= */
    basic: {
      easy: [
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen drinkbus is 500 ____.",
          ["ml", "cl", "l"], "ml", svgImgSafe("drinkbus.svg", "Drinkbus")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen kleine parfumfles is 50 ____.",
          ["ml", "cl", "l"], "ml", svgImgSafe("parfum_fles.svg", "Parfum")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen mok is ongeveer 25 ____.",
          ["ml", "cl", "l"], "cl", svgImgSafe("mok.svg", "Mok")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen blikje frisdrank is 33 ____.",
          ["ml", "cl", "dl", "l"], "cl", svgImgSafe("blikje_33cl.svg", "Blikje")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen flesje water is 750 ____.",
          ["ml", "cl", "l"], "ml", svgImgSafe("sportfles.svg", "Flesje")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen glas water is 20 ____.",
          ["ml", "cl", "l"], "cl", svgImgSafe("glas_water.svg", "Glas")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen brik melk is 1 ____.",
          ["ml", "cl", "l"], "l", svgImgSafe("brik_melk_1l.svg", "Brik")),
        () => qMc("inhoud", "basic_easy",
          "Kies de beste inhoudsmaat:\nEen eetlepel is 15 ____.",
          ["ml", "cl", "l"], "ml", svgImgSafe("eetlepel_15ml.svg", "Eetlepel")),

      ],
      normal: [
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen emmer is 10 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("emmer.svg", "Emmer")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen spuitje is 20 ____.",
          ["ml", "cl", "dl", "l"], "ml", svgImgSafe("spuit_20ml.svg", "Spuit")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen jerrycan is 5 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("jerrycan_5l.svg", "Jerrycan")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen kookpot kan 3 ____ bevatten.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("kookpot.svg", "Kookpot")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen waterkoker is 1,7 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("waterkoker.svg", "Waterkoker")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nEen waterzak is 2 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("waterzak_2l.svg", "Waterzak")),
        () => qMc("inhoud", "basic_normal",
          "Kies de beste inhoudsmaat:\nHet reservoir van een koffiemachine is 1,2 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("koffiemachine.svg", "Koffiemachine")),

      ],
      hard: [
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen sportbidon is 650 ____.",
          ["ml", "cl", "dl", "l"], "ml", svgImgSafe("sportbidon.svg", "Sportbidon")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen brik fruitsap is 1 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("brik_sap_1l.svg", "Brik sap")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen theelepel is ongeveer 5 ____.",
          ["ml", "cl", "dl", "l"], "ml", svgImgSafe("theelepel_5ml.svg", "Theelepel")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen grote waterbidon is 5 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("waterbidon_5l.svg", "Waterbidon")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen badkuip bevat 150 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("badkuip.svg", "Badkuip")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen aquarium bevat 60 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("aquarium.svg", "Aquarium")),
        () => qMc("inhoud", "basic_hard",
          "Kies de beste inhoudsmaat:\nEen verfbeker is 10 ____.",
          ["ml", "cl", "dl", "l"], "l", svgImgSafe("verfbeker.svg", "Verf")),

      ],
    },

    /* =========================
       CONVERT (l/dl/cl/ml)
       Visual: herleiden + object
    ========================= */
    convert: {
      easy: [
        () => qInput("inhoud", "convert_easy",
          "Herleid: 700 ml = ____ l", 0.7, "number", "l",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("700", "ml", "l", "Herleid")}
             ${svgImgSafe("thermos.svg", "Thermos")}
           </div>`, 0.01, "Tip: 1000 ml = 1 l"),
        () => qInput("inhoud", "convert_easy",
          "Herleid: 0,5 l = ____ ml", 500, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("0,5", "l", "ml", "Herleid")}
             ${svgImgSafe("petfles_500ml.svg", "Flesje 500 ml")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_easy",
          "Herleid: 25 cl = ____ ml", 250, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("25", "cl", "ml", "Herleid")}
             ${svgImgSafe("pak_chocomelk_250ml.svg", "Chocomelk")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_easy",
          "Herleid: 1,5 l = ____ cl", 150, "number", "cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("1,5", "l", "cl", "Herleid")}
             ${svgImgSafe("petfles_1_5l.svg", "PET 1,5 l")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_easy",
          "Zet om:\n300 ml = ____ cl.",
          30, "number", "cl", svgImgSafe("pak_chocomelk_250ml.svg", "Pak")),
        () => qInput("inhoud", "convert_easy",
          "Zet om:\n2 dl = ____ ml.",
          200, "number", "ml", svgImgSafe("maatbeker_dl.svg", "Maatbeker")),
        () => qInput("inhoud", "convert_easy",
          "Zet om:\n50 cl = ____ ml.",
          500, "number", "ml", svgImgSafe("blikje_33cl.svg", "Blikje")),
        () => qInput("inhoud", "convert_easy",
          "Zet om:\n1 l = ____ dl.",
          10, "number", "dl", svgImgSafe("brik_melk_1l.svg", "Brik")),

      ],
      normal: [
        () => qInput("inhoud", "convert_normal",
          "Herleid: 200 ml = ____ cl", 20, "number", "cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("200", "ml", "cl", "Herleid")}
             ${svgImgSafe("yoghurt_drink_200ml.svg", "Drinkyoghurt")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_normal",
          "Herleid: 1 l = ____ dl", 10, "number", "dl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("1", "l", "dl", "Herleid")}
             ${svgImgSafe("petfles_1l.svg", "PET 1 l")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_normal",
          "Herleid: 4 dl = ____ ml", 400, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("4", "dl", "ml", "Herleid")}
             ${svgImgSafe("brik_melk_1l.svg", "Melkbrik")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_normal",
          "Herleid: 750 ml = ____ l", 0.75, "number", "l",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("750", "ml", "l", "Herleid")}
             ${svgImgSafe("sportfles.svg", "Sportfles")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_normal",
          "Zet om:\n90 cl = ____ ml.",
          900, "number", "ml", svgImgSafe("sportfles.svg", "Fles")),
        () => qInput("inhoud", "convert_normal",
          "Zet om:\n0,25 l = ____ ml.",
          250, "number", "ml", svgImgSafe("pak_chocomelk_250ml.svg", "Pak")),
        () => qInput("inhoud", "convert_normal",
          "Zet om:\n600 ml = ____ dl.",
          6, "number", "dl", svgImgSafe("drinkbus.svg", "Drinkbus")),

      ],
      hard: [
        () => qInput("inhoud", "convert_hard",
          "Herleid: 10 l = ____ ml", 10000, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("10", "l", "ml", "Herleid")}
             ${svgImgSafe("jerrycan_10l.svg", "Jerrycan 10 l")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_hard",
          "Herleid: 20 l = ____ dl", 200, "number", "dl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("20", "l", "dl", "Herleid")}
             ${svgImgSafe("vat_20l.svg", "Vat 20 l")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_hard",
          "Herleid: 0,05 l = ____ ml", 50, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("0,05", "l", "ml", "Herleid")}
             ${svgImgSafe("maatschepje_5ml.svg", "Maatschepje")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_hard",
          "Herleid: 50 l = ____ cl", 5000, "number", "cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgConvertUnits("50", "l", "cl", "Herleid")}
             ${svgImgSafe("vat_50l.svg", "Vat 50 l")}
           </div>`, 0.01),
        () => qInput("inhoud", "convert_hard",
          "Zet om:\n3,5 l = ____ ml.",
          3500, "number", "ml", svgImgSafe("jerrycan_5l.svg", "Jerrycan")),
        () => qInput("inhoud", "convert_hard",
          "Zet om:\n1250 ml = ____ l.",
          1.25, "number", "l", svgImgSafe("petfles_1l.svg", "Fles")),
        () => qInput("inhoud", "convert_hard",
          "Zet om:\n0,08 l = ____ ml.",
          80, "number", "ml", svgImgSafe("maatschepje_5ml.svg", "Schepje")),

      ],
    },

    /* =========================
       10× / 100× / 1000×
       Visual: pijlen/boogjes
    ========================= */
    factor10: {
      easy: [
        () => qMc("inhoud", "factor10_easy",
          "10 keer meer dan 1 dl is ____ ml.",
          ["10", "100", "1000"], "1000", svgImgSafe("pijl_maal.svg", "×10")),
        () => qMc("inhoud", "factor10_easy",
          "10 keer kleiner dan 1 l is ____ dl.",
          ["0,1", "1", "10"], "1", svgImgSafe("pijl_gedeeld.svg", "÷10")),
        () => qMc("inhoud", "factor10_easy",
          "100 keer meer dan 1 cl is ____ ml.",
          ["10", "100", "1000"], "1000", svgImgSafe("boog_maal.svg", "×100")),
        () => qMc("inhoud", "factor10_easy",
          "100 keer kleiner dan 1 l is ____ cl.",
          ["1", "10", "100"], "1", svgImgSafe("boog_gedeeld.svg", "÷100")),
        () => qMc("inhoud", "factor10_easy",
          "10 keer meer dan 2 dl is ____ ml.",
          ["200", "2000", "20"], "2000", svgImgSafe("pijl_maal.svg", "×10")),
        () => qMc("inhoud", "factor10_easy",
          "10 keer kleiner dan 300 ml is ____ ml.",
          ["30", "3", "3000"], "30", svgImgSafe("pijl_gedeeld.svg", "÷10")),
        () => qMc("inhoud", "factor10_easy",
          "100 keer meer dan 5 ml is ____ ml.",
          ["50", "500", "5000"], "500", svgImgSafe("pijl_maal.svg", "×100")),
        () => qMc("inhoud", "factor10_easy",
          "100 keer kleiner dan 2 l is ____ cl.",
          ["0,2", "2", "20"], "2", svgImgSafe("pijl_gedeeld.svg", "÷100")),

      ],
      normal: [
        () => qMc("inhoud", "factor10_normal",
          "1000 keer meer dan 1 ml is ____ ml.",
          ["100", "1000", "10000"], "1000", svgImgSafe("pijl_maal.svg", "×1000")),

        () => qMc("inhoud", "factor10_normal",
          "100 keer kleiner dan 1 l is ____ ml.",
          ["1", "10", "100"], "10", svgImgSafe("pijl_gedeeld.svg", "÷100")),
        () => qMc("inhoud", "factor10_normal",
          "10 keer meer dan 25 cl is ____ l.",
          ["0,25", "2,5", "25"], "2,5", svgImgSafe("boog_maal.svg", "×10")),
        () => qMc("inhoud", "factor10_normal",
          "10 keer kleiner dan 500 ml is ____ ml.",
          ["5", "50", "500"], "50", svgImgSafe("boog_gedeeld.svg", "÷10")),
        () => qMc("inhoud", "factor10_normal",
          "1000 keer meer dan 3 ml is ____ l.",
          ["0,003", "0,3", "3"], "3", svgImgSafe("boog_maal.svg", "×1000")),
        () => qMc("inhoud", "factor10_normal",
          "100 keer kleiner dan 4 dl is ____ ml.",
          ["4", "40", "400"], "4", svgImgSafe("boog_gedeeld.svg", "÷100")),
        () => qMc("inhoud", "factor10_normal",
          "10 keer meer dan 0,6 l is ____ l.",
          ["0,06", "6", "60"], "6", svgImgSafe("boog_maal.svg", "×10")),

      ],
      hard: [
        () => qInput("inhoud", "factor10_hard",
          "Vul in: 100× groter dan 0,07 l = ____ l", 7, "number", "l",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("pijl_maal.svg", "×100")}

           </div>`, 0.01),
        () => qInput("inhoud", "factor10_hard",
          "Vul in: 1000× kleiner dan 2 l = ____ ml", 2, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("pijl_gedeeld.svg", "÷1000")}

           </div>`, 0.001),
        () => qMc("inhoud", "factor10_hard",
          "Welke is juist?",
          ["1 dl = 100 ml", "1 dl = 10 ml", "1 dl = 1000 ml"], "1 dl = 100 ml",
          svgImgSafe("boog_maal.svg", "Relatie")),
        () => qMc("inhoud", "factor10_hard",
          "Welke is juist?",
          ["1 cl = 0,1 l", "1 cl = 10 ml", "1 cl = 100 ml"], "1 cl = 10 ml",
          svgImgSafe("boog_gedeeld.svg", "Relatie")),
        () => qInput("inhoud", "factor10_hard",
          "Vul in:\n100× kleiner dan 0,8 l = ____ ml.",
          8, "number", "ml", svgImgSafe("boog_gedeeld.svg", "÷100")),
        () => qInput("inhoud", "factor10_hard",
          "Vul in:\n1000× groter dan 0,004 l = ____ ml.",
          4000, "number", "ml", svgImgSafe("boog_maal.svg", "×1000")),
        () => qInput("inhoud", "factor10_hard",
          "Vul in:\n10× kleiner dan 3,5 l = ____ dl.",
          3.5, "number", "dl", svgImgSafe("boog_gedeeld.svg", "÷10"), 0.02),

      ],
    },

    /* =========================
       MAATBEKER LEZEN
       Visual: inline maatbeker met ijking
    ========================= */
    maatbeker: {
      easy: [
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af: hoeveel water zit er in de maatbeker? ____ ml", 300, "number", "ml",
          svgMaatbekerLees({ value: 300, max: 500, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 500 ml" }), 0.01),
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af: ____ ml", 150, "number", "ml",
          svgMaatbekerLees({ value: 150, max: 500, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 500 ml" }), 0.01),
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af: ____ ml", 700, "number", "ml",
          svgMaatbekerLees({ value: 700, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" }), 0.01),
        () => qMc("inhoud", "maatbeker_easy",
          "Welke maatbeker past het best bij 1 liter?",
          ["maatbeker tot 500 ml", "maatbeker tot 1000 ml"], "maatbeker tot 1000 ml",
          svgImgSafe("maatbeker_1000ml.svg", "Maatbeker 1L")),
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af op de maatbeker:\n____ ml.",
          100, "number", "ml", svgMaatbekerLees({ value: 100, max: 500, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 500 ml" })),
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af op de maatbeker:\n____ ml.",
          250, "number", "ml", svgMaatbekerLees({ value: 250, max: 500, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 500 ml" })),
        () => qInput("inhoud", "maatbeker_easy",
          "Lees af op de maatbeker:\n____ ml.",
          900, "number", "ml", svgMaatbekerLees({ value: 900, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" })),
        () => qMc("inhoud", "maatbeker_easy",
          "Welke maatbeker is het handigst om 250 ml af te lezen?",
          ["maatbeker in ml", "maatbeker in cl", "maatbeker in dl"],
          "maatbeker in ml",
          `<div style="display:flex; gap:10px; justify-content:center; align-items:flex-end; flex-wrap:wrap;">
             <div>${svgImgSafe("maatbeker_500ml.svg", "ml", 90)}<div style="text-align:center;font-size:12px;opacity:.85">500 ml</div></div>
             <div>${svgImgSafe("maatbeker_1000ml.svg", "cl", 90)}<div style="text-align:center;font-size:12px;opacity:.85">1000 ml</div></div>
             <div>${svgImgSafe("maatbeker_dl.svg", "dl", 90)}<div style="text-align:center;font-size:12px;opacity:.85">dl</div></div>
           </div>`),

      ],
      normal: [
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af: ____ ml", 450, "number", "ml",
          svgMaatbekerLees({ value: 450, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" }), 0.01),
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af: ____ dl", 6, "number", "dl",
          svgMaatbekerLees({ value: 6, max: 10, unit: "dl", majorStep: 1, minorStep: 0.5, title: "Maatbeker in dl" }), 0.01),
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af: ____ dl", 3.5, "number", "dl",
          svgMaatbekerLees({ value: 3.5, max: 10, unit: "dl", majorStep: 1, minorStep: 0.5, title: "Maatbeker in dl" }), 0.01),
        () => qInput("inhoud", "maatbeker_normal",
          "Een glas is 25 cl.\nHoeveel ml is dat? ____ ml", 250, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("glas_water.svg", "Glas")}
           </div>`, 0.01),
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af op de maatbeker:\n____ ml.",
          650, "number", "ml", svgMaatbekerLees({ value: 650, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" })),
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af op de maatbeker:\n____ dl.",
          8.5, "number", "dl", svgMaatbekerLees({ value: 8.5, max: 10, unit: "dl", majorStep: 1, minorStep: 0.5, title: "Maatbeker in dl" }), 0.02),
        () => qInput("inhoud", "maatbeker_normal",
          "Lees af en zet om:\n____ ml.",
          350, "number", "ml", svgMaatbekerLees({ value: 3.5, max: 10, unit: "dl", majorStep: 1, minorStep: 0.5, title: "Maatbeker in dl" }), 0.5),

      ],
      hard: [
        () => qInput("inhoud", "maatbeker_hard",
          "Lees af: ____ ml", 850, "number", "ml",
          svgMaatbekerLees({ value: 850, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" }), 0.01),
        () => qInput("inhoud", "maatbeker_hard",
          "Lees af: ____ ml", 350, "number", "ml",
          svgMaatbekerLees({ value: 350, max: 500, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 500 ml" }), 0.01),
        () => qInput("inhoud", "maatbeker_hard",
          "Een wijnglas is 20 cl.\nHoeveel ml is dat? ____ ml", 200, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("wijnglas.svg", "Wijnglas")}
           </div>`, 0.01),
        () => qInput("inhoud", "maatbeker_hard",
          "In een kan zit 1,2 l water.\nHoeveel ml is dat? ____ ml", 1200, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("kan_water.svg", "Kan water")}
           </div>`, 0.01),
        () => qInput("inhoud", "maatbeker_hard",
          "Lees af op de maatbeker:\n____ ml.",
          950, "number", "ml", svgMaatbekerLees({ value: 950, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" })),
        () => qInput("inhoud", "maatbeker_hard",
          "Lees af op de maatbeker:\n____ ml.",
          850, "number", "ml", svgMaatbekerLees({ value: 850, max: 1000, unit: "ml", majorStep: 100, minorStep: 50, title: "Maatbeker 1000 ml" })),
        () => qInput("inhoud", "maatbeker_hard",
          "Lees af op de maatbeker:\n____ dl.",
          6.5, "number", "dl", svgMaatbekerLees({ value: 6.5, max: 10, unit: "dl", majorStep: 1, minorStep: 0.5, title: "Maatbeker in dl" }), 0.02),

      ],
    },

    /* =========================
       VERHOUDINGSTABEL
       Soms met factor (×/÷)
    ========================= */
    ratio: {
      easy: [
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal drinkbussen",
            rightLabel: "ml",
            rows: [
              ["1", "500"],
              ["4", null]
            ]
          },
          2000,
          "ml",
          svgImgSafe("drinkbus.svg", "Drinkbus")
        ),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal blikjes",
            rightLabel: "cl",
            rows: [
              ["1", "50"],
              ["3", null]
            ]
          },
          150,
          "cl",
          svgImgSafe("blikje_50cl.svg", "Blikje 50 cl")
        ),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal eetlepels",
            rightLabel: "ml",
            rows: [
              ["1", "15"],
              ["6", null]
            ]
          },
          90,
          "ml",
          svgImgSafe("eetlepel_15ml.svg", "Eetlepel")
        ),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal theelepels",
            rightLabel: "ml",
            rows: [
              ["1", "5"],
              ["8", null]
            ]
          },
          40,
          "ml",
          svgImgSafe("theelepel_5ml.svg", "Theelepel")
        ),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal glazen", rightLabel: "inhoud (ml)", rows: [["1 glas", "200"], ["3 glazen", null]] },
          600, "ml",
          `<div class="svgWrap">${svgImgSafe("glas_water.svg", "Glas", 120)}</div>`),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal mokken", rightLabel: "inhoud (cl)", rows: [["1 mok", "25"], ["4 mokken", null]] },
          100, "cl",
          `<div class="svgWrap">${svgImgSafe("mok.svg", "Mok", 120)}</div>`),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal flessen", rightLabel: "inhoud (l)", rows: [["1 fles", "1,5"], ["3 flessen", null]] },
          4.5, "l",
          `<div class="svgWrap">${svgImgSafe("petfles_1_5l.svg", "Fles", 120)}</div>`, 0.02),
        () => qRatio("inhoud", "ratio_easy",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal spuiten", rightLabel: "inhoud (ml)", rows: [["1 spuit", "20"], ["5 spuiten", null]] },
          100, "ml",
          `<div class="svgWrap">${svgImgSafe("spuit_20ml.svg", "Spuit", 120)}</div>`),

      ],
      normal: [
        () => qRatio("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal flesjes",
            rightLabel: "ml",
            rows: [
              ["1", "250"],
              ["5", null]
            ]
          },
          1250,
          "ml",
          svgImgSafe("pak_chocomelk_250ml.svg", "Pakje")
        ),
        () => qRatioFill("inhoud", "ratio_normal",
          "Vul de verhoudingstabel volledig in.",
          {
            leftLabel: "dl",
            rightLabel: "ml",
            rows: [
              ["1", "100"],
              ["3", null],
              [null, "500"]
            ]
          },
          [300, 5],
          " ",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("maatbeker_dl.svg", "Maatbeker dl")}
           </div>`,
          { sub: "Tip: 1 dl = 100 ml" }
        ),
        () => qRatio("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal gieters",
            rightLabel: "l",
            rows: [
              ["1", "5"],
              ["3", null]
            ]
          },
          15,
          "l",
          svgImgSafe("gieter.svg", "Gieter")
        ),
        () => qRatioFill("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan (met factor).",
          {
            leftLabel: "aantal spuitjes",
            rightLabel: "ml",
            rows: [
              ["1", "10"],
              ["7", null]
            ]
          },
          [70],
          "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("spuit_10ml.svg", "Spuit 10 ml")}
           </div>`,
          { factor: { op: "×", expected: 7 }, sub: "Je mag eerst ×7 gebruiken." }
        ),
        () => qRatioFill("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal flessen", rightLabel: "inhoud (ml)", rows: [["5", "2500"], ["1", null]] },
          [500], "ml",
          `<div class="svgWrap">${svgImgSafe("petfles_500ml.svg", "Fles", 120)}</div>`,
          { factor: { op: "÷", expected: 5 }, sub: "Eerst naar 1 fles: deel door 5." }),
        () => qRatioFill("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "inhoud (dl)", rightLabel: "inhoud (ml)", rows: [["1", "100"], ["6", null], [null, "350"]] },
          [600, 3.5], " ",
          `<div class="svgWrap">${svgImgSafe("maatbeker_dl.svg", "dl", 120)}</div>`,
          { sub: "6 dl is 6× 100 ml. En 350 ml is 3,5 dl.", tol: 0.02 }),
        () => qRatioFill("inhoud", "ratio_normal",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "inhoud (l)", rightLabel: "inhoud (ml)", rows: [["0,5", "500"], ["1,5", null], [null, "750"]] },
          [1500, 0.75], " ",
          `<div class="svgWrap">${svgImgSafe("thermos.svg", "Thermos", 120)}</div>`,
          { sub: "Gebruik 1 l = 1000 ml.", tol: 0.02 }),

      ],
      hard: [
        () => qRatioFill("inhoud", "ratio_hard",
          "Vul de verhoudingstabel volledig in.",
          {
            leftLabel: "l",
            rightLabel: "cl",
            rows: [
              ["1", "100"],
              ["2,5", null],
              [null, "350"]
            ]
          },
          [250, 3.5],
          " ",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("petfles_1l.svg", "Fles 1 l")}
           </div>`,
          { sub: "Tip: 1 l = 100 cl" }
        ),
        () => qRatioFill("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan (met factor).",
          {
            leftLabel: "aantal pompjes",
            rightLabel: "ml",
            rows: [
              ["1", "250"],
              ["4", null]
            ]
          },
          [1000],
          "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("handgel.svg", "Handgel")}
               </div>`,
          { factor: { op: "×", expected: 4 }, sub: "Eerst ×4, dan invullen." }
        ),
        () => qRatio("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal shampooflessen",
            rightLabel: "ml",
            rows: [
              ["1", "400"],
              ["2", null]
            ]
          },
          800,
          "ml",
          svgImgSafe("shampoo_fles.svg", "Shampoo")
        ),
        () => qRatio("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal siroopflessen",
            rightLabel: "ml",
            rows: [
              ["1", "100"],
              ["9", null]
            ]
          },
          900,
          "ml",
          svgImgSafe("medicijnsiroop.svg", "Siroop")
        ),
        () => qRatioFill("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal brikken", rightLabel: "inhoud (l)", rows: [["3", "3"], ["5", null], [null, "7"]] },
          [5, 7], " ",
          `<div class="svgWrap">${svgImgSafe("brik_melk_1l.svg", "Brik", 120)}</div>`,
          { factor: { op: "×", expected: 1 }, sub: "Hier is 1 brik = 1 l. Denk in stappen." }),
        () => qRatioFill("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "inhoud (cl)", rightLabel: "inhoud (ml)", rows: [["1", "10"], ["12,5", null], [null, "275"]] },
          [125, 27.5], " ",
          `<div class="svgWrap">${svgImgSafe("yoghurt_drink_200ml.svg", "Drink", 120)}</div>`,
          { sub: "1 cl = 10 ml. Let op met kommagetallen.", tol: 0.05 }),
        () => qRatioFill("inhoud", "ratio_hard",
          "Vul de verhoudingstabel aan.",
          { leftLabel: "inhoud (l)", rightLabel: "inhoud (cl)", rows: [["1", "100"], ["0,35", null], [null, "18"]] },
          [35, 0.18], " ",
          `<div class="svgWrap">${svgImgSafe("petfles_1l.svg", "Fles", 120)}</div>`,
          { sub: "1 l = 100 cl.", tol: 0.02 }),

      ],
    },

    /* =========================
       VRAAGSTUKKEN
       Altijd komma in tekst
    ========================= */
    story: {
      easy: [
        () => qInput("inhoud", "story_easy",
          "Op de picknicktafel staan 2 flessen van 1,5 l.\nSamen is dat ____ l.", 3, "number", "l",
          svgImgSafe("picknick.svg", "Picknick"), 0.01),
        () => qInput("inhoud", "story_easy",
          "Je vult 3 mokken van 25 cl.\nSamen is dat ____ cl.", 75, "number", "cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("mok.svg", "Mok")}
           </div>`, 0.01),
        () => qInput("inhoud", "story_easy",
          "Je maakt limonade: 4 glazen van 250 ml.\nSamen is dat ____ ml.", 1000, "number", "ml",
          svgImgSafe("limonade.svg", "Limonade"), 0.01),
        () => qInput("inhoud", "story_easy",
          "In de koelkast staan 6 blikjes van 33 cl.\nSamen is dat ____ cl.", 198, "number", "cl",
          svgImgSafe("koelkast.svg", "Koelkast"), 0.01),
        () => qInput("inhoud", "story_easy",
          "Oscar drinkt 2 glazen van 20 cl. Hoeveel cl drinkt hij? ____ cl.",
          40, "number", "cl", svgImgSafe("glas_water.svg", "Glas")),
        () => qInput("inhoud", "story_easy",
          "Ella vult 3 spuiten van 20 ml. Hoeveel ml is dat? ____ ml.",
          60, "number", "ml", svgImgSafe("spuit_20ml.svg", "Spuit")),
        () => qInput("inhoud", "story_easy",
          "Er gaan 5 lepels van 5 ml in een potje. Hoeveel ml is dat? ____ ml.",
          25, "number", "ml", svgImgSafe("theelepel_5ml.svg", "Lepel")),
        () => qInput("inhoud", "story_easy",
          "In een fles zit 1,5 l water. Hoeveel ml is dat? ____ ml.",
          1500, "number", "ml", svgImgSafe("petfles_1_5l.svg", "Fles")),

      ],
      normal: [
        () => qInput("inhoud", "story_normal",
          "Bij een voetbaltoernooi krijgt elke speler 1 bidon van 650 ml.\nEr zijn 12 spelers.\nSamen ____ ml.", 7800, "number", "ml",
          svgImgSafe("voetbal_toernooi.svg", "Toernooi"), 0.01),
        () => qInput("inhoud", "story_normal",
          "Je giet 0,6 l water in een pan.\nHoeveel ml is dat? ____ ml.", 600, "number", "ml",
          svgImgSafe("sauspan.svg", "Sauspan"), 0.01),
        () => qInput("inhoud", "story_normal",
          "Een verfbeker bevat 200 ml verf.\nJe gebruikt 3 bekers.\nSamen ____ ml.", 600, "number", "ml",
          svgImgSafe("verfbeker.svg", "Verf"), 0.01),
        () => qInput("inhoud", "story_normal",
          "Een lijmfles bevat 100 ml.\nJe hebt 5 lijmflessen.\nSamen ____ ml.", 500, "number", "ml",
          svgImgSafe("lijmfles.svg", "Lijm"), 0.01),
        () => qInput("inhoud", "story_normal",
          "In de soepkeuken wordt 6 l soep verdeeld over kommen van 3 dl. Hoeveel kommen zijn dat? ____ kommen.",
          20, "number", "kommen", svgImgSafe("soepkeuken.svg", "Soep")),
        () => qInput("inhoud", "story_normal",
          "Een limonadefles bevat 75 cl. Oscar drinkt 3/5 van de fles. Hoeveel cl drinkt hij? ____ cl.",
          45, "number", "cl", svgImgSafe("limonade.svg", "Limonade")),
        () => qInput("inhoud", "story_normal",
          "Een brik sap is 1 l. Ella schenkt 4 glazen van 20 cl in. Hoeveel cl blijft over? ____ cl.",
          20, "number", "cl", svgImgSafe("brik_sap_1l.svg", "Brik")),

      ],
      hard: [
        () => qInput("inhoud", "story_hard",
          "Op camping neem je 2 jerrycans van 10 l mee.\nSamen ____ l.", 20, "number", "l",
          svgImgSafe("camping.svg", "Camping"), 0.01),
        () => qInput("inhoud", "story_hard",
          "In de soepkeuken maak je 3 potten van 4 l.\nSamen ____ l.", 12, "number", "l",
          svgImgSafe("soepkeuken.svg", "Soepkeuken"), 0.01),
        () => qInput("inhoud", "story_hard",
          "In de supermarkt koop je 8 flesjes van 0,5 l.\nSamen ____ l.", 4, "number", "l",
          svgImgSafe("supermarkt_rek.svg", "Rek"), 0.01),
        () => qInput("inhoud", "story_hard",
          "Aan de drinkfontein vul je 5 drinkbussen van 500 ml.\nSamen ____ l.", 2.5, "number", "l",
          svgImgSafe("drinkfontein.svg", "Drinkfontein"), 0.01),
        () => qInput("inhoud", "story_hard",
          "Oscar maakt sportdrank: 1,2 l water + 35 cl siroop. Hoeveel ml is dat samen? ____ ml.",
          1550, "number", "ml", svgImgSafe("sportbidon.svg", "Bidon")),
        () => qInput("inhoud", "story_hard",
          "In de campingpot zit 2,5 l water. Ella giet er nog 750 ml bij. Hoeveel liter is dat samen? ____ l.",
          3.25, "number", "l", svgImgSafe("camping.svg", "Camping"), 0.02),
        () => qInput("inhoud", "story_hard",
          "Een vat bevat 20 l. Oscar tapt 8 keer 7,5 dl. Hoeveel liter zit er nog in het vat? ____ l.",
          14, "number", "l", svgImgSafe("vat_20l.svg", "Vat"), 0.02),

      ],
    },

    /* =========================
       SCHATTEN
    ========================= */
    schatting: {
      easy: [
        () => qMc("inhoud", "schatting_easy",
          "Welke schatting past het best bij een badkuip?",
          ["15 l", "150 l", "1500 l"], "150 l", svgImgSafe("badkuip.svg", "Badkuip")),
        () => qMc("inhoud", "schatting_easy",
          "Welke schatting past het best bij een aquarium?",
          ["6 l", "60 l", "600 l"], "60 l", svgImgSafe("aquarium.svg", "Aquarium")),
        () => qMc("inhoud", "schatting_easy",
          "Welke schatting past het best bij een waterkoker?",
          ["0,15 l", "1,5 l", "15 l"], "1,5 l", svgImgSafe("waterkoker.svg", "Waterkoker")),
        () => qMc("inhoud", "schatting_easy",
          "Welke schatting past het best bij een koffiemachine-reservoir?",
          ["0,1 l", "1 l", "10 l"], "1 l", svgImgSafe("koffiemachine.svg", "Koffiemachine")),
        () => qMc("inhoud", "schatting_easy",
          "Schat: hoeveel past er in een waterkoker?",
          ["0,2 l", "1,7 l", "20 l"], "1,7 l", svgImgSafe("waterkoker.svg", "Waterkoker")),
        () => qMc("inhoud", "schatting_easy",
          "Schat: hoeveel past er in een glas water?",
          ["20 cl", "2 l", "200 l"], "20 cl", svgImgSafe("glas_water.svg", "Glas")),
        () => qMc("inhoud", "schatting_easy",
          "Schat: hoeveel is een eetlepel?",
          ["15 ml", "15 cl", "15 l"], "15 ml", svgImgSafe("eetlepel_15ml.svg", "Eetlepel")),
        () => qMc("inhoud", "schatting_easy",
          "Schat: hoeveel past er in een waterzak?",
          ["2 l", "20 cl", "200 l"], "2 l", svgImgSafe("waterzak_2l.svg", "Waterzak")),

      ],
      normal: [
        () => qMc("inhoud", "schatting_normal",
          "Welke schatting past het best bij een klein opblaaszwembad?",
          ["80 l", "800 l", "8000 l"], "800 l", svgImgSafe("zwembad_opblaas.svg", "Zwembadje")),
        () => qMc("inhoud", "schatting_normal",
          "Welke is het meest realistisch?",
          ["Een drinkyoghurt: 2 l", "Een drinkyoghurt: 200 ml", "Een drinkyoghurt: 20 ml"], "Een drinkyoghurt: 200 ml",
          svgImgSafe("yoghurt_drink_200ml.svg", "Drinkyoghurt")),
        () => qMc("inhoud", "schatting_normal",
          "Welke is het meest realistisch?",
          ["Handgel: 250 ml", "Handgel: 25 l", "Handgel: 2 ml"], "Handgel: 250 ml", svgImgSafe("handgel.svg", "Handgel")),
        () => qMc("inhoud", "schatting_normal",
          "Welke is het meest realistisch?",
          ["Shampoo: 400 ml", "Shampoo: 4 l", "Shampoo: 40 ml"], "Shampoo: 400 ml", svgImgSafe("shampoo_fles.svg", "Shampoo")),
        () => qMc("inhoud", "schatting_normal",
          "Schat: hoeveel water zit er in een aquarium?",
          ["6 l", "60 l", "600 l"], "60 l", svgImgSafe("aquarium.svg", "Aquarium")),
        () => qMc("inhoud", "schatting_normal",
          "Schat: hoeveel frisdrank zit er in een grote fles?",
          ["1,5 l", "15 l", "150 ml"], "1,5 l", svgImgSafe("petfles_1_5l.svg", "Fles")),
        () => qMc("inhoud", "schatting_normal",
          "Schat: hoeveel past er in een verfbeker?",
          ["10 l", "1 dl", "10 ml"], "10 l", svgImgSafe("verfbeker.svg", "Verf")),

      ],
      hard: [
        () => qMc("inhoud", "schatting_hard",
          "Welke is het meest realistisch?",
          ["Een vat: 50 cl", "Een vat: 50 l", "Een vat: 50 ml"], "Een vat: 50 l", svgImgSafe("vat_50l.svg", "Vat")),
        () => qMc("inhoud", "schatting_hard",
          "Welke is het meest realistisch?",
          ["Een jerrycan: 10 l", "Een jerrycan: 10 ml", "Een jerrycan: 10 cl"], "Een jerrycan: 10 l", svgImgSafe("jerrycan_10l.svg", "Jerrycan")),
        () => qMc("inhoud", "schatting_hard",
          "Welke is het meest realistisch?",
          ["Een spuit: 20 ml", "Een spuit: 2 l", "Een spuit: 200 cl"], "Een spuit: 20 ml", svgImgSafe("spuit_20ml.svg", "Spuit")),
        () => qMc("inhoud", "schatting_hard",
          "Welke is het meest realistisch?",
          ["Een waterzak: 2 l", "Een waterzak: 2 ml", "Een waterzak: 20 l"], "Een waterzak: 2 l", svgImgSafe("waterzak_2l.svg", "Waterzak")),
        () => qMc("inhoud", "schatting_hard",
          "Schat: hoeveel water past er in een badkuip?",
          ["15 l", "150 l", "1500 l"], "150 l", svgImgSafe("badkuip.svg", "Badkuip")),
        () => qMc("inhoud", "schatting_hard",
          "Schat: hoeveel water past er in een kleine opblaas-zwembad?",
          ["80 l", "800 l", "8000 l"], "800 l", svgImgSafe("zwembad_opblaas.svg", "Zwembad")),
        () => qMc("inhoud", "schatting_hard",
          "Schat: hoeveel water past er in een drinkfonteinreservoir?",
          ["5 l", "50 l", "500 l"], "50 l", svgImgSafe("drinkfontein.svg", "Drinkfontein")),

      ],
    },

    /* =========================
       MASS (water: 1 l ≈ 1 kg)
       Geen kubieke eenheden hier
    ========================= */
    mass: {
      easy: [
        () => qInput("inhoud", "mass_easy", "Water: 2 l weegt ongeveer ____ kg", 2, "number", "kg",
          svgImgSafe("petfles_1l.svg", "Water"), 0.01),
        () => qInput("inhoud", "mass_easy", "Water: 750 ml weegt ongeveer ____ g", 750, "number", "g",
          svgImgSafe("sportfles.svg", "Water"), 0.01),
        () => qInput("inhoud", "mass_easy", "Water: 1,5 l weegt ongeveer ____ kg", 1.5, "number", "kg",
          svgImgSafe("petfles_1_5l.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_easy", "Water: 500 ml weegt ongeveer ____ g", 500, "number", "g",
          svgImgSafe("drinkbus.svg", "Water"), 0.01),
        () => qInput("inhoud", "mass_easy",
          "Water: 500 ml weegt ongeveer ____ g.",
          500, "number", "g", svgImgSafe("kan_water.svg", "Water")),
        () => qInput("inhoud", "mass_easy",
          "Water: 0,25 l weegt ongeveer ____ g.",
          250, "number", "g", svgImgSafe("glas_water.svg", "Glas")),
        () => qInput("inhoud", "mass_easy",
          "Water: 12 cl weegt ongeveer ____ g.",
          120, "number", "g", svgImgSafe("wijnglas.svg", "Glas")),
        () => qInput("inhoud", "mass_easy",
          "Water: 4 dl weegt ongeveer ____ g.",
          400, "number", "g", svgImgSafe("maatbeker_dl.svg", "Maatbeker")),

      ],
      normal: [
        () => qInput("inhoud", "mass_normal", "Water: 0,6 l weegt ongeveer ____ g", 600, "number", "g",
          svgImgSafe("thermos.svg", "Water"), 0.01),
        () => qInput("inhoud", "mass_normal", "Water: 2,75 l weegt ongeveer ____ kg", 2.75, "number", "kg",
          svgImgSafe("kan_water.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_normal", "Water: 1800 ml weegt ongeveer ____ kg", 1.8, "number", "kg",
          svgImgSafe("waterkoker.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_normal", "Water: 0,45 l weegt ongeveer ____ g", 450, "number", "g",
          svgImgSafe("sportbidon.svg", "Water"), 0.01),
        () => qInput("inhoud", "mass_normal",
          "Water: 1,25 l weegt ongeveer ____ g.",
          1250, "number", "g", svgImgSafe("petfles_1l.svg", "Fles")),
        () => qInput("inhoud", "mass_normal",
          "Water: 95 cl weegt ongeveer ____ g.",
          950, "number", "g", svgImgSafe("thermos.svg", "Thermos")),
        () => qInput("inhoud", "mass_normal",
          "Water: 2,4 l weegt ongeveer ____ kg.",
          2.4, "number", "kg", svgImgSafe("kookpot.svg", "Pot"), 0.02),

      ],
      hard: [
        () => qInput("inhoud", "mass_hard", "Water: 5 l weegt ongeveer ____ kg", 5, "number", "kg",
          svgImgSafe("jerrycan_5l.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_hard", "Water: 10 l weegt ongeveer ____ kg", 10, "number", "kg",
          svgImgSafe("jerrycan_10l.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_hard", "Water: 20 l weegt ongeveer ____ kg", 20, "number", "kg",
          svgImgSafe("vat_20l.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_hard", "Water: 50 l weegt ongeveer ____ kg", 50, "number", "kg",
          svgImgSafe("vat_50l.svg", "Water"), 0.02),
        () => qInput("inhoud", "mass_hard",
          "Water: 0,015 m³ water weegt ongeveer ____ g.",
          15000, "number", "g", svgImgSafe("zwembad_opblaas.svg", "Zwembad")),
        () => qInput("inhoud", "mass_hard",
          "Water: 35 000 cm³ water weegt ongeveer ____ kg.",
          35, "number", "kg", svgImgSafe("aquarium.svg", "Aquarium")),
        () => qInput("inhoud", "mass_hard",
          "Water: 2,4 dm³ water weegt ongeveer ____ g.",
          2400, "number", "g", svgImgSafe("maatbeker_1000ml.svg", "Maatbeker")),

      ],
    },

    /* =========================
       COMPARE
    ========================= */
    compare: {
      easy: [
        () => qMc("inhoud", "compare_easy", "Wat is meer?",
          ["500 ml", "2 l"], "2 l",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("drinkbus.svg", "500 ml")}
           </div>`),
        () => qMc("inhoud", "compare_easy", "Wat is meer?",
          ["75 cl", "500 ml"], "75 cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("sportfles.svg", "75 cl")}
           </div>`),
        () => qInput("inhoud", "compare_easy", "Verschil: 2 l − 500 ml = ____ ml", 1500, "number", "ml",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("kan_water.svg", "2 l")}
             ${svgImgSafe("petfles_500ml.svg", "500 ml")}
           </div>`, 0.01),
        () => qInput("inhoud", "compare_easy", "Verschil: 1 l − 25 cl = ____ cl", 75, "number", "cl",
          `<div style="display:grid;gap:10px;justify-items:center">
             ${svgImgSafe("petfles_1l.svg", "1 l")}
             ${svgImgSafe("glas_water.svg", "25 cl")}
           </div>`, 0.01),
        () => qMc("inhoud", "compare_easy",
          "Wat is meer?",
          ["1 l", "85 cl"], "1 l", svgImgSafe("brik_melk_1l.svg", "Brik")),
        () => qMc("inhoud", "compare_easy",
          "Wat is meer?",
          ["250 ml", "30 cl"], "30 cl", svgImgSafe("glas_water.svg", "Glas")),
        () => qInput("inhoud", "compare_easy",
          "Verschil:\n750 ml − 25 cl = ____ ml.",
          500, "number", "ml", svgImgSafe("sportfles.svg", "Fles")),
        () => qInput("inhoud", "compare_easy",
          "Som:\n200 ml + 3 dl = ____ ml.",
          500, "number", "ml", svgImgSafe("maatbeker_dl.svg", "Maatbeker")),

      ],
      normal: [
        () => qMc("inhoud", "compare_normal", "Wat is het kleinste?",
          ["0,75 l", "80 cl", "700 ml"], "700 ml",
          svgImgSafe("supermarkt_rek.svg", "Vergelijk")),
        () => qInput("inhoud", "compare_normal",
          "Som: 350 ml + 0,4 l = ____ ml", 750, "number", "ml",
          svgImgSafe("limonade.svg", "Som"), 0.01),
        () => qInput("inhoud", "compare_normal",
          "Som: 2 dl + 15 cl = ____ cl", 35, "number", "cl",
          svgImgSafe("soepkom.svg", "Som"), 0.01),
        () => qInput("inhoud", "compare_normal",
          "Noor heeft 0,9 l.\nYassin heeft 8,5 dl.\nNoor heeft ____ ml meer.", 50, "number", "ml",
          svgImgSafe("drinkfontein.svg", "Flessen"), 0.01),
        () => qInput("inhoud", "compare_normal",
          "Som:\n1,2 l + 35 cl = ____ ml.",
          1550, "number", "ml", svgImgSafe("sportbidon.svg", "Bidon")),
        () => qMc("inhoud", "compare_normal",
          "Wat is het grootste?",
          ["0,6 l", "65 cl", "550 ml"], "65 cl", svgImgSafe("thermos.svg", "Thermos")),
        () => qInput("inhoud", "compare_normal",
          "Verschil:\n1,8 l − 9 dl = ____ ml.",
          900, "number", "ml", svgImgSafe("petfles_1_5l.svg", "Fles")),

      ],
      hard: [
        () => qInput("inhoud", "compare_hard",
          "Verschil: 1,75 l − 650 ml = ____ ml", 1100, "number", "ml",
          svgImgSafe("sportbidon.svg", "Verschil"), 0.01),
        () => qInput("inhoud", "compare_hard",
          "Som: 0,8 l + 2 dl + 35 cl = ____ ml", 1350, "number", "ml",
          svgImgSafe("koelkast.svg", "Som"), 0.01),
        () => qMc("inhoud", "compare_hard",
          "Wat is het grootste?", ["12 dl", "1,05 l", "980 ml"], "12 dl",
          svgImgSafe("supermarkt_rek.svg", "Grootste")),
        () => qInput("inhoud", "compare_hard",
          "Er zijn 9 siroopflessen van 100 ml.\nSamen ____ ml.", 900, "number", "ml",
          svgImgSafe("medicijnsiroop.svg", "Siroop"), 0.01),
        () => qInput("inhoud", "compare_hard",
          "Som:\n1,25 l + 750 ml + 8 dl = ____ ml.",
          2800, "number", "ml", svgImgSafe("jerrycan_5l.svg", "Jerrycan")),
        () => qInput("inhoud", "compare_hard",
          "Verschil:\n2,4 l − 1350 ml = ____ cl.",
          105, "number", "cl", svgImgSafe("kookpot.svg", "Pot")),
        () => qMc("inhoud", "compare_hard",
          "Wat is het kleinste?",
          ["0,95 l", "9,2 dl", "900 ml"], "900 ml", svgImgSafe("glas_water.svg", "Glas")),

      ],
    },

    /* =========================
       ERROR
    ========================= */
    error: {
      easy: [
        () => qMc("inhoud", "error_easy", "Iemand zegt: 1 l = 100 ml.\nKlopt dat?", ["ja", "nee"], "nee",
          svgImgSafe("boog_gedeeld.svg", "Fout?")),
        () => qMc("inhoud", "error_easy", "Iemand zegt: 1 l = 1000 ml.\nKlopt dat?", ["ja", "nee"], "ja",
          svgImgSafe("boog_maal.svg", "Juist?")),
        () => qMc("inhoud", "error_easy", "Iemand zegt: 1 dl = 10 ml.\nKlopt dat?", ["ja", "nee"], "nee",
          svgImgSafe("pijl_gedeeld.svg", "Fout?")),
        () => qMc("inhoud", "error_easy", "Iemand zegt: 1 dl = 100 ml.\nKlopt dat?", ["ja", "nee"], "ja",
          svgImgSafe("pijl_maal.svg", "Juist?")),
        () => qMc("inhoud", "error_easy",
          "Iemand zegt: 1 cl = 100 ml.\nKlopt dat?",
          ["ja", "nee"], "nee", svgImgSafe("pijl_maal.svg", "")),
        () => qMc("inhoud", "error_easy",
          "Iemand zegt: 5 dl = 0,5 l.\nKlopt dat?",
          ["ja", "nee"], "ja", svgImgSafe("pijl_gedeeld.svg", "")),
        () => qMc("inhoud", "error_easy",
          "Iemand zegt: 250 ml = 2,5 cl.\nKlopt dat?",
          ["ja", "nee"], "nee", svgImgSafe("pijl_maal.svg", "")),
        () => qMc("inhoud", "error_easy",
          "Iemand zegt: 10 dl = 1 l.\nKlopt dat?",
          ["ja", "nee"], "ja", svgImgSafe("pijl_gedeeld.svg", "")),

      ],
      normal: [
        () => qMc("inhoud", "error_normal", "Welke is juist?",
          ["1 cl = 100 ml", "1 cl = 10 ml"], "1 cl = 10 ml",
          svgImgSafe("boog_gedeeld.svg", "Kies")),
        () => qMc("inhoud", "error_normal", "Welke is juist?",
          ["1 l = 10 dl", "1 l = 100 dl"], "1 l = 10 dl",
          svgImgSafe("boog_maal.svg", "Kies")),
        () => qMc("inhoud", "error_normal", "Welke is fout?",
          ["1 l = 100 cl", "1 l = 1000 ml", "1 l = 100 dl"], "1 l = 100 dl",
          svgImgSafe("supermarkt_rek.svg", "Eén is fout")),
        () => qMc("inhoud", "error_normal", "Welke is fout?",
          ["1 dl = 0,1 l", "1 cl = 0,1 l", "1 ml = 0,001 l"], "1 cl = 0,1 l",
          svgImgSafe("supermarkt_rek.svg", "Eén is fout")),
        () => qMc("inhoud", "error_normal",
          "Welke is juist?",
          ["1 dl = 10 cl", "1 dl = 100 cl"],
          "1 dl = 10 cl", svgImgSafe("maatbeker_dl.svg", "Maatbeker")),
        () => qMc("inhoud", "error_normal",
          "Welke uitspraak is fout?",
          ["1 l = 1000 ml", "1 l = 100 cl", "1 l = 10 000 ml"],
          "1 l = 10 000 ml", svgImgSafe("brik_melk_1l.svg", "Brik")),
        () => qMc("inhoud", "error_normal",
          "Welke is juist?",
          ["1 cl = 10 ml", "1 cl = 100 ml"],
          "1 cl = 10 ml", svgImgSafe("wijnglas.svg", "Glas")),

      ],
      hard: [
        () => qMc("inhoud", "error_hard", "Iemand rekent: 0,8 l = 80 ml.\nKlopt dit?", ["ja", "nee"], "nee",
          svgImgSafe("pijl_gedeeld.svg", "Fout?")),
        () => qMc("inhoud", "error_hard", "Iemand rekent: 350 ml = 3,5 dl.\nKlopt dit?", ["ja", "nee"], "ja",
          svgImgSafe("pijl_maal.svg", "Juist?")),
        () => qMc("inhoud", "error_hard", "Iemand zegt: 2,5 l = 25 cl.\nKlopt dit?", ["ja", "nee"], "nee",
          svgImgSafe("boog_gedeeld.svg", "Fout?")),
        () => qMc("inhoud", "error_hard", "Iemand zegt: 75 cl = 0,75 l.\nKlopt dit?", ["ja", "nee"], "ja",
          svgImgSafe("boog_maal.svg", "Juist?")),
        () => qMc("inhoud", "error_hard",
          "Iemand rekent: 2 dl = 20 ml.\nKlopt dit?",
          ["ja", "nee"], "nee", svgImgSafe("maatbeker_dl.svg", "")),
        () => qMc("inhoud", "error_hard",
          "Iemand zegt: 1,2 l = 120 cl.\nKlopt dat?",
          ["ja", "nee"], "ja", svgImgSafe("petfles_1l.svg", "")),
        () => qMc("inhoud", "error_hard",
          "Iemand zegt: 0,35 l = 35 dl.\nKlopt dat?",
          ["ja", "nee"], "nee", svgImgSafe("thermos.svg", "")),

      ],
    },

  },
  grafieken: {
    line_read: {

      easy: [
        () => {
          const points = [
            { x: "Ma", y: 3 },
            { x: "Di", y: 5 },
            { x: "Wo", y: 4 },
            { x: "Do", y: 6 },
            { x: "Vr", y: 7 }
          ];
          const v = svgLineChart(points, 10, "Aantal fouten per dag");
          return qInput(
            "grafieken",
            "line_read_easy",
            "Een leerling noteert elke dag hoeveel fouten hij maakt.\nHoeveel fouten maakte hij op donderdag?",
            6,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const points = [
            { x: "8u", y: 12 },
            { x: "10u", y: 18 },
            { x: "12u", y: 25 },
            { x: "14u", y: 20 }
          ];
          const v = svgLineChart(points, 30, "Aantal bezoekers in het jeugdcentrum");
          return qMc(
            "grafieken",
            "line_read_easy",
            "In een jeugdcentrum wordt het aantal bezoekers geteld.\nOp welk tijdstip zijn er de meeste bezoekers?",
            ["8u", "10u", "12u", "14u"],
            "12u",
            v
          );
        },

        // ✅ EXTRA 1 (easy) exacte aflezing
        () => {
          const points = [
            { x: "Ma", y: 2 },
            { x: "Di", y: 4 },
            { x: "Wo", y: 3 },
            { x: "Do", y: 5 }
          ];
          const v = svgLineChart(points, 6, "Aantal gemaakte oefeningen");
          return qInput(
            "grafieken",
            "line_read_easy",
            "Een leerling maakt oefeningen voor wiskunde.\nHoeveel oefeningen maakte hij op dinsdag?",
            4,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 2 (easy) laagste punt (MC)
        () => {
          const points = [
            { x: "Dag 1", y: 6 },
            { x: "Dag 2", y: 5 },
            { x: "Dag 3", y: 7 },
            { x: "Dag 4", y: 4 }
          ];
          const v = svgLineChart(points, 10, "Aantal punten");
          return qMc(
            "grafieken",
            "line_read_easy",
            "Bekijk de grafiek.\nOp welke dag is het aantal punten het laagst?",
            ["Dag 1", "Dag 2", "Dag 3", "Dag 4"],
            "Dag 4",
            v
          );
        },

        // ✅ EXTRA 3 (easy) waarde op een tijdstip
        () => {
          const points = [
            { x: "8u", y: 5 },
            { x: "10u", y: 9 },
            { x: "12u", y: 8 },
            { x: "14u", y: 6 }
          ];
          const v = svgLineChart(points, 12, "Aantal bezoekers (kleine groep)");
          return qInput(
            "grafieken",
            "line_read_easy",
            "In een kleine ruimte worden bezoekers geteld.\nHoeveel bezoekers zijn er om 10u?",
            9,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 4 (easy) hoogste waarde aflezen (getal)
        () => {
          const points = [
            { x: "Ma", y: 1 },
            { x: "Di", y: 3 },
            { x: "Wo", y: 2 },
            { x: "Do", y: 4 },
            { x: "Vr", y: 3 }
          ];
          const v = svgLineChart(points, 6, "Boeken gelezen per dag");
          return qInput(
            "grafieken",
            "line_read_easy",
            "Een leerling leest boeken.\nWat is het hoogste aantal boeken dat hij op één dag las?",
            4,
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      normal: [
        () => {
          const points = [
            { x: "Dag 1", y: 2 },
            { x: "Dag 2", y: 4 },
            { x: "Dag 3", y: 6 },
            { x: "Dag 4", y: 6 },
            { x: "Dag 5", y: 8 }
          ];
          const v = svgLineChart(points, 10, "Aantal gelopen rondes");
          return qInput(
            "grafieken",
            "line_read_normal",
            "Yassin loopt elke dag rondjes op de speelplaats.\nHoeveel rondes liep hij op dag 5?",
            8,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const points = [
            { x: "Ma", y: 14 },
            { x: "Di", y: 16 },
            { x: "Wo", y: 13 },
            { x: "Do", y: 18 },
            { x: "Vr", y: 20 }
          ];
          const v = svgLineChart(points, 25, "Temperatuur deze week (°C)");
          return qInput(
            "grafieken",
            "line_read_normal",
            "De temperatuur wordt elke dag gemeten.\nWat is de temperatuur op vrijdag?",
            20,
            "number",
            "°C",
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (normal) exacte aflezing midden in reeks
        () => {
          const points = [
            { x: "Week 1", y: 6 },
            { x: "Week 2", y: 9 },
            { x: "Week 3", y: 8 },
            { x: "Week 4", y: 10 },
            { x: "Week 5", y: 7 }
          ];
          const v = svgLineChart(points, 12, "Aantal gemaakte taken");
          return qInput(
            "grafieken",
            "line_read_normal",
            "Een leerling noteert hoeveel taken hij maakt.\nHoeveel taken maakte hij in week 3?",
            8,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 2 (normal) welke dagen gelijke waarde (MC)
        () => {
          const points = [
            { x: "Ma", y: 5 },
            { x: "Di", y: 7 },
            { x: "Wo", y: 7 },
            { x: "Do", y: 6 }
          ];
          const v = svgLineChart(points, 10, "Aantal bezoekers");
          return qMc(
            "grafieken",
            "line_read_normal",
            "Bekijk de grafiek.\nOp welke dagen is het aantal bezoekers even groot?",
            ["Ma & Di", "Di & Wo", "Wo & Do", "Ma & Do"],
            "Di & Wo",
            v
          );
        },

        // ✅ EXTRA 3 (normal) laagste punt herkennen
        () => {
          const points = [
            { x: "8u", y: 10 },
            { x: "10u", y: 14 },
            { x: "12u", y: 9 },
            { x: "14u", y: 13 }
          ];
          const v = svgLineChart(points, 16, "Aantal bezoekers");
          return qMc(
            "grafieken",
            "line_read_normal",
            "In een jeugdcentrum wordt het aantal bezoekers geteld.\nOp welk tijdstip zijn er het minst bezoekers?",
            ["8u", "10u", "12u", "14u"],
            "12u",
            v
          );
        },

        // ✅ EXTRA 4 (normal) waarde aflezen met eenheid
        () => {
          const points = [
            { x: "Jan", y: 18 },
            { x: "Feb", y: 20 },
            { x: "Mrt", y: 19 },
            { x: "Apr", y: 22 }
          ];
          const v = svgLineChart(points, 25, "Temperatuur per maand (°C)");
          return qInput(
            "grafieken",
            "line_read_normal",
            "De temperatuur wordt per maand genoteerd.\nWat is de temperatuur in april?",
            22,
            "number",
            "°C",
            v,
            0.01
          );
        }
      ],

      hard: [
        () => {
          const points = [
            { x: "Week 1", y: 12 },
            { x: "Week 2", y: 18 },
            { x: "Week 3", y: 15 },
            { x: "Week 4", y: 22 }
          ];
          const v = svgLineChart(points, 25, "Aantal gespaarde euro's");
          return qInput(
            "grafieken",
            "line_read_hard",
            "Amina spaart elke week wat geld.\nHoeveel euro spaarde ze in week 4?",
            22,
            "number",
            "€",
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (hard) kommagetal aflezen
        () => {
          const points = [
            { x: "Groep A", y: 2.6 },
            { x: "Groep B", y: 3.1 },
            { x: "Groep C", y: 2.8 },
            { x: "Groep D", y: 3.4 }
          ];
          const v = svgLineChart(points, 4.0, "Gemiddelde score (op 4)");
          return qInput(
            "grafieken",
            "line_read_hard",
            "De leerkracht noteert de gemiddelde score per groep.\nWat is de gemiddelde score van groep D?",
            3.4,
            "number",
            null,
            v,
            0.05,
            "Schrijf met een komma."
          );
        },

        // ✅ EXTRA 2 (hard) grote waarden aflezen
        () => {
          const points = [
            { x: "Jan", y: 210 },
            { x: "Feb", y: 185 },
            { x: "Mrt", y: 240 },
            { x: "Apr", y: 195 }
          ];
          const v = svgLineChart(points, 260, "Bezoekers per maand");
          return qInput(
            "grafieken",
            "line_read_hard",
            "Een bibliotheek telt bezoekers per maand.\nHoeveel bezoekers waren er in maart?",
            240,
            "number",
            null,
            v,
            0.5
          );
        },

        // ✅ EXTRA 3 (hard) x10 interpreteren
        () => {
          const points = [
            { x: "8u", y: 3 },
            { x: "10u", y: 7 },
            { x: "12u", y: 6 },
            { x: "14u", y: 4 }
          ];
          const v = svgLineChart(points, 10, "Bezoekers per tijdstip (x10)");
          return qInput(
            "grafieken",
            "line_read_hard",
            "In een jeugdcentrum wordt het aantal bezoekers geteld (x10).\nHoeveel bezoekers zijn er om 10u?",
            7 * 10,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 4 (hard) laagste waarde aflezen (getal)
        () => {
          const points = [
            { x: "Dag 1", y: 48 },
            { x: "Dag 2", y: 56 },
            { x: "Dag 3", y: 52 },
            { x: "Dag 4", y: 60 },
            { x: "Dag 5", y: 50 }
          ];
          const v = svgLineChart(points, 70, "Totaal aantal punten");
          return qInput(
            "grafieken",
            "line_read_hard",
            "Vier teams noteren hun punten.\nWat is het laagste aantal punten dat voorkomt?",
            48,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 5 (hard) welke periode hoogste (MC)
        () => {
          const points = [
            { x: "Week 1", y: 120 },
            { x: "Week 2", y: 150 },
            { x: "Week 3", y: 135 },
            { x: "Week 4", y: 165 },
            { x: "Week 5", y: 160 }
          ];
          const v = svgLineChart(points, 180, "Omzet per week (in euro)");
          return qMc(
            "grafieken",
            "line_read_hard",
            "Een schoolbar noteert de omzet per week.\nIn welke week is de omzet het hoogst?",
            ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            "Week 4",
            v
          );
        }
      ]

    },
    bar_read: {

      easy: [
        () => {
          const data = [
            { label: "Appel", value: 4 },
            { label: "Banaan", value: 7 },
            { label: "Druif", value: 5 },
            { label: "Peer", value: 6 }
          ];
          const v = svgBarChart(data, 10, "Favoriet fruit van 1B");
          return qMc(
            "grafieken",
            "bar_read_easy",
            "Aan de leerlingen van 1B werd gevraagd welk fruit ze het liefst eten. Bekijk het staafdiagram.\nWelk fruit wordt het meest gekozen?",
            ["Appel", "Banaan", "Druif", "Peer"],
            "Banaan",
            v
          );
        },

        () => {
          const data = [
            { label: "Ma", value: 12 },
            { label: "Di", value: 18 },
            { label: "Wo", value: 10 },
            { label: "Do", value: 14 }
          ];
          const v = svgBarChart(data, 20, "Verkochte wafels");
          return qMc(
            "grafieken",
            "bar_read_easy",
            "Op de speelplaats verkoopt Sara wafels na schooltijd. Elke dag noteert ze hoeveel wafels ze verkoopt.\nOp welke dag werden de meeste wafels verkocht?",
            ["Ma", "Di", "Wo", "Do"],
            "Di",
            v
          );
        },

        () => {
          const data = [
            { label: "Groep A", value: 6 },
            { label: "Groep B", value: 9 },
            { label: "Groep C", value: 3 },
            { label: "Groep D", value: 8 }
          ];
          const v = svgBarChart(data, 10, "Punten per groep");
          return qInput(
            "grafieken",
            "bar_read_easy",
            "De klas werd in groepjes verdeeld voor een quiz. Bekijk het diagram.\nHoeveel punten behaalde groep B?",
            9,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const data = [
            { label: "Klas 2A", value: 16 },
            { label: "Klas 2B", value: 19 },
            { label: "Klas 2C", value: 14 }
          ];
          const v = svgBarChart(data, 20, "Aanwezige leerlingen");
          return qInput(
            "grafieken",
            "bar_read_easy",
            "De directeur telt hoeveel leerlingen vandaag aanwezig zijn.\nHoeveel leerlingen zijn er aanwezig in klas 2B?",
            19,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (easy) minst gekozen
        () => {
          const data = [
            { label: "Voetbal", value: 9 },
            { label: "Basketbal", value: 6 },
            { label: "Zwemmen", value: 5 },
            { label: "Dans", value: 8 }
          ];
          const v = svgBarChart(data, 12, "Sportkeuze");
          return qMc(
            "grafieken",
            "bar_read_easy",
            "Leerlingen kiezen een sport na school.\nWelke sport wordt het minst gekozen?",
            ["Voetbal", "Basketbal", "Zwemmen", "Dans"],
            "Zwemmen",
            v
          );
        },

        // ✅ EXTRA 2 (easy) exacte aflezing
        () => {
          const data = [
            { label: "Oef. 1", value: 5 },
            { label: "Oef. 2", value: 7 },
            { label: "Oef. 3", value: 4 },
            { label: "Oef. 4", value: 6 }
          ];
          const v = svgBarChart(data, 10, "Juiste antwoorden");
          return qInput(
            "grafieken",
            "bar_read_easy",
            "Een leerling maakt vier oefeningen.\nHoeveel juiste antwoorden had hij bij oefening 2?",
            7,
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      normal: [
        () => {
          const cats = ["Tomaat", "Komkommer", "Paprika", "Wortel"];
          const vals = [1.4, 1.2, 1.6, 1.0];
          const v = svgBarChartFine(cats, vals, 2.0, 0.1, "Prijs per kilogram (in euro)");
          const i = Math.floor(Math.random() * cats.length);
          return qInput(
            "grafieken",
            "bar_read_normal",
            `In een buurtwinkel bekijkt Amir de prijzen van groenten.\nWat is de prijs per kilogram van ${cats[i]}?`,
            vals[i],
            "number",
            "€",
            v,
            0.02,
            "Schrijf met een komma."
          );
        },

        () => {
          const data = [
            { label: "Jan", value: 22 },
            { label: "Feb", value: 18 },
            { label: "Mrt", value: 25 },
            { label: "Apr", value: 20 }
          ];
          const v = svgBarChart(data, 30, "Behaalde punten per maand");
          return qInput(
            "grafieken",
            "bar_read_normal",
            "Lina houdt haar scores bij per maand.\nHoeveel punten behaalde ze in maart?",
            25,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const data = [
            { label: "Rit 1", value: 145 },
            { label: "Rit 2", value: 132 },
            { label: "Rit 3", value: 158 },
            { label: "Rit 4", value: 151 }
          ];
          const v = svgBarChart(data, 170, "Afstand per fietstocht (km)");
          return qMc(
            "grafieken",
            "bar_read_normal",
            "Een sportklas fietst vier verschillende routes.\nWelke rit is het langst?",
            ["Rit 1", "Rit 2", "Rit 3", "Rit 4"],
            "Rit 3",
            v
          );
        },

        () => {
          const data = [
            { label: "8u", value: 3 },
            { label: "12u", value: 7 },
            { label: "16u", value: 6 },
            { label: "20u", value: 4 }
          ];
          const v = svgBarChart(data, 10, "Bezoekers per tijdstip (x10)");
          return qInput(
            "grafieken",
            "bar_read_normal",
            "In een jeugdcentrum wordt het aantal bezoekers geteld.\nHoeveel tientallen bezoekers zijn er om 12 uur?",
            7,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (normal) tweede hoogste
        () => {
          const data = [
            { label: "Klas A", value: 17 },
            { label: "Klas B", value: 21 },
            { label: "Klas C", value: 15 },
            { label: "Klas D", value: 19 }
          ];
          const v = svgBarChart(data, 25, "Aantal leerlingen per klas");
          return qMc(
            "grafieken",
            "bar_read_normal",
            "De school telt het aantal leerlingen per klas.\nWelke klas heeft het tweede grootste aantal leerlingen?",
            ["Klas A", "Klas B", "Klas C", "Klas D"],
            "Klas D",
            v
          );
        },

        // ✅ EXTRA 2 (normal) exacte aflezing met grotere schaal
        () => {
          const data = [
            { label: "Ma", value: 12 },
            { label: "Di", value: 18 },
            { label: "Wo", value: 10 },
            { label: "Do", value: 14 },
            { label: "Vr", value: 16 }
          ];
          const v = svgBarChart(data, 20, "Aantal gemaakte oefeningen");
          return qInput(
            "grafieken",
            "bar_read_normal",
            "Een leerling noteert hoeveel oefeningen hij maakt.\nHoeveel oefeningen maakte hij op vrijdag?",
            16,
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      hard: [
        () => {
          const cats = ["Groep A", "Groep B", "Groep C", "Groep D", "Groep E"];
          const vals = [3.2, 2.8, 3.7, 3.1, 2.6];
          const v = svgBarChartFine(cats, vals, 4.0, 0.1, "Gemiddelde score (op 4)");
          const i = 1 + Math.floor(Math.random() * (cats.length - 1));
          return qInput(
            "grafieken",
            "bar_read_hard",
            `De leerkracht berekent de gemiddelde score van elke groep.\nWat is de gemiddelde score van ${cats[i]}?`,
            vals[i],
            "number",
            null,
            v,
            0.05
          );
        },

        () => {
          const data = [
            { label: "Team A", value: 48 },
            { label: "Team B", value: 56 },
            { label: "Team C", value: 52 },
            { label: "Team D", value: 60 }
          ];
          const v = svgBarChart(data, 70, "Totaal aantal punten");
          return qInput(
            "grafieken",
            "bar_read_hard",
            "Vier teams nemen deel aan een sportdag.\nHoeveel punten behaalde Team D?",
            60,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const cats = ["Brood", "Melk", "Eieren", "Appels"];
          const vals = [2.3, 1.7, 3.1, 2.6];
          const v = svgBarChartFine(cats, vals, 4.0, 0.1, "Prijs per product (in euro)");
          return qMc(
            "grafieken",
            "bar_read_hard",
            "In de supermarkt vergelijkt Youssef prijzen.\nWelk product is het duurst?",
            cats,
            "Eieren",
            v
          );
        },

        () => {
          const cats = ["Ingeschreven", "Aanwezig", "Geslaagd"];
          const vals = [28, 25, 21];
          const v = svgBarChartFine(cats, vals, 30, 1, "Examenresultaten");
          return qInput(
            "grafieken",
            "bar_read_hard",
            "Na een toets bekijkt de school de resultaten.\nHoeveel leerlingen zijn geslaagd?",
            21,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (hard) grote getallen aflezen
        () => {
          const data = [
            { label: "Jan", value: 210 },
            { label: "Feb", value: 185 },
            { label: "Mrt", value: 240 },
            { label: "Apr", value: 195 }
          ];
          const v = svgBarChart(data, 260, "Bezoekers in de bib");
          return qInput(
            "grafieken",
            "bar_read_hard",
            "Een bibliotheek telt het aantal bezoekers per maand.\nHoeveel bezoekers waren er in maart?",
            240,
            "number",
            null,
            v,
            0.5
          );
        },

        // ✅ EXTRA 2 (hard) x10 correct interpreteren
        () => {
          const data = [
            { label: "8u", value: 3 },
            { label: "12u", value: 7 },
            { label: "16u", value: 6 },
            { label: "20u", value: 4 }
          ];
          const v = svgBarChart(data, 10, "Bezoekers per tijdstip (x10)");
          return qInput(
            "grafieken",
            "bar_read_hard",
            "In een jeugdcentrum wordt het aantal bezoekers geteld.\nHoeveel bezoekers (niet tientallen) zijn er om 16 uur?",
            6 * 10,
            "number",
            null,
            v,
            0.01
          );
        }
      ]

    },
    bar_compare: {

      easy: [
        () => {
          const data = [
            { label: "Rood", value: 8 },
            { label: "Blauw", value: 5 },
            { label: "Groen", value: 11 },
            { label: "Geel", value: 6 }
          ];
          const v = svgBarChart(data, 12, "Stemmen per kleur");
          return qInput(
            "grafieken",
            "bar_compare_easy",
            "In de klas mochten leerlingen stemmen op hun lievelingskleur.\nHoeveel meer stemmen kreeg groen dan blauw?",
            11 - 5,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const data = [
            { label: "Stand A", value: 10 },
            { label: "Stand B", value: 7 },
            { label: "Stand C", value: 12 },
            { label: "Stand D", value: 9 }
          ];
          const v = svgBarChart(data, 15, "Verkochte kaarten");
          return qInput(
            "grafieken",
            "bar_compare_easy",
            "Op een schoolfeest verkopen vier stands kaarten.\nHoeveel kaarten verkoopt stand B minder dan stand C?",
            12 - 7,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const data = [
            { label: "S", value: 6 },
            { label: "M", value: 8 },
            { label: "L", value: 5 }
          ];
          const v = svgBarChart(data, 10, "Verkochte T-shirts");
          return qMc(
            "grafieken",
            "bar_compare_easy",
            "Een klas verkoopt T-shirts in verschillende maten.\nWelke maat werd het minst verkocht?",
            ["S", "M", "L"],
            "L",
            v
          );
        },

        // ✅ EXTRA 1 (easy) grootste
        () => {
          const data = [
            { label: "Ma", value: 3 },
            { label: "Di", value: 5 },
            { label: "Wo", value: 2 },
            { label: "Do", value: 4 }
          ];
          const v = svgBarChart(data, 6, "Oefeningen gemaakt");
          return qMc(
            "grafieken",
            "bar_compare_easy",
            "Een leerling noteert hoeveel oefeningen hij maakt.\nOp welke dag maakte hij het meest oefeningen?",
            ["Ma", "Di", "Wo", "Do"],
            "Di",
            v
          );
        },

        // ✅ EXTRA 2 (easy) verschil twee balken
        () => {
          const data = [
            { label: "Team 1", value: 9 },
            { label: "Team 2", value: 6 },
            { label: "Team 3", value: 7 }
          ];
          const v = svgBarChart(data, 10, "Gescoorde punten");
          return qInput(
            "grafieken",
            "bar_compare_easy",
            "Drie teams spelen een wedstrijd.\nHoeveel punten scoort team 1 meer dan team 2?",
            9 - 6,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 3 (easy) tweede kleinste herkennen
        () => {
          const data = [
            { label: "Appel", value: 6 },
            { label: "Banaan", value: 4 },
            { label: "Peer", value: 7 },
            { label: "Druif", value: 5 }
          ];
          const v = svgBarChart(data, 8, "Verkocht fruit");
          return qMc(
            "grafieken",
            "bar_compare_easy",
            "Een kraampje verkoopt fruit.\nWelke soort werd het minst verkocht?",
            ["Appel", "Banaan", "Peer", "Druif"],
            "Banaan",
            v
          );
        }
      ],

      normal: [
        () => {
          const cats = ["Tomaat", "Komkommer", "Paprika", "Wortel"];
          const vals = [1.4, 1.2, 1.6, 1.0];
          const v = svgBarChartFine(cats, vals, 2.0, 0.1, "Prijs per kilogram (in euro)");
          return qMc(
            "grafieken",
            "bar_compare_normal",
            "In een buurtwinkel vergelijkt Nour de prijzen van groenten.\nWelke groente is het goedkoopst?",
            cats,
            "Wortel",
            v
          );
        },

        () => {
          const data = [
            { label: "Klas A", value: 17 },
            { label: "Klas B", value: 21 },
            { label: "Klas C", value: 15 },
            { label: "Klas D", value: 19 }
          ];
          const v = svgBarChart(data, 25, "Aantal leerlingen per klas");
          return qInput(
            "grafieken",
            "bar_compare_normal",
            "De school telt het aantal leerlingen per klas.\nHoeveel leerlingen telt klas B meer dan klas C?",
            21 - 15,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const cats = ["Ma", "Di", "Wo", "Do", "Vr"];
          const vals = [14, 16, 12, 18, 20];
          const v = svgBarChartFine(cats, vals, 25, 1, "Aanwezige leerlingen");
          return qInput(
            "grafieken",
            "bar_compare_normal",
            "De school noteert elke dag hoeveel leerlingen aanwezig zijn.\nMet hoeveel leerlingen is de aanwezigheid op vrijdag hoger dan op woensdag?",
            20 - 12,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (normal) totaal van 2 dagen
        () => {
          const cats = ["Ma", "Di", "Wo", "Do", "Vr"];
          const vals = [14, 16, 12, 18, 20];
          const v = svgBarChartFine(cats, vals, 25, 1, "Aanwezige leerlingen");
          return qInput(
            "grafieken",
            "bar_compare_normal",
            "De school noteert elke dag hoeveel leerlingen aanwezig zijn.\nHoeveel leerlingen zijn er samen aanwezig op maandag en dinsdag?",
            14 + 16,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 2 (normal) verschil t.o.v. gemiddelde (2 stappen)
        () => {
          const cats = ["Week 1", "Week 2", "Week 3", "Week 4"];
          const vals = [6, 8, 7, 9];
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length; // 7.5
          const v = svgBarChartFine(cats, vals, 10, 1, "Scores per week");
          return qInput(
            "grafieken",
            "bar_compare_normal",
            "Een leerling krijgt elke week een score.\nHoeveel hoger is week 4 dan de gemiddelde score?",
            9 - avg,
            "number",
            null,
            v,
            0.05,
            "Rond af op 1 decimaal."
          );
        },

        // ✅ EXTRA 3 (normal) rangorde: 2de hoogste
        () => {
          const data = [
            { label: "Groep A", value: 12 },
            { label: "Groep B", value: 15 },
            { label: "Groep C", value: 9 },
            { label: "Groep D", value: 14 }
          ];
          const v = svgBarChart(data, 18, "Punten per groep");
          return qMc(
            "grafieken",
            "bar_compare_normal",
            "Vier groepen maken een quiz.\nWelke groep heeft de tweede hoogste score?",
            ["Groep A", "Groep B", "Groep C", "Groep D"],
            "Groep D",
            v
          );
        }
      ],

      hard: [
        () => {
          const cats = ["Groep A", "Groep B", "Groep C", "Groep D"];
          const vals = [24, 18, 30, 27];
          const v = svgBarChartFine(cats, vals, 40, 1, "Behaalde scores");
          return qInput(
            "grafieken",
            "bar_compare_hard",
            "Vier groepen maken een toets.\nWat is het verschil tussen de hoogste en de laagste score?",
            Math.max(...vals) - Math.min(...vals),
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const cats = ["Ma", "Di", "Wo", "Do", "Vr"];
          const vals = [14, 16, 12, 18, 20];
          const v = svgBarChartFine(cats, vals, 25, 1, "Aanwezige leerlingen");
          return qMc(
            "grafieken",
            "bar_compare_hard",
            "De school noteert elke dag hoeveel leerlingen aanwezig zijn.\nOp welke dag is de stijging ten opzichte van de vorige dag het grootst?",
            ["Di", "Do", "Vr"],
            "Do",
            v
          );
        },

        // ✅ EXTRA 1 (hard) verhouding (2 cijfers / 1)
        () => {
          const cats = ["Team A", "Team B", "Team C"];
          const vals = [18, 12, 6];
          const v = svgBarChartFine(cats, vals, 20, 1, "Gescoorde punten");
          return qInput(
            "grafieken",
            "bar_compare_hard",
            "Drie teams scoren punten.\nHoeveel keer zoveel scoort Team A als Team C?",
            18 / 6,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 2 (hard) “meer dan gemiddeld?” (waar/niet waar)
        () => {
          const cats = ["Jan", "Feb", "Mrt", "Apr"];
          const vals = [120, 150, 135, 165];
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length; // 142.5
          const v = svgBarChartFine(cats, vals, 200, 10, "Omzet van de schoolbar (in euro)");
          return qMc(
            "grafieken",
            "bar_compare_hard",
            "We vergelijken met het gemiddelde.\nWaar of niet waar: In april ligt de omzet boven het gemiddelde van de vier maanden.",
            ["waar", "niet waar"],
            (165 > avg) ? "waar" : "niet waar",
            v
          );
        },

        // ✅ EXTRA 3 (hard) “rest” (totaal - deel) maar als vergelijking
        () => {
          const cats = ["Klas A", "Klas B", "Klas C", "Klas D"];
          const vals = [17, 21, 15, 19]; // totaal 72
          const v = svgBarChartFine(cats, vals, 25, 1, "Aantal leerlingen per klas");
          return qInput(
            "grafieken",
            "bar_compare_hard",
            "De school telt het aantal leerlingen per klas.\nHoeveel leerlingen zitten er in klas B en D samen meer dan in klas A en C samen?",
            (21 + 19) - (17 + 15),
            "number",
            null,
            v,
            0.01
          );
        }
      ]

    },
    bar_sum: {

      easy: [
        () => {
          const data = [
            { label: "Leerling A", value: 3 },
            { label: "Leerling B", value: 4 },
            { label: "Leerling C", value: 5 }
          ];
          const v = svgBarChart(data, 6, "Gelezen boeken");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Drie leerlingen houden bij hoeveel boeken ze hebben gelezen.\nHoeveel boeken zijn er samen gelezen?",
            12,
            "number",
            null,
            v,
            0.01
          );
        },

        () => {
          const data = [
            { label: "Ma", value: 2 },
            { label: "Di", value: 3 },
            { label: "Wo", value: 1 },
            { label: "Do", value: 4 }
          ];
          const v = svgBarChart(data, 5, "Aantal fouten per dag");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Een leerling noteert elke dag hoeveel fouten hij maakt.\nHoeveel fouten zijn dat in totaal?",
            10,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (easy)
        () => {
          const data = [
            { label: "Appel", value: 3 },
            { label: "Banaan", value: 2 },
            { label: "Peer", value: 5 }
          ];
          const v = svgBarChart(data, 6, "Fruit verkocht");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Een kraampje verkoopt fruit.\nHoeveel stuks fruit zijn er samen verkocht?",
            3 + 2 + 5,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 2 (easy)
        () => {
          const data = [
            { label: "1B", value: 6 },
            { label: "1C", value: 4 }
          ];
          const v = svgBarChart(data, 8, "Aanwezigen");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Twee klassen tellen het aantal aanwezigen.\nHoeveel leerlingen zijn er samen aanwezig?",
            6 + 4,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 3 (easy)
        () => {
          const data = [
            { label: "Oef. 1", value: 2 },
            { label: "Oef. 2", value: 5 },
            { label: "Oef. 3", value: 1 },
            { label: "Oef. 4", value: 2 }
          ];
          const v = svgBarChart(data, 6, "Punten per oefening");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Een leerling behaalt punten per oefening.\nHoeveel punten zijn dat samen?",
            2 + 5 + 1 + 2,
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 4 (easy)
        () => {
          const data = [
            { label: "Ma", value: 1 },
            { label: "Di", value: 2 },
            { label: "Wo", value: 2 },
            { label: "Do", value: 3 },
            { label: "Vr", value: 2 }
          ];
          const v = svgBarChart(data, 4, "Kaarten verkocht");
          return qInput(
            "grafieken",
            "bar_sum_easy",
            "Een leerling verkoopt kaarten doorheen de week.\nHoeveel kaarten zijn er in totaal verkocht?",
            1 + 2 + 2 + 3 + 2,
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      normal: [
        () => {
          const vals = [6, 8, 7, 9];
          const data = [
            { label: "Week 1", value: vals[0] },
            { label: "Week 2", value: vals[1] },
            { label: "Week 3", value: vals[2] },
            { label: "Week 4", value: vals[3] }
          ];
          const v = svgBarChart(data, 10, "Scores per week");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Een leerling krijgt elke week een score.\nWat is de gemiddelde score per week?",
            vals.reduce((a, b) => a + b, 0) / vals.length,
            "number",
            null,
            v,
            0.05,
            "Rond af op 1 decimaal."
          );
        },

        () => {
          const vals = [12, 18, 10, 14];
          const data = [
            { label: "Ma", value: vals[0] },
            { label: "Di", value: vals[1] },
            { label: "Wo", value: vals[2] },
            { label: "Do", value: vals[3] }
          ];
          const v = svgBarChart(data, 20, "Verkochte wafels");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Tijdens de middagpauze verkoopt een klas wafels.\nHoeveel wafels zijn er in totaal verkocht?",
            vals.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 1 (normal) gemiddelde, niet mooi uitkomend
        () => {
          const vals = [5, 7, 6, 8, 4];
          const data = [
            { label: "Ma", value: vals[0] },
            { label: "Di", value: vals[1] },
            { label: "Wo", value: vals[2] },
            { label: "Do", value: vals[3] },
            { label: "Vr", value: vals[4] }
          ];
          const v = svgBarChart(data, 10, "Punten per dag");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Een leerling haalt punten per dag.\nWat is het gemiddelde aantal punten per dag?",
            vals.reduce((a, b) => a + b, 0) / vals.length,
            "number",
            null,
            v,
            0.05,
            "Rond af op 1 decimaal."
          );
        },

        // ✅ EXTRA 2 (normal) totaal met 5 balken
        () => {
          const vals = [9, 6, 11, 8, 7];
          const data = [
            { label: "Klas A", value: vals[0] },
            { label: "Klas B", value: vals[1] },
            { label: "Klas C", value: vals[2] },
            { label: "Klas D", value: vals[3] },
            { label: "Klas E", value: vals[4] }
          ];
          const v = svgBarChart(data, 12, "Ingezamelde flessen");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Vijf klassen zamelen lege flessen in.\nHoeveel flessen zijn er in totaal ingezameld?",
            vals.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        },

        // ✅ EXTRA 3 (normal) gemiddelde (6 balken)
        () => {
          const vals = [14, 11, 9, 13, 12, 10];
          const data = [
            { label: "Jan", value: vals[0] },
            { label: "Feb", value: vals[1] },
            { label: "Mrt", value: vals[2] },
            { label: "Apr", value: vals[3] },
            { label: "Mei", value: vals[4] },
            { label: "Jun", value: vals[5] }
          ];
          const v = svgBarChart(data, 16, "Bezoekers per maand");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Een club telt het aantal bezoekers per maand.\nWat is het gemiddelde aantal bezoekers per maand?",
            vals.reduce((a, b) => a + b, 0) / vals.length,
            "number",
            null,
            v,
            0.05,
            "Rond af op 1 decimaal."
          );
        },

        // ✅ EXTRA 4 (normal) totaal met grotere waarden
        () => {
          const vals = [22, 18, 25, 15];
          const data = [
            { label: "Groep 1", value: vals[0] },
            { label: "Groep 2", value: vals[1] },
            { label: "Groep 3", value: vals[2] },
            { label: "Groep 4", value: vals[3] }
          ];
          const v = svgBarChart(data, 30, "Aantal juiste antwoorden");
          return qInput(
            "grafieken",
            "bar_sum_normal",
            "Vier groepen maken een korte quiz.\nHoeveel juiste antwoorden zijn er samen?",
            vals.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      hard: [
        () => {
          const cats = ["Groep A", "Groep B", "Groep C", "Groep D"];
          const vals = [15, 21, 18, 26];
          const v = svgBarChartFine(cats, vals, 30, 1, "Behaalde punten");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "Vier groepen maken een toets.\nWat is de gemiddelde score van de groepen?",
            vals.reduce((a, b) => a + b, 0) / vals.length,
            "number",
            null,
            v,
            0.1,
            "Rond af op 1 decimaal."
          );
        },

        () => {
          const cats = ["Jan", "Feb", "Mrt", "Apr"];
          const vals = [120, 150, 135, 165];
          const v = svgBarChartFine(cats, vals, 200, 10, "Omzet per maand (in euro)");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "De schoolbar noteert de omzet per maand.\nWat is de totale omzet over deze vier maanden?",
            vals.reduce((a, b) => a + b, 0),
            "number",
            "€",
            v,
            0.5
          );
        },

        // ✅ EXTRA 1 (hard) gemiddelde met 6 categorieën
        () => {
          const cats = ["Klas 1", "Klas 2", "Klas 3", "Klas 4", "Klas 5", "Klas 6"];
          const vals = [32, 28, 35, 26, 31, 29];
          const v = svgBarChartFine(cats, vals, 40, 2, "Aantal punten");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "Zes klassen halen punten op een toets.\nWat is het gemiddelde aantal punten?",
            vals.reduce((a, b) => a + b, 0) / vals.length,
            "number",
            null,
            v,
            0.1,
            "Rond af op 1 decimaal."
          );
        },

        // ✅ EXTRA 2 (hard) totaal met 6 maanden
        () => {
          const cats = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun"];
          const vals = [210, 185, 240, 195, 230, 205];
          const v = svgBarChartFine(cats, vals, 260, 10, "Omzet per maand (in euro)");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "Een schoolbar noteert de omzet per maand.\nWat is de totale omzet over deze zes maanden?",
            vals.reduce((a, b) => a + b, 0),
            "number",
            "€",
            v,
            1
          );
        },

        // ✅ EXTRA 3 (hard) “eerste 2 samen”
        () => {
          const cats = ["Jan", "Feb", "Mrt", "Apr"];
          const vals = [120, 150, 135, 165];
          const v = svgBarChartFine(cats, vals, 200, 10, "Omzet per maand (in euro)");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "Bekijk de omzet per maand.\nHoeveel is de omzet van januari en februari samen?",
            120 + 150,
            "number",
            "€",
            v,
            0.5
          );
        },

        // ✅ EXTRA 4 (hard) “rest = totaal - deel”
        () => {
          const cats = ["Team A", "Team B", "Team C", "Team D", "Team E"];
          const vals = [18, 22, 15, 27, 20]; // totaal 102
          const v = svgBarChartFine(cats, vals, 30, 1, "Gescoorde punten");
          return qInput(
            "grafieken",
            "bar_sum_hard",
            "Vijf teams scoren punten.\nHoeveel punten scoorden Team A, C en E samen?",
            18 + 15 + 20,
            "number",
            null,
            v,
            0.1
          );
        }
      ]

    },
    pie_read: {

      easy: [
        // 1) totaal aflezen (som)
        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT"];
          const values = [8, 5, 3, 4];
          const v = svgPieChart(labels, values, "Lievelingsvak van de klas");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "De leerlingen van 1B geven hun lievelingsvak door.\nHoeveel leerlingen namen in totaal deel aan deze bevraging?",
            values.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        },

        // 2) één sector aflezen
        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "De klas vertelt hoe ze elke dag naar school komt.\nHoeveel leerlingen komen met de fiets?",
            7,
            "number",
            null,
            v,
            0.01
          );
        },

        // 3) verschil (2 sectoren)
        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "Bekijk het cirkeldiagram.\nHoeveel leerlingen komen met de fiets meer dan met de auto?",
            4,
            "number",
            null,
            v,
            0.01
          );
        },

        // 4) samen (2 sectoren optellen)
        () => {
          const labels = ["Water", "Cola", "Sap"];
          const values = [10, 6, 4];
          const v = svgPieChart(labels, values, "Drankkeuze");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "Leerlingen kiezen een drankje.\nHoeveel leerlingen kozen samen voor cola of sap?",
            6 + 4,
            "number",
            null,
            v,
            0.01
          );
        },

        // 5) niet (totaal - sector)
        () => {
          const labels = ["Kat", "Hond", "Vis", "Geen huisdier"];
          const values = [4, 7, 3, 6]; // totaal 20
          const v = svgPieChart(labels, values, "Huisdieren");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "De klas vertelt welke huisdieren ze hebben.\nHoeveel leerlingen hebben GEEN kat?",
            (4 + 7 + 3 + 6) - 4,
            "number",
            null,
            v,
            0.01
          );
        },

        // 6) grootste/kleinste (aflezen + vergelijken)
        () => {
          const labels = ["Voetbal", "Basketbal", "Zwemmen", "Dans"];
          const values = [12, 3, 9, 6];
          const v = svgPieChart(labels, values, "Sport na school");
          return qInput(
            "grafieken",
            "pie_read_easy",
            "Leerlingen kiezen een sport na school.\nHoeveel leerlingen kozen voor de meest gekozen sport?",
            12,
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      normal: [
        // 1) één sector aflezen
        () => {
          const labels = ["Pizza", "Pasta", "Rijst", "Aardappelen"];
          const values = [9, 6, 4, 5];
          const v = svgPieChart(labels, values, "Lievelingseten");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "Tijdens de middagpauze praten leerlingen over eten.\nHoeveel leerlingen kozen voor pasta?",
            6,
            "number",
            null,
            v,
            0.01
          );
        },

        // 2) totaal (som)
        () => {
          const labels = ["Rood", "Blauw", "Groen", "Geel"];
          const values = [5, 8, 4, 3];
          const v = svgPieChart(labels, values, "Kleurkeuze");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "De klas stemt op haar lievelingskleur.\nHoeveel leerlingen deden in totaal mee?",
            values.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        },

        // 3) niet (totaal - sector)
        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "Niet iedereen komt met de fiets naar school.\nHoeveel leerlingen komen NIET met de fiets?",
            6 + 4 + 3,
            "number",
            null,
            v,
            0.01
          );
        },

        // 4) samen (2 sectoren)
        () => {
          const labels = ["Instagram", "TikTok", "YouTube", "Snapchat"];
          const values = [6, 5, 4, 3];
          const v = svgPieChart(labels, values, "Meest gebruikte app");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "De klas vertelt welke app ze het meest gebruiken.\nHoeveel leerlingen kozen samen voor TikTok of YouTube?",
            5 + 4,
            "number",
            null,
            v,
            0.01
          );
        },

        // 5) verschil tussen 2 sectoren
        () => {
          const labels = ["Lezen", "Gamen", "Sport", "Muziek"];
          const values = [7, 11, 9, 5];
          const v = svgPieChart(labels, values, "Vrije tijd");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "Leerlingen vertellen wat ze het liefst doen in hun vrije tijd.\nHoeveel leerlingen kozen voor gamen meer dan voor muziek?",
            11 - 5,
            "number",
            null,
            v,
            0.01
          );
        },

        // 6) “rest” (totaal - (2 sectoren))
        () => {
          const labels = ["Lijn 1", "Lijn 2", "Lijn 3"];
          const values = [5, 4, 3]; // totaal 12
          const v = svgPieChart(labels, values, "Buslijnen");
          return qInput(
            "grafieken",
            "pie_read_normal",
            "Leerlingen die met de bus komen, nemen verschillende buslijnen.\nHoeveel leerlingen nemen NIET lijn 1 of lijn 2?",
            (5 + 4 + 3) - (5 + 4),
            "number",
            null,
            v,
            0.01
          );
        }
      ],

      hard: [
        // 1) verschil (meer dan)
        () => {
          const labels = ["Optie A", "Optie B", "Optie C", "Optie D"];
          const values = [11, 7, 5, 3];
          const v = svgPieChart(labels, values, "Keuze per optie");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "Leerlingen maken een keuze uit vier opties.\nHoeveel leerlingen kozen voor optie A meer dan voor optie D?",
            11 - 3,
            "number",
            null,
            v,
            0.01
          );
        },

        // 2) samen (2 sectoren)
        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT", "Muziek"];
          const values = [6, 4, 3, 5, 2];
          const v = svgPieChart(labels, values, "Gekozen vakken");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "De leerlingen mochten twee vakken aanduiden.\nHoeveel leerlingen kozen samen voor wiskunde of ICT?",
            6 + 5,
            "number",
            null,
            v,
            0.01
          );
        },

        // 3) totaal (groter totaal)
        () => {
          const labels = ["Eten", "Kleren", "Games", "Sparen", "Andere"];
          const values = [10, 7, 6, 9, 5]; // totaal 37
          const v = svgPieChart(labels, values, "Waar gaat zakgeld naartoe?");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "De klas vertelt waaraan ze hun zakgeld uitgeven.\nHoeveel leerlingen deden mee aan deze bevraging?",
            values.reduce((a, b) => a + b, 0),
            "number",
            null,
            v,
            0.01
          );
        },

        // 4) samen (3 sectoren)
        () => {
          const labels = ["0-1u", "1-2u", "2-3u", "3u of meer"];
          const values = [4, 9, 8, 5]; // totaal 26
          const v = svgPieChart(labels, values, "Schermtijd per dag");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "De klas noteert hun gemiddelde schermtijd per dag.\nHoeveel leerlingen hebben minder dan 3 uur schermtijd?",
            4 + 9 + 8,
            "number",
            null,
            v,
            0.01
          );
        },

        // 5) min/max combineren (verschil grootste - kleinste)
        () => {
          const labels = ["< 5 km", "5-10 km", "10-20 km", "> 20 km"];
          const values = [6, 11, 7, 4]; // totaal 28
          const v = svgPieChart(labels, values, "Afstand woon-school");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "Leerlingen geven aan hoe ver ze van school wonen.\nHoeveel leerlingen is het verschil tussen de grootste en de kleinste groep?",
            11 - 4,
            "number",
            null,
            v,
            0.01
          );
        },

        // 6) bonus: procent uit aantallen (zoals je al had)
        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qInput(
            "grafieken",
            "pie_read_hard",
            "Een leerkracht wil weten hoeveel leerlingen met de fiets komen.\nHoeveel procent van de leerlingen komt met de fiets?",
            (7 / (6 + 7 + 4 + 3)) * 100,
            "number",
            "%",
            v,
            0.5,
            "Rond af op 1 decimaal."
          );
        }
      ]

    },
    pie_truth: {

      easy: [
        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT"];
          const values = [8, 5, 3, 4];
          const v = svgPieChart(labels, values, "Lievelingsvak van de klas");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "In 1B werd gevraagd welk vak leerlingen het liefst hebben.\nWaar of niet waar: Wiskunde is het populairst.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "De klas vertelt hoe iedereen naar school komt.\nWaar of niet waar: Te voet komt minder vaak voor dan met de bus.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        // ✅ EXTRA 1 (easy) kleinste groep
        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "Kijk naar het cirkeldiagram.\nWaar of niet waar: De auto is de kleinste groep.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        // ✅ EXTRA 2 (easy) eenvoudige vergelijking
        () => {
          const labels = ["Water", "Cola", "Sap"];
          const values = [10, 6, 4];
          const v = svgPieChart(labels, values, "Drankkeuze");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "Leerlingen kiezen een drankje.\nWaar of niet waar: Water wordt vaker gekozen dan cola.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        // ✅ EXTRA 3 (easy) groter/kleiner
        () => {
          const labels = ["Kat", "Hond", "Vis", "Geen huisdier"];
          const values = [4, 7, 3, 6];
          const v = svgPieChart(labels, values, "Huisdieren");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "De klas vertelt welke huisdieren ze hebben.\nWaar of niet waar: Er zijn meer leerlingen zonder huisdier dan met een vis.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        // ✅ EXTRA 4 (easy) gelijk/ongelijk
        () => {
          const labels = ["Jongen", "Meisje"];
          const values = [12, 8];
          const v = svgPieChart(labels, values, "Verdeling jongens/meisjes");
          return qMc(
            "grafieken",
            "pie_truth_easy",
            "In de klas zitten jongens en meisjes.\nWaar of niet waar: Er zijn evenveel jongens als meisjes.",
            ["waar", "niet waar"],
            "niet waar",
            v
          );
        }
      ],

      normal: [
        () => {
          const labels = ["Pizza", "Pasta", "Rijst", "Aardappelen"];
          const values = [9, 6, 4, 5];
          const v = svgPieChart(labels, values, "Lievelingseten");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "Tijdens de middagpauze wordt er gestemd op lievelingseten.\nWaar of niet waar: Pizza wordt vaker gekozen dan pasta.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        () => {
          const labels = ["Rood", "Blauw", "Groen", "Geel"];
          const values = [5, 8, 4, 3];
          const v = svgPieChart(labels, values, "Lievelingskleur");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "De leerlingen stemmen op hun lievelingskleur.\nWaar of niet waar: Groen wordt minder gekozen dan geel.",
            ["waar", "niet waar"],
            "niet waar",
            v
          );
        },

        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "Bekijk het cirkeldiagram goed.\nWaar of niet waar: De auto is de kleinste groep.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        // ✅ EXTRA 1 (normal) samen vergelijken
        () => {
          const labels = ["Instagram", "TikTok", "YouTube", "Snapchat"];
          const values = [6, 5, 4, 3];
          const v = svgPieChart(labels, values, "Meest gebruikte app");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "De klas vertelt welke app ze het meest gebruiken.\nWaar of niet waar: TikTok en Snapchat samen zijn evenveel als Instagram.",
            ["waar", "niet waar"],
            (5 + 3 === 6) ? "waar" : "niet waar",
            v
          );
        },

        // ✅ EXTRA 2 (normal) niet / restgroep
        () => {
          const labels = ["Lezen", "Gamen", "Sport", "Muziek"];
          const values = [7, 11, 9, 5];
          const v = svgPieChart(labels, values, "Vrije tijd");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "Leerlingen vertellen wat ze het liefst doen in hun vrije tijd.\nWaar of niet waar: Wie niet gamet, is met meer dan 20 leerlingen.",
            ["waar", "niet waar"],
            ((7 + 9 + 5) > 20) ? "waar" : "niet waar",
            v
          );
        },

        // ✅ EXTRA 3 (normal) “minstens” (drempel)
        () => {
          const labels = ["Voetbal", "Basketbal", "Zwemmen", "Dans"];
          const values = [12, 3, 9, 6];
          const v = svgPieChart(labels, values, "Sport na school");
          return qMc(
            "grafieken",
            "pie_truth_normal",
            "Leerlingen kiezen een sport na school.\nWaar of niet waar: Minstens 10 leerlingen kiezen voor voetbal.",
            ["waar", "niet waar"],
            (12 >= 10) ? "waar" : "niet waar",
            v
          );
        }
      ],

      hard: [
        () => {
          const labels = ["Optie A", "Optie B", "Optie C", "Optie D"];
          const values = [11, 7, 5, 3];
          const v = svgPieChart(labels, values, "Keuze per optie");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "Leerlingen maken een keuze uit vier opties.\nWaar of niet waar: Optie A is groter dan optie B en optie D samen.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT", "Muziek"];
          const values = [6, 4, 3, 5, 2];
          const v = svgPieChart(labels, values, "Gekozen vakken");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "De klas geeft door welke vakken ze het liefst heeft.\nWaar of niet waar: ICT wordt vaker gekozen dan Frans.",
            ["waar", "niet waar"],
            "waar",
            v
          );
        },

        () => {
          const labels = ["Bus", "Fiets", "Te voet", "Auto"];
          const values = [6, 7, 4, 3];
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school?");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "We vergelijken groepen in het cirkeldiagram.\nWaar of niet waar: Bus en auto samen zijn evenveel als fiets.",
            ["waar", "niet waar"],
            "niet waar",
            v
          );
        },

        // ✅ EXTRA 1 (hard) meer dan de helft?
        () => {
          const labels = ["Water", "Cola", "Sap"];
          const values = [10, 6, 4]; // totaal 20
          const v = svgPieChart(labels, values, "Drankkeuze");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "Leerlingen kiezen een drankje.\nWaar of niet waar: Meer dan de helft kiest voor water.",
            ["waar", "niet waar"],
            (10 > (10 + 6 + 4) / 2) ? "waar" : "niet waar",
            v
          );
        },

        // ✅ EXTRA 2 (hard) “samen groter dan”
        () => {
          const labels = ["Eten", "Kleren", "Games", "Sparen", "Andere"];
          const values = [10, 7, 6, 9, 5]; // totaal 37
          const v = svgPieChart(labels, values, "Waar gaat zakgeld naartoe?");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "De klas vertelt waaraan ze hun zakgeld uitgeven.\nWaar of niet waar: Sparen en kleren samen zijn meer dan eten en games samen.",
            ["waar", "niet waar"],
            ((9 + 7) > (10 + 6)) ? "waar" : "niet waar",
            v
          );
        },

        // ✅ EXTRA 3 (hard) exact 25%?
        () => {
          const labels = ["< 5 km", "5-10 km", "10-20 km", "> 20 km"];
          const values = [6, 11, 7, 4]; // totaal 28
          const v = svgPieChart(labels, values, "Afstand woon-school");
          return qMc(
            "grafieken",
            "pie_truth_hard",
            "Leerlingen geven aan hoe ver ze van school wonen.\nWaar of niet waar: 10-20 km is precies 25% van de klas.",
            ["waar", "niet waar"],
            (7 === 28 / 4) ? "waar" : "niet waar",
            v
          );
        }
      ]

    },
    pie_percent: {

      easy: [
        // 1) 25%
        () => {
          const labels = ["Groep A", "Groep B", "Groep C", "Groep D"];
          const values = [5, 5, 5, 5];
          const v = svgPieChart(labels, values, "Verdeling van de leerlingen (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "De klas is verdeeld in vier even grote groepen.\nHoeveel procent van de leerlingen zit in groep A?",
            25,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 2) 30%
        () => {
          const labels = ["Fiets", "Bus", "Te voet", "Auto"];
          const values = [8, 6, 4, 2]; // totaal 20
          const v = svgPieChart(labels, values, "Hoe komen leerlingen naar school? (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "De klas telt hoe iedereen naar school komt.\nHoeveel procent van de leerlingen komt met de bus?",
            (6 / 20) * 100,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 3) 50%
        () => {
          const labels = ["Water", "Cola", "Sap"];
          const values = [10, 6, 4]; // totaal 20
          const v = svgPieChart(labels, values, "Drankkeuze (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "Leerlingen kiezen een drankje.\nHoeveel procent kiest voor water?",
            (10 / 20) * 100,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 4) 20%
        () => {
          const labels = ["Kat", "Hond", "Vis", "Geen huisdier"];
          const values = [4, 7, 3, 6]; // totaal 20
          const v = svgPieChart(labels, values, "Huisdieren (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "De klas vertelt welke huisdieren ze hebben.\nHoeveel procent heeft een kat?",
            (4 / 20) * 100,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 5) 10%
        () => {
          const labels = ["Voetbal", "Basketbal", "Zwemmen", "Dans"];
          const values = [12, 3, 9, 6]; // totaal 30
          const v = svgPieChart(labels, values, "Sport na school (30 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "Leerlingen kiezen een sport na school.\nHoeveel procent kiest voor basketbal?",
            (3 / 30) * 100,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 6) 60%
        () => {
          const labels = ["Jongen", "Meisje"];
          const values = [12, 8]; // totaal 20
          const v = svgPieChart(labels, values, "Verdeling jongens/meisjes (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_easy",
            "In de klas zitten jongens en meisjes.\nHoeveel procent is een jongen?",
            (12 / 20) * 100,
            "number",
            "%",
            v,
            0.5
          );
        }
      ],

      normal: [
        // 1) 15% (nog mooi)
        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT"];
          const values = [8, 5, 3, 4]; // totaal 20
          const v = svgPieChart(labels, values, "Lievelingsvak van de klas (20 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "De leerlingen van 1B kiezen hun lievelingsvak.\nHoeveel procent van de leerlingen kiest voor LO?",
            (3 / 20) * 100,
            "number",
            "%",
            v,
            0.5
          );
        },

        // 2) 24% (nog mooi)
        () => {
          const labels = ["Pizza", "Pasta", "Rijst", "Aardappelen"];
          const values = [9, 6, 4, 6]; // totaal 25
          const v = svgPieChart(labels, values, "Lievelingseten (25 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "Tijdens de middagpauze praten leerlingen over eten.\nHoeveel procent kiest voor rijst?",
            (4 / 25) * 100,
            "number",
            "%",
            v,
            0.6
          );
        },

        // 3) afronden (27,8%)
        () => {
          const labels = ["Instagram", "TikTok", "YouTube", "Snapchat"];
          const values = [6, 5, 4, 3]; // totaal 18
          const v = svgPieChart(labels, values, "Meest gebruikte app (18 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "De klas vertelt welke app ze het meest gebruiken.\nHoeveel procent gebruikt TikTok het meest?",
            (5 / 18) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 4) afronden (21,9%)
        () => {
          const labels = ["Lezen", "Gamen", "Sport", "Muziek"];
          const values = [7, 11, 9, 5]; // totaal 32
          const v = svgPieChart(labels, values, "Vrije tijd (32 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "Leerlingen vertellen wat ze het liefst doen in hun vrije tijd.\nHoeveel procent kiest voor lezen?",
            (7 / 32) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 5) afronden (41,7%)
        () => {
          const labels = ["Lijn 1", "Lijn 2", "Lijn 3"];
          const values = [5, 4, 3]; // totaal 12
          const v = svgPieChart(labels, values, "Buslijnen (12 leerlingen nemen de bus)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "Leerlingen die met de bus komen, nemen verschillende buslijnen.\nHoeveel procent neemt lijn 1?",
            (5 / 12) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 6) afronden (23,3%)
        () => {
          const labels = ["Konijn", "Hamster", "Kat", "Hond"];
          const values = [7, 8, 9, 6]; // totaal 30
          const v = svgPieChart(labels, values, "Favoriete dieren (30 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_normal",
            "De klas kiest een favoriet dier.\nHoeveel procent kiest voor een konijn?",
            (7 / 30) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        }
      ],

      hard: [
        // 1) afronden (42,3%)
        () => {
          const labels = ["Optie A", "Optie B", "Optie C", "Optie D"];
          const values = [11, 7, 5, 3]; // totaal 26
          const v = svgPieChart(labels, values, "Keuze per optie (26 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "Leerlingen maken een keuze uit vier opties.\nHoeveel procent koos voor optie A?",
            (11 / 26) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 2) afronden (optellen: LO of Muziek)
        () => {
          const labels = ["Wiskunde", "Frans", "LO", "ICT", "Muziek"];
          const values = [7, 4, 5, 3, 4]; // totaal 23
          const v = svgPieChart(labels, values, "Gekozen vakken (23 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "De klas kiest een vak.\nHoeveel procent kiest voor LO of muziek samen?",
            ((5 + 4) / 23) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 3) afronden (19,2%)
        () => {
          const labels = ["0-1u", "1-2u", "2-3u", "3u of meer"];
          const values = [4, 9, 8, 5]; // totaal 26
          const v = svgPieChart(labels, values, "Schermtijd per dag (26 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "De klas noteert hun gemiddelde schermtijd per dag.\nHoeveel procent heeft 3u of meer schermtijd?",
            (5 / 26) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 4) afronden (14,3%)
        () => {
          const labels = ["< 5 km", "5-10 km", "10-20 km", "> 20 km"];
          const values = [6, 11, 7, 4]; // totaal 28
          const v = svgPieChart(labels, values, "Afstand woon-school (28 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "Leerlingen geven aan hoe ver ze van school wonen.\nHoeveel procent woont meer dan 20 km van school?",
            (4 / 28) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 5) afronden (samen: sparen + kleren)
        () => {
          const labels = ["Eten", "Kleren", "Games", "Sparen", "Andere"];
          const values = [10, 7, 6, 9, 5]; // totaal 37
          const v = svgPieChart(labels, values, "Waar gaat zakgeld naartoe? (37 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "De klas vertelt waaraan ze hun zakgeld uitgeven.\nHoeveel procent gaat naar sparen en kleren samen?",
            ((9 + 7) / 37) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        },

        // 6) afronden (100% - pizza)
        () => {
          const labels = ["Pizza", "Broodje", "Salade", "Warme maaltijd"];
          const values = [9, 12, 5, 7]; // totaal 33
          const v = svgPieChart(labels, values, "Middagmaal op school (33 leerlingen)");
          return qInput(
            "grafieken",
            "pie_percent_hard",
            "Wat eten leerlingen op school als middagmaal?\nHoeveel procent kiest NIET voor pizza?",
            (1 - (9 / 33)) * 100,
            "number",
            "%",
            v,
            0.6,
            "Rond af op 1 decimaal."
          );
        }
      ]

    },

  },
  massa: {
    convert: {
      easy: [
        () => qInput("massa", "convert_easy", "Herleid: 4 kg = ____ g", 4000, "number", "g", svgImg("weegschaal.svg")),
        () => qInput("massa", "convert_easy", "Herleid: 900 g = ____ kg", 0.9, "number", "kg", svgImg("gewichtjes.svg"), 0.01),
        () => qInput("massa", "convert_easy", "Herleid: 6 kg = ____ g", 6000, "number", "g", svgImg("gewichtjes.svg")),
        () => qInput("massa", "convert_easy", "Herleid: 125 g = ____ kg", 0.125, "number", "kg", svgImg("weegschaal.svg"), 0.001),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 2 kg = ____ g",
          2000,
          "number",
          "g",
          svgImg("weegschaal.svg")
        ),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 500 g = ____ kg",
          0.5,
          "number",
          "kg",
          svgImg("weegschaal.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 3 kg = ____ g",
          3000,
          "number",
          "g",
          svgImg("gewichtjes.svg")
        ),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 750 g = ____ kg",
          0.75,
          "number",
          "kg",
          svgImg("gewichtjes.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 1 kg = ____ g",
          1000,
          "number",
          "g",
          svgImg("weegschaal.svg")
        ),

        () => qInput(
          "massa",
          "convert_easy",
          "Herleid: 250 g = ____ kg",
          0.25,
          "number",
          "kg",
          svgImg("gewichtjes.svg"),
          0.01
        )
      ],
      normal: [
        () => qInput("massa", "convert_normal", "Herleid: 1 750 g = ____ kg", 1.75, "number", "kg", svgImg("gewichtjes.svg"), 0.01),
        () => qInput("massa", "convert_normal", "Herleid: 2,35 kg = ____ g", 2350, "number", "g", svgImg("weegschaal.svg")),
        () => qInput("massa", "convert_normal", "Herleid: 1,6 ton = ____ kg", 1600, "number", "kg", svgImg("vrachtwagen.svg")),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 2 500 g = ____ kg",
          2.5,
          "number",
          "kg",
          svgImg("weegschaal.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 4,2 kg = ____ g",
          4200,
          "number",
          "g",
          svgImg("gewichtjes.svg")
        ),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 3 600 g = ____ kg",
          3.6,
          "number",
          "kg",
          svgImg("gewichtjes.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 1 200 kg = ____ ton",
          1.2,
          "number",
          "ton",
          svgImg("vrachtwagen.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 0,8 ton = ____ kg",
          800,
          "number",
          "kg",
          svgImg("vrachtwagen.svg")
        ),

        () => qInput(
          "massa",
          "convert_normal",
          "Herleid: 750 kg = ____ ton",
          0.75,
          "number",
          "ton",
          svgImg("vrachtwagen.svg"),
          0.01
        )
      ],
      hard: [
        () => qInput("massa", "convert_hard", "Herleid: 85 000 mg = ____ g", 85, "number", "g", svgImg("gewichtjes.svg"), 0.01),
        () => qInput("massa", "convert_hard", "Herleid: 0,075 kg = ____ g", 75, "number", "g", svgImg("weegschaal.svg")),
        () => qInput("massa", "convert_hard", "Herleid: 0,006 ton = ____ kg", 6, "number", "kg", svgImg("vrachtwagen.svg")),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 3 600 mg = ____ g",
          3.6,
          "number",
          "g",
          svgImg("gewichtjes.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 0,45 kg = ____ g",
          450,
          "number",
          "g",
          svgImg("weegschaal.svg")
        ),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 1 700 g = ____ kg",
          1.7,
          "number",
          "kg",
          svgImg("gewichtjes.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 24,5 ton = ____ kg",
          24500,
          "number",
          "kg",
          svgImg("vrachtwagen.svg")
        ),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 3 900 kg = ____ ton",
          3.9,
          "number",
          "ton",
          svgImg("vrachtwagen.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "convert_hard",
          "Herleid: 620 g = ____ kg",
          0.62,
          "number",
          "kg",
          svgImg("gewichtjes.svg"),
          0.01
        )
      ]
    },
    context: {
      easy: [
        () => qInput("massa", "context_easy",
          "Salma koopt 3 pakken rijst van 1 000 g.\nHoeveel kilogram rijst koopt ze?",
          3, "number", "kg", svgImg("rijstpak.svg"), 0.01),

        () => qInput("massa", "context_easy",
          "Hamza heeft 2 zakjes suiker van 250 g.\nHoeveel gram suiker is dat samen?",
          500, "number", "g", svgImg("suikerzak.svg")),

        () => qInput("massa", "context_easy",
          "Imane draagt een koffer van 15 kg.\nHoeveel gram is dat?",
          15000, "number", "g", svgImg("koffer.svg")),

        () => qInput("massa", "context_easy",
          "Youssef koopt 8 potjes yoghurt van 125 g.\nHoeveel gram yoghurt is dat samen?",
          1000, "number", "g", svgImg("yoghurt.svg")),

        () => qInput(
          "massa",
          "context_easy",
          "In een doos zitten 4 zakjes van 250 g suiker.\nHoeveel gram suiker zit er in totaal?",
          1000,
          "number",
          "g",
          svgImg("suikerzak.svg")
        ),

        () => qInput(
          "massa",
          "context_easy",
          "Je koopt 6 potjes yoghurt van 125 g.\nHoeveel gram yoghurt is dat samen?",
          750,
          "number",
          "g",
          svgImg("yoghurt.svg")
        ),

        () => qInput(
          "massa",
          "context_easy",
          "Een zak aardappelen weegt 5 kg.\nHoeveel gram is dat?",
          5000,
          "number",
          "g",
          svgImg("zak_aardappelen.svg")
        ),

        () => qInput(
          "massa",
          "context_easy",
          "Een koffer weegt 20 kg.\nHoeveel gram is dat?",
          20000,
          "number",
          "g",
          svgImg("koffer.svg")
        ),

        () => qInput(
          "massa",
          "context_easy",
          "Een bus weegt 12 ton.\nHoeveel kilogram is dat?",
          12000,
          "number",
          "kg",
          svgImg("bus.svg")
        )
      ],

      normal: [
        () => qInput("massa", "context_normal",
          "Amina weegt 48 kg.\nOmar weegt 73 kg.\nHoeveel kilogram weegt Omar meer dan Amina?",
          25, "number", "kg", svgImg("kind.svg")),

        () => qInput("massa", "context_normal",
          "Een vrachtwagen vervoert 2,4 ton zand.\nHoeveel kilogram is dat?",
          2400, "number", "kg", svgImg("vrachtwagen.svg")),

        () => qInput("massa", "context_normal",
          "Karim koopt 5 zakken cement van 25 kg.\nHoeveel kilogram cement is dat?",
          125, "number", "kg", svgImg("cementzak.svg")),

        () => qInput(
          "massa",
          "context_normal",
          "Manal weegt 54 kg.\nYoussef weegt 84 kg.\nHoeveel kilogram weegt Toon meer dan Nele?",
          30,
          "number",
          "kg",
          svgImg("kind.svg")
        ),

        () => qInput(
          "massa",
          "context_normal",
          "Een ezel weegt 250 kg.\nEen hond weegt 20 kg.\nHoeveel gram weegt de ezel meer dan de hond?",
          230000,
          "number",
          "g",
          svgImg("ezel.svg")
        ),

        () => qInput(
          "massa",
          "context_normal",
          "Je koopt 4 zakken cement van 25 kg.\nHoeveel kilogram cement koop je in totaal?",
          100,
          "number",
          "kg",
          svgImg("cementzak.svg")
        ),

        () => qInput(
          "massa",
          "context_normal",
          "Een koffer weegt 18 kg.\nEen andere koffer weegt 2 500 g meer.\nHoeveel kilogram weegt de tweede koffer?",
          20.5,
          "number",
          "kg",
          svgImg("koffer.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "context_normal",
          "Een vrachtwagen weegt 7,5 ton.\nHoeveel kilogram is dat?",
          7500,
          "number",
          "kg",
          svgImg("vrachtwagen.svg")
        )
      ],

      hard: [
        () => qInput("massa", "context_hard",
          "Nadia koopt 2,5 kg appels en 750 g peren.\nHoeveel kilogram is dat samen?",
          3.25, "number", "kg", svgImg("zak_aardappelen.svg"), 0.01),

        () => qInput("massa", "context_hard",
          "Rachid heeft 6 kg suiker.\nEen zakje is 250 g.\nHoeveel zakjes kan hij vullen?",
          24, "number", "zakjes", svgImg("suikerzak.svg")),

        () => qInput("massa", "context_hard",
          "Een bus weegt 12 ton.\nEen vrachtwagen weegt 7,5 ton.\nHoeveel ton wegen ze samen?",
          19.5, "number", "ton", svgImg("bus.svg"), 0.01),

        () => qInput(
          "massa",
          "context_hard",
          "Een neushoorn weegt 1 800 kg.\nEen olifant weegt 6 200 kg.\nHoeveel kilogram weegt de olifant meer dan de neushoorn?",
          4400,
          "number",
          "kg",
          svgImg("neushoorn.svg")
        ),

        () => qInput(
          "massa",
          "context_hard",
          "Je koopt 6 zakken cement van 25 kg.\nHoeveel kilogram cement koop je?\nHoeveel ton is dat?",
          0.15,
          "number",
          "ton",
          svgImg("cementzak.svg"),
          0.01
        ),

        () => qInput(
          "massa",
          "context_hard",
          "Een pak rijst weegt 1 000 g.\nJe koopt 7 pakken.\nHoeveel kilogram rijst koop je in totaal?",
          7,
          "number",
          "kg",
          svgImg("rijstpak.svg")
        ),

        () => qInput(
          "massa",
          "context_hard",
          "Een zak suiker weegt 750 g.\nHoeveel volle zakken kan je maken met 6 kg suiker?",
          8,
          "number",
          "zakken",
          svgImg("suikerzak.svg")
        ),

        () => qInput(
          "massa",
          "context_hard",
          "Een auto weegt 1,2 ton.\nTwee auto's samen wegen ____ ton.",
          2.4,
          "number",
          "ton",
          svgImg("auto.svg"),
          0.01
        )
      ]

    },

    unit_choice: {
      easy: [
        () => qMc("massa", "unit_choice_easy", "Een zak suiker weegt 250 ____.", ["g", "kg", "t"], "g", svgImg("suikerzak.svg")),
        () => qMc("massa", "unit_choice_easy", "Een koffer weegt 15 ____.", ["g", "kg", "t"], "kg", svgImg("koffer.svg")),
        () => qMc("massa", "unit_choice_easy", "Een pak rijst weegt 1 000 ____.", ["g", "kg", "t"], "g", svgImg("rijstpak.svg")),
        () => qMc("massa", "unit_choice_easy", "Een kleine auto weegt ongeveer 1,2 ____.", ["g", "kg", "t"], "t", svgImg("auto.svg")),

        () => qMc(
          "massa",
          "unit_choice_easy",
          "Een aardappelmesje weegt 30 ____.",
          ["g", "kg", "t"],
          "g",
          svgImg("aardappelmesje.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_easy",
          "Een muis weegt 19 ____.",
          ["g", "kg", "t"],
          "g",
          svgImg("muis.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_easy",
          "Een grasmachine weegt 18 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("grasmachine.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_easy",
          "Een bus weegt 12 ____.",
          ["kg", "t", "g"],
          "t",
          svgImg("bus.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_easy",
          "Een ezel weegt 250 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("ezel.svg")
        )
      ],

      normal: [
        () => qMc("massa", "unit_choice_normal", "Een olifant weegt ongeveer 6 ____. (6 000 kg)", ["kg", "g", "t"], "t", svgImg("olifant.svg")),
        () => qMc("massa", "unit_choice_normal", "Een bus weegt ongeveer 12 ____.", ["kg", "g", "t"], "t", svgImg("bus.svg")),
        () => qMc("massa", "unit_choice_normal", "Een ezel weegt ongeveer 250 ____.", ["kg", "g", "t"], "kg", svgImg("ezel.svg")),

        () => qMc(
          "massa",
          "unit_choice_normal",
          "Een vrachtwagen weegt 18 ____.",
          ["kg", "t", "g"],
          "t",
          svgImg("vrachtwagen.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_normal",
          "Een Afrikaanse olifant weegt 6 000 ____.",
          ["kg", "g", "t"],
          "kg",
          svgImg("olifant.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_normal",
          "Een zak aardappelen weegt 5 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("zak_aardappelen.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_normal",
          "Een koffer weegt 23 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("koffer.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_normal",
          "Een kind weegt 32 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("kind.svg")
        )
      ],

      hard: [
        () => qMc("massa", "unit_choice_hard", "Een vrachtwagen weegt ongeveer 18 ____.", ["kg", "g", "t"], "t", svgImg("vrachtwagen.svg")),
        () => qMc("massa", "unit_choice_hard", "Een zak cement weegt 25 ____.", ["kg", "g", "t"], "kg", svgImg("cementzak.svg")),
        () => qMc("massa", "unit_choice_hard", "Een muis weegt ongeveer 20 ____.", ["kg", "g", "t"], "g", svgImg("muis.svg")),

        () => qMc(
          "massa",
          "unit_choice_hard",
          "Een neushoorn weegt ongeveer 1 800 ____.",
          ["kg", "g", "t"],
          "kg",
          svgImg("neushoorn.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_hard",
          "Een zak cement weegt 25 ____.",
          ["g", "kg", "t"],
          "kg",
          svgImg("cementzak.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_hard",
          "Een pak rijst weegt 1 000 ____.",
          ["g", "kg", "t"],
          "g",
          svgImg("rijstpak.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_hard",
          "Een kleine auto weegt 1,2 ____.",
          ["kg", "t", "g"],
          "t",
          svgImg("auto.svg")
        ),

        () => qMc(
          "massa",
          "unit_choice_hard",
          "Een zak suiker weegt 750 ____.",
          ["g", "kg", "t"],
          "g",
          svgImg("suikerzak.svg")
        )
      ]

    },
    error: {
      easy: [
        () => qMc("massa", "error_easy", "Juist of fout?\nEen pak rijst van 1 000 g is normaal.", ["Juist", "Fout"], "Juist", svgImg("rijstpak.svg")),
        () => qMc("massa", "error_easy", "Juist of fout?\nEen zak suiker van 250 kg is normaal.", ["Juist", "Fout"], "Fout", svgImg("suikerzak.svg")),
        () => qMc("massa", "error_easy", "Juist of fout?\nEen koffer van 20 kg kan.", ["Juist", "Fout"], "Juist", svgImg("koffer.svg")),
        () => qMc("massa", "error_easy", "Juist of fout?\nEen muis weegt 2 ton.", ["Juist", "Fout"], "Fout", svgImg("muis.svg")),

        () => qMc(
          "massa",
          "error_easy",
          "Juist of fout?\nEen aardappelmesje van 100 kg is mogelijk.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("aardappelmesje.svg")
        ),

        () => qMc(
          "massa",
          "error_easy",
          "Juist of fout?\nEen muis weegt 20 kg.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("muis.svg")
        ),

        () => qMc(
          "massa",
          "error_easy",
          "Juist of fout?\nEen grasmachine weegt ongeveer 30 kg.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("grasmachine.svg")
        ),

        () => qMc(
          "massa",
          "error_easy",
          "Juist of fout?\nEen bus weegt 12 ton.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("bus.svg")
        ),

        () => qMc(
          "massa",
          "error_easy",
          "Juist of fout?\nEen ezel weegt 250 g.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("ezel.svg")
        )
      ],

      normal: [
        () => qMc("massa", "error_normal", "Juist of fout?\n0,8 ton is 800 kg.", ["Juist", "Fout"], "Juist", svgImg("vrachtwagen.svg")),
        () => qMc("massa", "error_normal", "Juist of fout?\n2 500 g is 25 kg.", ["Juist", "Fout"], "Fout", svgImg("gewichtjes.svg")),
        () => qMc("massa", "error_normal", "Juist of fout?\nEen bus van 12 kg is realistisch.", ["Juist", "Fout"], "Fout", svgImg("bus.svg")),

        () => qMc(
          "massa",
          "error_normal",
          "Juist of fout?\nEen vrachtwagen van 18 kg is mogelijk.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("vrachtwagen.svg")
        ),

        () => qMc(
          "massa",
          "error_normal",
          "Juist of fout?\nEen olifant weegt ongeveer 6 000 kg.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("olifant.svg")
        ),

        () => qMc(
          "massa",
          "error_normal",
          "Juist of fout?\nEen zak aardappelen van 5 g is normaal.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("zak_aardappelen.svg")
        ),

        () => qMc(
          "massa",
          "error_normal",
          "Juist of fout?\nEen koffer van 23 kg is zwaar maar mogelijk.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("koffer.svg")
        ),

        () => qMc(
          "massa",
          "error_normal",
          "Juist of fout?\nEen kind van 32 ton is realistisch.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("kind.svg")
        )
      ],


      hard: [
        () => qMc("massa", "error_hard", "Juist of fout?\n24,5 ton is 24 500 kg.", ["Juist", "Fout"], "Juist", svgImg("vrachtwagen.svg")),
        () => qMc("massa", "error_hard", "Juist of fout?\n3 600 mg is 3,6 g.", ["Juist", "Fout"], "Juist", svgImg("gewichtjes.svg")),
        () => qMc("massa", "error_hard", "Juist of fout?\n0,45 kg is 4 500 g.", ["Juist", "Fout"], "Fout", svgImg("weegschaal.svg")),

        () => qMc(
          "massa",
          "error_hard",
          "Juist of fout?\nEen neushoorn weegt ongeveer 1 800 kg.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("neushoorn.svg")
        ),

        () => qMc(
          "massa",
          "error_hard",
          "Juist of fout?\nEen zak cement weegt 25 ton.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("cementzak.svg")
        ),

        () => qMc(
          "massa",
          "error_hard",
          "Juist of fout?\nEen pak rijst weegt 1 000 kg.",
          ["Juist", "Fout"],
          "Fout",
          svgImg("rijstpak.svg")
        ),

        () => qMc(
          "massa",
          "error_hard",
          "Juist of fout?\nEen zak suiker weegt 750 g.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("suikerzak.svg")
        ),

        () => qMc(
          "massa",
          "error_hard",
          "Juist of fout?\nEen kleine auto weegt 1,2 ton.",
          ["Juist", "Fout"],
          "Juist",
          svgImg("auto.svg")
        )
      ]

    },
    ratio: {
      easy: [
        () => qRatio("massa", "ratio_easy", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa", rightLabel: "prijs (€)", rows: [["1 kg", "8"], ["250 g", null]] },
          2, "€", svgImgSafe("zak_aardappelen.svg", "Aardappelen"), 0.01),

        () => qRatio("massa", "ratio_easy", "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal zakken", rightLabel: "massa (g)", rows: [["1", "125"], ["6", null]] },
          750, "g", svgImgSafe("yoghurt.svg", "Yoghurt"), 0.01),

        () => qRatio("massa", "ratio_easy", "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal zakken", rightLabel: "massa (kg)", rows: [["1", "5"], ["2", null]] },
          10, "kg", svgImgSafe("zak_aardappelen.svg", "Aardappelen"), 0.01),

        () => qRatio("massa", "ratio_easy", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa (g)", rightLabel: "massa (kg)", rows: [["1000", "1"], ["250", null]] },
          0.25, "kg", svgImgSafe("gewichtjes.svg", "Gewichtjes"), 0.01),

        // 1) 1 ontbrekend vakje (rechts) → qRatio kan
        () => qRatio(
          "massa",
          "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa",
            rightLabel: "prijs (€)",
            rows: [
              ["1 kg", "12"],
              ["500 g", null]
            ]
          },
          6,
          "€",
          svgImgSafe("zak_aardappelen.svg", "Zak aardappelen"),
          0.01
        ),

        () => qRatio(
          "massa",
          "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal zakken",
            rightLabel: "massa (g)",
            rows: [
              ["1", "250"],
              ["4", null]
            ]
          },
          1000,
          "g",
          svgImgSafe("suikerzak.svg", "Suiker"),
          0.01
        ),

        // EXTRA easy
        () => qRatio(
          "massa",
          "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal potjes",
            rightLabel: "massa (g)",
            rows: [
              ["1", "125"],
              ["8", null]
            ]
          },
          1000,
          "g",
          svgImgSafe("yoghurt.svg", "Yoghurt"),
          0.01
        ),

        () => qRatio(
          "massa",
          "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal zakken",
            rightLabel: "massa (kg)",
            rows: [
              ["1", "25"],
              ["3", null]
            ]
          },
          75,
          "kg",
          svgImgSafe("cementzak.svg", "Cement"),
          0.01
        ),

        () => qRatio(
          "massa",
          "ratio_easy",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal zakken",
            rightLabel: "massa (kg)",
            rows: [
              ["1", "5"],
              ["4", null]
            ]
          },
          20,
          "kg",
          svgImgSafe("zak_aardappelen.svg", "Aardappelen"),
          0.01
        ),
      ],

      normal: [
        () => qRatio("massa", "ratio_normal", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa", rightLabel: "prijs (€)", rows: [["2 kg", "9"], ["1 kg", "4,5"], ["1,2 kg", null]] },
          5.4, "€", svgImgSafe("suikerzak.svg", "Suiker"), 0.01),

        () => qRatio("massa", "ratio_normal", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa (kg)", rightLabel: "massa (g)", rows: [["3,6", "3600"], ["1,25", null]] },
          1250, "g", svgImgSafe("gewichtjes.svg", "Gewichtjes"), 0.01),

        () => qRatio("massa", "ratio_normal", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa", rightLabel: "prijs (€)", rows: [["500 g", "3"], ["750 g", null]] },
          4.5, "€", svgImgSafe("rijstpak.svg", "Rijst"), 0.01),

        () => qRatio(
          "massa",
          "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa",
            rightLabel: "prijs (€)",
            rows: [
              ["2 kg", "10"],
              ["1 kg", "5"],
              ["500 g", null]
            ]
          },
          2.5,
          "€",
          svgImgSafe("zak_aardappelen.svg", "Zak aardappelen"),
          0.01
        ),

        () => qRatio(
          "massa",
          "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa (g)",
            rightLabel: "prijs (€)",
            rows: [
              ["500", "3"],
              ["1000", "6"],
              ["1500", null]
            ]
          },
          9,
          "€",
          svgImgSafe("rijstpak.svg", "Rijst"),
          0.01
        ),

        () => qRatio(
          "massa",
          "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa (ton)",
            rightLabel: "massa (kg)",
            rows: [
              ["1", "1000"],
              ["3,6", null]
            ]
          },
          3600,
          "kg",
          svgImgSafe("vrachtwagen.svg", "Vrachtwagen"),
          0.01
        ),

        // EXTRA normal: terugrekenen “per 1”
        () => qRatio(
          "massa",
          "ratio_normal",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa",
            rightLabel: "prijs (€)",
            rows: [
              ["2 kg", "9"],
              ["1 kg", "4,5"],
              ["750 g", null]
            ]
          },
          3.375,
          "€",
          svgImgSafe("suikerzak.svg", "Suiker"),
          0.01
        ),
      ],

      hard: [
        () => qRatio("massa", "ratio_hard", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa", rightLabel: "prijs (€)", rows: [["100 g", "1,20"], ["1 kg", "12"], ["375 g", null]] },
          4.5, "€", svgImgSafe("zak_aardappelen.svg", "Aardappelen"), 0.01),

        () => qRatio("massa", "ratio_hard", "Vul de verhoudingstabel aan.",
          { leftLabel: "massa", rightLabel: "massa", rows: [["1 ton", "1000 kg"], ["2,35 ton", null]] },
          2350, "kg", svgImgSafe("vrachtwagen.svg", "Vrachtwagen"), 0.01),

        () => qRatio("massa", "ratio_hard", "Vul de verhoudingstabel aan.",
          { leftLabel: "aantal zakken", rightLabel: "massa", rows: [["1", "25 kg"], ["7", null]] },
          175, "kg", svgImgSafe("cementzak.svg", "Cement"), 0.01),

        // 🔥 zoals bij inhoud: links óók invulveld → gebruik qRatioFill en zet null
        () => qRatioFill(
          "massa",
          "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal zakken",
            rightLabel: "massa",
            rows: [
              ["1", "300 g"],
              [null, "1,8 kg"]   // 1,8 kg = 1800 g → 6 zakken
            ]
          },
          [6],
          "zakken",
          svgImgSafe("suikerzak.svg", "Suiker"),
          { sub: "Tip: zet alles eerst in gram." }
        ),

        () => qRatioFill(
          "massa",
          "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa",
            rightLabel: "aantal zakken",
            rows: [
              ["250 g", "1"],
              [null, "8"]
            ]
          },
          [2000],
          "g",
          svgImgSafe("rijstpak.svg", "Rijst"),
          { sub: "8 × 250 g." }
        ),

        // EXTRA hard: prijs per 100 g (meer stappen)
        () => qRatio(
          "massa",
          "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "massa",
            rightLabel: "prijs (€)",
            rows: [
              ["1 kg", "12"],
              ["100 g", "1,2"],
              ["375 g", null]
            ]
          },
          4.5,
          "€",
          svgImgSafe("zak_aardappelen.svg", "Zak aardappelen"),
          0.01
        ),

        // EXTRA hard: met factor zoals bij inhoud
        () => qRatioFill(
          "massa",
          "ratio_hard",
          "Vul de verhoudingstabel aan (met factor).",
          {
            leftLabel: "kg",
            rightLabel: "g",
            rows: [
              ["1", "1000"],
              ["4", null]
            ]
          },
          [4000],
          "g",
          svgImgSafe("gewichtjes.svg", "Gewichtjes"),
          { factor: { op: "×", expected: 4 }, sub: "Eerst ×4, dan invullen." }
        ),

        // EXTRA hard: ton → zakken cement
        () => qRatioFill(
          "massa",
          "ratio_hard",
          "Vul de verhoudingstabel aan.",
          {
            leftLabel: "aantal zakken",
            rightLabel: "massa",
            rows: [
              ["1", "25 kg"],
              [null, "2,5 ton"]
            ]
          },
          [100],
          "zakken",
          svgImgSafe("cementzak.svg", "Cement"),
          { sub: "2,5 ton = 2500 kg. Deel door 25." }
        ),
      ]
    }

  },
gemmid: {
  /* =========================
     MEDIAAN
     easy: 3-4 waarden
     normal: 5-6 waarden
     hard: 6-7 waarden
  ========================= */
  median: {

    easy: [
      // 1 (3 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 6 },
          { x: "Di", y: 8 },
          { x: "Wo", y: 7 }
        ];
        const values = points.map(p => p.y).slice().sort((a, b) => a - b);
        const median = values[1];
        const v = svgImg("") + svgLineChart(points, 10, "Oefeningen per dag");
        return qInput(
          "gemmid",
          "median_easy_1",
          `Noor noteert 3 dagen hoeveel oefeningen ze maakt.
Ze zoekt een “typische” dag, niet de beste of slechtste.
Bekijk het lijndiagram. Wat is de mediaan?`,
          median,
          "number",
          null,
          v,
          0.01,
          "Sorteer de 3 waarden en neem het middelste getal."
        );
      },

      // 2 (3 waarden)
      () => {
        const arr = shuffle([7, 2, 9]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("toets.svg");
        return qInput(
          "gemmid",
          "median_easy_2",
          `Na een korte toets staan er 3 punten op een papiertje:
${arr.join(" - ")}.
Als je ze ordent van klein naar groot, wat staat in het midden (de mediaan)?`,
          s[1],
          "number",
          null,
          v,
          0.01
        );
      },

      // 3 (4 waarden)
      () => {
        const arr = shuffle([3, 8, 6, 10]); // mediaan = (6+8)/2 = 7
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("voetbal.svg");
        return qInput(
          "gemmid",
          "median_easy_3",
          `Tijdens de training noteert de coach hoeveel doelpunten 4 spelers maakten.
De aantallen zijn: ${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[1] + s[2]) / 2,
          "number",
          null,
          v,
          0.01,
          "Even aantal: neem het gemiddelde van de 2 middelste waarden."
        );
      },

      // 4 (3 waarden)
      () => {
        const arr = shuffle([12, 10, 14]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("quiz.svg");
        return qInput(
          "gemmid",
          "median_easy_4",
          `Anas maakt 3 korte quizjes (op 20) en schrijft zijn scores op:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[1],
          "number",
          null,
          v,
          0.01
        );
      },

      // 5 (4 waarden)
      () => {
        const arr = shuffle([2, 4, 6, 9]); // mediaan = (4+6)/2 = 5
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("gezin.svg");
        return qInput(
          "gemmid",
          "median_easy_5",
          `Vier kinderen vertellen hoeveel broers en zussen ze hebben:
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[1] + s[2]) / 2,
          "number",
          null,
          v,
          0.01
        );
      },

      // 6 (3 waarden)
      () => {
        const arr = shuffle([15, 12, 18]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("boek.svg");
        return qInput(
          "gemmid",
          "median_easy_6",
          `Drie leerlingen noteren hun leestijd (in minuten):
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[1],
          "number",
          "min",
          v,
          0.01
        );
      },

      // 7 (4 waarden)
      () => {
        const arr = shuffle([6, 7, 9, 10]); // mediaan = (7+9)/2 = 8
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("rugzak.svg");
        return qInput(
          "gemmid",
          "median_easy_7",
          `Vier rugzakken worden gewogen (in kg), gewoon om te vergelijken:
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[1] + s[2]) / 2,
          "number",
          "kg",
          v,
          0.01
        );
      },

      // 8 (3 waarden)
      () => {
        const arr = shuffle([18, 22, 20]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("thermometer.svg");
        return qInput(
          "gemmid",
          "median_easy_8",
          `Er worden 3 temperaturen gemeten (in °C):
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[1],
          "number",
          "°C",
          v,
          0.01
        );
      },

      // 9 (4 waarden) - staafdiagram
      () => {
        const data = [
          { label: "Ma", value: 14 },
          { label: "Di", value: 10 },
          { label: "Wo", value: 12 },
          { label: "Do", value: 16 }
        ];
        const s = data.map(d => d.value).slice().sort((a, b) => a - b); // 10,12,14,16 -> median=13
        const median = (s[1] + s[2]) / 2;
        const v = svgImg("broodjes.svg") + svgBarChart(data, 18, "Broodjes verkocht");
        return qInput(
          "gemmid",
          "median_easy_9",
          `In de refter wordt 4 dagen geteld hoeveel broodjes er verkocht worden.
Bekijk het staafdiagram. Wat is de mediaan?`,
          median,
          "number",
          null,
          v,
          0.01
        );
      },

      // 10 (3 waarden)
      () => {
        const arr = shuffle([6, 4, 8]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("bibliotheek.svg");
        return qInput(
          "gemmid",
          "median_easy_10",
          `In de bib noteert iemand 3 dagen hoeveel boeken er werden uitgeleend:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[1],
          "number",
          null,
          v,
          0.01
        );
      }
    ],

    normal: [
      // 1 (5 waarden) - lijndiagram (oneven, dus “middenwaarde”)
      () => {
        const points = [
          { x: "Dag 1", y: 10 },
          { x: "Dag 2", y: 12 },
          { x: "Dag 3", y: 14 },
          { x: "Dag 4", y: 16 },
          { x: "Dag 5", y: 18 }
        ];
        const values = points.map(p => p.y).slice().sort((a, b) => a - b);
        const median = values[2];
        const v = svgImg("") + svgLineChart(points, 22, "Huiswerk per dag (min)");
        return qInput(
          "gemmid",
          "median_normal_1",
          `Een leerling noteert 5 dagen hoeveel minuten hij aan huiswerk werkt.
Bekijk het lijndiagram. Wat is de mediaan?`,
          median,
          "number",
          "min",
          v,
          0.01,
          "Bij 5 waarden is de mediaan de 3de (na sorteren)."
        );
      },

      // 2 (5 waarden)
      () => {
        const arr = shuffle([6, 7, 9, 11, 12]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("puntenlijst.svg");
        return qInput(
          "gemmid",
          "median_normal_2",
          `Vijf punten worden op het bord geschreven:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[2],
          "number",
          null,
          v,
          0.01
        );
      },

      // 3 (6 waarden)
      () => {
        const arr = shuffle([1, 2, 3, 3, 4, 6]); // mediaan = 3
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("gezinnen.svg");
        return qInput(
          "gemmid",
          "median_normal_3",
          `In een straat worden 6 gezinnen geteld: hoeveel kinderen heeft elk gezin?
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01,
          "Even aantal: gemiddelde van de 2 middelste waarden."
        );
      },

      // 4 (5 waarden)
      () => {
        const arr = shuffle([22, 30, 34, 36, 40]); // mediaan = 34
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("stappen.svg");
        return qInput(
          "gemmid",
          "median_normal_4",
          `Vijf leerlingen vertellen hoe lang ze stappen naar school (in minuten):
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[2],
          "number",
          "min",
          v,
          0.01
        );
      },

      // 5 (6 waarden)
      () => {
        const arr = shuffle([10, 12, 14, 16, 16, 18]); // mediaan 15
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("zakgeld.svg");
        return qInput(
          "gemmid",
          "median_normal_5",
          `Zes jongeren vergelijken hun zakgeld per week (in euro):
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          "€",
          v,
          0.01
        );
      },

      // 6 (5 waarden)
      () => {
        const arr = shuffle([4, 6, 7, 8, 10]); // mediaan 7
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("sportzaal.svg");
        return qInput(
          "gemmid",
          "median_normal_6",
          `In de sportzaal lopen 5 leerlingen rondjes als opwarming:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[2],
          "number",
          null,
          v,
          0.01
        );
      },

      // 7 (6 waarden) - staafdiagram
      () => {
        const data = [
          { label: "Ma", value: 8 },
          { label: "Di", value: 10 },
          { label: "Wo", value: 10 },
          { label: "Do", value: 12 },
          { label: "Vr", value: 14 },
          { label: "Za", value: 16 }
        ]; // mediaan 11
        const s = data.map(d => d.value).slice().sort((a, b) => a - b);
        const v = svgImg("klanten.svg") + svgBarChart(data, 18, "Aantal klanten");
        return qInput(
          "gemmid",
          "median_normal_7",
          `Een winkel telt 6 dagen hoeveel klanten binnenkomen.
Bekijk het staafdiagram. Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01
        );
      },

      // 8 (6 waarden)
      () => {
        const arr = shuffle([8, 9, 10, 10, 11, 12]); // mediaan 10
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("springen.svg");
        return qInput(
          "gemmid",
          "median_normal_8",
          `Een leerling doet 6 sprongen ver en noteert de afstand (in dm):
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          "dm",
          v,
          0.01
        );
      },

      // 9 (5 waarden)
      () => {
        const arr = shuffle([20, 22, 24, 26, 28]); // mediaan 24
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("herhaling.svg");
        return qInput(
          "gemmid",
          "median_normal_9",
          `Tijdens 5 lessen wordt genoteerd hoeveel minuten er herhaald wordt:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[2],
          "number",
          "min",
          v,
          0.01
        );
      },

      // 10 (6 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 7 },
          { x: "Di", y: 9 },
          { x: "Wo", y: 9 },
          { x: "Do", y: 11 },
          { x: "Vr", y: 11 },
          { x: "Za", y: 13 }
        ]; // mediaan 10
        const s = points.map(p => p.y).slice().sort((a, b) => a - b);
        const v = svgImg("") + svgLineChart(points, 14, "Berichten in de klasgroep");
        return qInput(
          "gemmid",
          "median_normal_10",
          `In een klasgroep wordt 6 dagen geteld hoeveel berichten er gestuurd worden.
Bekijk het lijndiagram. Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01
        );
      }
    ],

    hard: [
      // 1 (7 waarden)
      () => {
        const arr = shuffle([12, 7, 18, 9, 9, 14, 6]);
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("rapport.svg");
        return qInput(
          "gemmid",
          "median_hard_1",
          `Zeven leerlingen krijgen hun toets terug.
De scores (op 20) zijn: ${arr.join(" - ")}.
Wat is de mediaan?`,
          s[3],
          "number",
          null,
          v,
          0.01
        );
      },

      // 2 (6 waarden)
      () => {
        const arr = shuffle([3, 7, 7, 9, 11, 12]); // mediaan = (7+9)/2 = 8
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("bakker.svg");
        return qInput(
          "gemmid",
          "median_hard_2",
          `Bij de bakker wordt geteld hoeveel broden 6 klanten kopen:
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01
        );
      },

      // 3 (7 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 14 },
          { x: "Di", y: 16 },
          { x: "Wo", y: 13 },
          { x: "Do", y: 17 },
          { x: "Vr", y: 15 },
          { x: "Za", y: 18 },
          { x: "Zo", y: 12 }
        ];
        const values = points.map(p => p.y).slice().sort((a, b) => a - b);
        const median = values[3];
        const v = svgImg("") + svgLineChart(points, 22, "Kilometers gefietst");
        return qInput(
          "gemmid",
          "median_hard_3",
          `Een leerling fietst 7 dagen en noteert het aantal kilometers per dag.
Bekijk het lijndiagram. Wat is de mediaan?`,
          median,
          "number",
          "km",
          v,
          0.01
        );
      },

      // 4 (6 waarden)
      () => {
        const arr = shuffle([18, 20, 22, 24, 26, 28]); // mediaan 23
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("weer.svg");
        return qInput(
          "gemmid",
          "median_hard_4",
          `Er worden 6 temperaturen gemeten (in °C):
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          "°C",
          v,
          0.01
        );
      },

      // 5 (6 waarden)
      () => {
        const arr = shuffle([8, 10, 12, 12, 14, 16]); // mediaan 12
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("oefenboek.svg");
        return qInput(
          "gemmid",
          "median_hard_5",
          `Zes leerlingen maken oefeningen en noteren hoeveel ze afwerken:
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01
        );
      },

      // 6 (7 waarden)
      () => {
        const arr = shuffle([0, 2, 4, 6, 3, 1, 5]); // mediaan = 3
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("bus.svg");
        return qInput(
          "gemmid",
          "median_hard_6",
          `Op 7 ritten wordt genoteerd hoeveel minuten vertraging de bus had:
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[3],
          "number",
          "min",
          v,
          0.01
        );
      },

      // 7 (6 waarden)
      () => {
        const arr = shuffle([4, 6, 8, 10, 12, 14]); // mediaan 9
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("hartslag.svg");
        return qInput(
          "gemmid",
          "median_hard_7",
          `Tijdens 6 korte sprints noteert iemand hoeveel de hartslag stijgt (bpm):
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          "bpm",
          v,
          0.01
        );
      },

      // 8 (6 waarden) - staafdiagram
      () => {
        const data = [
          { label: "1", value: 12 },
          { label: "2", value: 18 },
          { label: "3", value: 16 },
          { label: "4", value: 20 },
          { label: "5", value: 16 },
          { label: "6", value: 14 }
        ]; // mediaan 16
        const s = data.map(d => d.value).slice().sort((a, b) => a - b);
        const v = svgImg("punten_per_ronde.svg") + svgBarChart(data, 24, "Punten per ronde");
        return qInput(
          "gemmid",
          "median_hard_8",
          `In een spel worden 6 rondes gespeeld en de punten worden genoteerd.
Bekijk het staafdiagram. Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          null,
          v,
          0.01
        );
      },

      // 9 (7 waarden)
      () => {
        const arr = shuffle([25, 30, 35, 40, 45, 50, 60]); // mediaan 40
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("schermtijd.svg");
        return qInput(
          "gemmid",
          "median_hard_9",
          `Een leerling noteert 7 dagen zijn schermtijd (in minuten):
${arr.join(" - ")}.
Wat is de mediaan?`,
          s[3],
          "number",
          "min",
          v,
          0.01
        );
      },

      // 10 (6 waarden)
      () => {
        const arr = shuffle([7, 8, 8, 10, 10, 11]); // mediaan 9
        const s = arr.slice().sort((a, b) => a - b);
        const v = svgImg("potlood.svg");
        return qInput(
          "gemmid",
          "median_hard_10",
          `Een leerkracht meet 6 potloden (in cm):
${arr.join(" - ")}.
Wat is de mediaan?`,
          (s[2] + s[3]) / 2,
          "number",
          "cm",
          v,
          0.01
        );
      }
    ]
  },

  /* =========================
     GEMIDDELDE (mean)
     easy: 3-4 waarden
     normal: 5-6 waarden
     hard: 6-7 waarden
  ========================= */
  mean: {

    easy: [
      // 1 (4 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 18 },
          { x: "Di", y: 20 },
          { x: "Wo", y: 22 },
          { x: "Do", y: 20 }
        ];
        const values = points.map(p => p.y);
        const mean = values.reduce((a, b) => a + b, 0) / values.length; // 20
        const v = svgImg("") + svgLineChart(points, 25, "Temperatuur (°C)");
        return qInput(
          "gemmid",
          "mean_easy_1",
          `Vier dagen na elkaar wordt de temperatuur gemeten.
Bekijk het lijndiagram. Wat is de gemiddelde temperatuur?`,
          mean,
          "number",
          "°C",
          v,
          0.01,
          "Tel alles op en deel door 4."
        );
      },

      // 2 (4 waarden)
      () => {
        const arr = shuffle([4, 6, 8, 2]); // mean 5
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("toets.svg");
        return qInput(
          "gemmid",
          "mean_easy_2",
          `Vier leerlingen vergelijken hun punten:
${arr.join(" - ")}.
Wat is het gemiddelde?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 3 (4 waarden)
      () => {
        const arr = shuffle([5, 5, 7, 3]); // mean 5
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("zakgeld.svg");
        return qInput(
          "gemmid",
          "mean_easy_3",
          `Vier kinderen krijgen zakgeld (in euro):
${arr.join(" - ")}.
Wat is het gemiddelde?`,
          mean,
          "number",
          "€",
          v,
          0.01
        );
      },

      // 4 (4 waarden)
      () => {
        const arr = shuffle([7, 9, 5, 3]); // mean 6
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("huiswerk.svg");
        return qInput(
          "gemmid",
          "mean_easy_4",
          `Vier dagen lang noteert iemand hoeveel minuten huiswerk hij maakt:
${arr.join(" - ")}.
Wat is het gemiddelde per dag?`,
          mean,
          "number",
          "min",
          v,
          0.01
        );
      },

      // 5 (4 waarden)
      () => {
        const arr = shuffle([10, 12, 14, 16]); // mean 13
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("punten.svg");
        return qInput(
          "gemmid",
          "mean_easy_5",
          `Vier scores (op 20) worden opgeschreven:
${arr.join(" - ")}.
Wat is het gemiddelde?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 6 (4 waarden)
      () => {
        const arr = shuffle([2, 3, 1, 2]); // mean 2
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("handenwassen.svg");
        return qInput(
          "gemmid",
          "mean_easy_6",
          `Over 4 dagen wordt geteld hoe vaak iemand zijn handen wast:
${arr.join(" - ")}.
Wat is het gemiddelde per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 7 (4 waarden) - staafdiagram
      () => {
        const data = [
          { label: "Ma", value: 6 },
          { label: "Di", value: 8 },
          { label: "Wo", value: 5 },
          { label: "Do", value: 9 }
        ]; // mean 7
        const values = data.map(d => d.value);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const v = svgImg("appels.svg") + svgBarChart(data, 10, "Appels verkocht");
        return qInput(
          "gemmid",
          "mean_easy_7",
          `Een kraampje verkoopt 4 dagen appels.
Bekijk het staafdiagram. Wat is het gemiddelde per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 8 (4 “waarden” via totaal)
      () => {
        const total = 36, days = 4; // mean 9
        const v = svgImg("studeren.svg");
        return qInput(
          "gemmid",
          "mean_easy_8",
          `In 4 dagen wordt er samen ${total} minuten gestudeerd.
Wat is het gemiddelde per dag?`,
          total / days,
          "number",
          "min",
          v,
          0.01
        );
      },

      // 9 (4 waarden)
      () => {
        const arr = shuffle([2, 4, 2, 4]); // mean 3
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("sportdrank.svg");
        return qInput(
          "gemmid",
          "mean_easy_9",
          `Tijdens vier pauzes koopt iemand sportdrank (aantal flesjes):
${arr.join(" - ")}.
Wat is het gemiddelde?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 10 (4 waarden)
      () => {
        const arr = shuffle([12, 8, 10, 10]); // mean 10
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("boeken.svg");
        return qInput(
          "gemmid",
          "mean_easy_10",
          `Een leerling leest 4 dagen en telt telkens het aantal pagina's:
${arr.join(" - ")}.
Wat is het gemiddelde aantal pagina's per dag?`,
          mean,
          "number",
          "pag",
          v,
          0.01
        );
      }
    ],

    normal: [
      // 1 (5 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 10 },
          { x: "Di", y: 15 },
          { x: "Wo", y: 20 },
          { x: "Do", y: 25 },
          { x: "Vr", y: 30 }
        ];
        const values = points.map(p => p.y);
        const mean = values.reduce((a, b) => a + b, 0) / values.length; // 20
        const v = svgImg("") + svgLineChart(points, 35, "Lezen per dag (min)");
        return qInput(
          "gemmid",
          "mean_normal_1",
          `Elke dag wordt er gelezen, maar niet altijd even lang.
Bekijk het lijndiagram. Wat is het gemiddelde per dag?`,
          mean,
          "number",
          "min",
          v,
          0.01
        );
      },

      // 2 (6 “waarden” via totaal)
      () => {
        const total = 360, days = 6; // mean 60
        const v = svgImg("vervoer.svg");
        return qInput(
          "gemmid",
          "mean_normal_2",
          `Een gezin ziet dat er in ${days} dagen samen €${total} naar vervoer ging.
Wat is dat gemiddeld per dag?`,
          total / days,
          "number",
          "€",
          v,
          0.01
        );
      },

      // 3 (5 waarden)
      () => {
        const arr = shuffle([12, 14, 16, 18, 20]); // mean 16
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("telefoon.svg");
        return qInput(
          "gemmid",
          "mean_normal_3",
          `Vijf dagen lang wordt de schermtijd geteld (in minuten):
${arr.join(" - ")}.
Wat is het gemiddelde per dag?`,
          mean,
          "number",
          "min",
          v,
          0.01
        );
      },

      // 4 (6 waarden)
      () => {
        const arr = shuffle([6, 8, 10, 12, 14, 10]); // mean 10
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("oefeningen.svg");
        return qInput(
          "gemmid",
          "mean_normal_4",
          `Zes dagen worden er oefeningen gemaakt:
${arr.join(" - ")}.
Wat is het gemiddelde aantal oefeningen?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 5 (5 waarden)
      () => {
        const arr = shuffle([20, 18, 22, 20, 20]); // mean 20
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("weer.svg");
        return qInput(
          "gemmid",
          "mean_normal_5",
          `Vijf dagen na elkaar wordt de temperatuur genoteerd (in °C):
${arr.join(" - ")}.
Wat is de gemiddelde temperatuur?`,
          mean,
          "number",
          "°C",
          v,
          0.01
        );
      },

      // 6 (6 waarden) - staafdiagram
      () => {
        const data = [
          { label: "Ma", value: 12 },
          { label: "Di", value: 18 },
          { label: "Wo", value: 16 },
          { label: "Do", value: 14 },
          { label: "Vr", value: 20 },
          { label: "Za", value: 10 }
        ]; // mean 15
        const values = data.map(d => d.value);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const v = svgImg("winkel.svg") + svgBarChart(data, 24, "Klanten per dag");
        return qInput(
          "gemmid",
          "mean_normal_6",
          `Een winkelier bekijkt het staafdiagram met 6 dagen.
Wat is het gemiddelde aantal klanten per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 7 (6 “waarden” via totaal)
      () => {
        const total = 240, days = 6; // mean 40
        const v = svgImg("fabriek.svg");
        return qInput(
          "gemmid",
          "mean_normal_7",
          `In een werkplaats worden in ${days} dagen samen ${total} onderdelen gemaakt.
Wat is dat gemiddeld per dag?`,
          total / days,
          "number",
          null,
          v,
          0.01
        );
      },

      // 8 (5 waarden)
      () => {
        const arr = shuffle([8, 12, 10, 14, 16]); // mean 12
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("fiets.svg");
        return qInput(
          "gemmid",
          "mean_normal_8",
          `Een leerling fietst 5 dagen naar school en noteert de afstand (in km):
${arr.join(" - ")}.
Wat is de gemiddelde afstand per dag?`,
          mean,
          "number",
          "km",
          v,
          0.01
        );
      },

      // 9 (6 waarden)
      () => {
        const arr = shuffle([3, 5, 2, 6, 4, 4]); // mean 4
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("dictee.svg");
        return qInput(
          "gemmid",
          "mean_normal_9",
          `Zes dagen lang noteert iemand het aantal fouten in een dictee:
${arr.join(" - ")}.
Wat is het gemiddelde aantal fouten per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 10 (5 waarden)
      () => {
        const arr = shuffle([6, 8, 6, 8, 7]); // mean 7
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("water.svg");
        return qInput(
          "gemmid",
          "mean_normal_10",
          `Iemand noteert 5 dagen hoeveel glazen water hij drinkt:
${arr.join(" - ")}.
Wat is het gemiddelde per dag?`,
          mean,
          "number",
          "gl",
          v,
          0.01
        );
      }
    ],

    hard: [
      // 1 (7 waarden) - lijndiagram
      () => {
        const points = [
          { x: "Ma", y: 48 },
          { x: "Di", y: 52 },
          { x: "Wo", y: 55 },
          { x: "Do", y: 49 },
          { x: "Vr", y: 50 },
          { x: "Za", y: 46 },
          { x: "Zo", y: 50 }
        ]; // mean 50
        const values = points.map(p => p.y);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const v = svgImg("") + svgLineChart(points, 60, "Bezoekers per dag");
        return qInput(
          "gemmid",
          "mean_hard_1",
          `Een jeugdcentrum telt een week lang hoeveel bezoekers er binnenkomen.
Bekijk het lijndiagram. Wat is het gemiddelde per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 2 (6 waarden) - staafdiagram
      () => {
        const data = [
          { label: "1", value: 18 },
          { label: "2", value: 22 },
          { label: "3", value: 20 },
          { label: "4", value: 16 },
          { label: "5", value: 24 },
          { label: "6", value: 20 }
        ]; // mean 20
        const values = data.map(d => d.value);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const v = svgImg("pushups.svg") + svgBarChart(data, 26, "Push-ups per les");
        return qInput(
          "gemmid",
          "mean_hard_2",
          `Tijdens 6 sportlessen wordt geteld hoeveel push-ups er worden gedaan.
Bekijk het staafdiagram. Wat is het gemiddelde per les?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 3 (7 waarden)
      () => {
        const arr = shuffle([42, 38, 40, 44, 36, 40, 40]); // mean 40
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("snelheid.svg");
        return qInput(
          "gemmid",
          "mean_hard_3",
          `Zeven keer wordt een snelheid gemeten (in km/u):
${arr.join(" - ")}.
Wat is de gemiddelde snelheid?`,
          mean,
          "number",
          "km/u",
          v,
          0.01
        );
      },

      // 4 (7 waarden)
      () => {
        const arr = shuffle([4, 5, 6, 5, 4, 5, 6]); // mean 5
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("bibliotheek.svg");
        return qInput(
          "gemmid",
          "mean_hard_4",
          `In een leeshoek wordt 7 dagen geteld hoeveel boeken er worden uitgeleend:
${arr.join(" - ")}.
Wat is het gemiddelde aantal boeken per dag?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 5 (7 waarden)
      () => {
        const arr = shuffle([6, 7, 8, 6, 7, 8, 7]); // mean 7
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("quiz.svg");
        return qInput(
          "gemmid",
          "mean_hard_5",
          `Zeven quizscores (op 10) worden verzameld:
${arr.join(" - ")}.
Wat is het gemiddelde?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 6 (6 waarden)
      () => {
        const arr = shuffle([10, 14, 6, 18, 10, 14]); // mean 12
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("sparen.svg");
        return qInput(
          "gemmid",
          "mean_hard_6",
          `Over 6 weken noteert iemand hoeveel euro hij opzijzet:
${arr.join(" - ")}.
Wat is het gemiddelde per week?`,
          mean,
          "number",
          "€",
          v,
          0.01
        );
      },

      // 7 (7 waarden)
      () => {
        const arr = shuffle([2, 4, 3, 5, 4, 4, 6]); // mean 4
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        const v = svgImg("fouten.svg");
        return qInput(
          "gemmid",
          "mean_hard_7",
          `Zeven keer wordt het aantal foutjes in een oefening genoteerd:
${arr.join(" - ")}.
Wat is het gemiddelde aantal fouten?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      },

      // 8 (7 “waarden” via totaal)
      () => {
        const total = 420, days = 7; // mean 60
        const v = svgImg("collecte.svg");
        return qInput(
          "gemmid",
          "mean_hard_8",
          `Een klas haalt in 7 dagen samen €${total} op voor een kleine actie.
Wat is het gemiddelde bedrag per dag?`,
          total / days,
          "number",
          "€",
          v,
          0.01
        );
      },

      // 9 (totaal 7 leerlingen: 3 + 4)
      () => {
        const aN = 3, aMean = 10;
        const bN = 4, bMean = 17;
        const overall = (aN * aMean + bN * bMean) / (aN + bN); // 14
        const v = svgImg("twee_groepen.svg");
        return qInput(
          "gemmid",
          "mean_hard_9",
          `Twee groepjes maken dezelfde oefening.
Groep A heeft ${aN} leerlingen met gemiddelde ${aMean}.
Groep B heeft ${bN} leerlingen met gemiddelde ${bMean}.
Wat is het gemiddelde van beide groepen samen?`,
          overall,
          "number",
          null,
          v,
          0.01
        );
      },

      // 10 (7 waarden) - staafdiagram
      () => {
        const data = [
          { label: "8u", value: 12 },
          { label: "9u", value: 18 },
          { label: "10u", value: 24 },
          { label: "11u", value: 21 },
          { label: "12u", value: 15 },
          { label: "13u", value: 9 },
          { label: "14u", value: 6 }
        ]; // sum 105, mean 15
        const values = data.map(d => d.value);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const v = svgImg("bezoekers.svg") + svgBarChart(data, 30, "Bezoekers per uur");
        return qInput(
          "gemmid",
          "mean_hard_10",
          `In een jeugdcentrum wordt elk uur genoteerd hoeveel bezoekers er zijn (7 uren).
Bekijk het staafdiagram. Wat is het gemiddelde aantal bezoekers per uur?`,
          mean,
          "number",
          null,
          v,
          0.01
        );
      }
    ]
  }
},
  breuken: {

    simplify: {
      easy: [

        /* =========================
           TELLER / NOEMER AANVULLEN
           (geen pijl)
        ========================= */

        // 5 / □ = 5 / 8
        () => {
          const v = visualSimplifyTwoFractions({
            a: 5,
            b: null,
            simpTop: 5,
            simpBottom: 8,
            symbol: "="
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "8",
            "number",
            null,
            v
          );
        },

        // □ / 6 = 2 / 6
        () => {
          const v = visualSimplifyTwoFractions({
            a: null,
            b: 6,
            simpTop: 2,
            simpBottom: 6,
            symbol: "="
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "2",
            "number",
            null,
            v
          );
        },

        // 3 / □ = 3 / 9
        () => {
          const v = visualSimplifyTwoFractions({
            a: 3,
            b: null,
            simpTop: 3,
            simpBottom: 9,
            symbol: "="
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "9",
            "number",
            null,
            v
          );
        },

        // □ / 10 = 4 / 10
        () => {
          const v = visualSimplifyTwoFractions({
            a: null,
            b: 10,
            simpTop: 4,
            simpBottom: 10,
            symbol: "="
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "4",
            "number",
            null,
            v
          );
        },

        /* =========================
           EENVOUDIG VEREENVOUDIGEN
           (1 leeg vak, MET pijl)
        ========================= */

        // 8 / 10 → 4 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 8,
            b: 10,
            simpTop: 4,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "5",
            "number",
            null,
            v
          );
        },

        // 6 / 8 → 3 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 6,
            b: 8,
            simpTop: 3,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "4",
            "number",
            null,
            v
          );
        },

        // 12 / 16 → □ / 4
        () => {
          const v = visualSimplifyTwoFractions({
            a: 12,
            b: 16,
            simpTop: null,
            simpBottom: 4,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "3",
            "number",
            null,
            v
          );
        },

        // 10 / 20 → 1 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 10,
            b: 20,
            simpTop: 1,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "2",
            "number",
            null,
            v
          );
        },

        // 45 / 100 → 9 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 45,
            b: 100,
            simpTop: 9,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "20",
            "number",
            null,
            v
          );
        },

        // 14 / 21 → 2 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 14,
            b: 21,
            simpTop: 2,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_easy",
            "",
            "3",
            "number",
            null,
            v
          );
        }

      ],

      normal: [

        /* =========================
           TYPE 1 — VOLLEDIGE BREUK
           (2 invulvakken)
        ========================= */

        // 12 / 18 → □ / □
        () => {
          const a = 12, b = 18;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 10 / 15 → □ / □
        () => {
          const a = 10, b = 15;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        /* =========================
           TYPE 2 — AANVULLEN
           (1 invulvak)
        ========================= */

        // 18 / 24 → 3 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 18,
            b: 24,
            simpTop: 3,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "",
            "4",
            "number",
            null,
            v
          );
        },

        // 20 / 30 → □ / 3
        () => {
          const v = visualSimplifyTwoFractions({
            a: 20,
            b: 30,
            simpTop: null,
            simpBottom: 3,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "",
            "2",
            "number",
            null,
            v
          );
        },

        /* =========================
           TYPE 1 — VOLLEDIGE BREUK
        ========================= */

        // 14 / 21 → □ / □
        () => {
          const a = 14, b = 21;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 18 / 24 → □ / □
        () => {
          const a = 18, b = 24;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        /* =========================
           TYPE 2 — AANVULLEN
           (1 invulvak)
        ========================= */

        // 16 / 20 → 4 / □
        () => {
          const v = visualSimplifyTwoFractions({
            a: 16,
            b: 20,
            simpTop: 4,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "",
            "5",
            "number",
            null,
            v
          );
        },

        // 21 / 28 → □ / 4
        () => {
          const v = visualSimplifyTwoFractions({
            a: 21,
            b: 28,
            simpTop: null,
            simpBottom: 4,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_normal",
            "",
            "3",
            "number",
            null,
            v
          );
        }

      ],


      hard: [

        /* =========================
           TYPE 1 — VOLLEDIGE BREUK
           (klassiek, grotere getallen)
        ========================= */

        // 16 / 24 → □ / □
        () => {
          const a = 16, b = 24;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 45 / 60 → □ / □
        () => {
          const a = 45, b = 60;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 18 / 30 → □ / □
        () => {
          const a = 18, b = 30;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 24 / 36 → □ / □
        () => {
          const a = 24, b = 36;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        /* =========================
           TYPE 2 — RANDOM (veilig)
           (altijd vereenvoudigbaar)
        ========================= */

        () => {
          const pairs = [
            [12, 18],
            [15, 20],
            [18, 24],
            [20, 30],
            [24, 36],
            [30, 45]
          ];

          const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        /* =========================
           TYPE 3 — LASTIGERE DELERS
           (minder evidente GGD)
        ========================= */

        // 28 / 42 → □ / □
        () => {
          const a = 28, b = 42;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        },

        // 35 / 50 → □ / □
        () => {
          const a = 35, b = 50;
          const g = gcd(a, b);

          const v = visualSimplifyTwoFractions({
            a,
            b,
            simpTop: null,
            simpBottom: null,
            symbol: "→"
          });

          return qInput(
            "breuken",
            "simplify_hard",
            "Schrijf als een onvereenvoudigbare breuk:",
            `${a / g}/${b / g}`,
            "fraction",
            null,
            v,
            0.01,
            null,
            checkIrreducibleFraction(`${a / g}/${b / g}`)
          );
        }

      ]

    },

    fraction_of: {
      easy: [
        () => qInput("breuken", "fraction_of_easy", "Bereken: 1/2 van 10 = ____", 5, "number"),
        () => qInput("breuken", "fraction_of_easy", "Bereken: 1/4 van 20 = ____", 5, "number"),
        () => qInput("breuken", "fraction_of_easy", "Bereken: 3/4 van 20 = ____", 15, "number"),
        () => qInput("breuken", "fraction_of_easy", "Bereken: 1/5 van 25 = ____", 5, "number"),
        () => qInput("breuken", "fraction_of_easy", "Bereken: 2/3 van 18 = ____", 12, "number"),
        () => qInput("breuken", "fraction_of_easy", "Bereken: 3/5 van 15 = ____", 9, "number")
      ],
      normal: [
        () => qInput("breuken", "fraction_of_normal", "Bereken: 2/5 van 40 = ____", 16, "number"),
        () => qInput("breuken", "fraction_of_normal", "Bereken: 3/8 van 64 = ____", 24, "number"),
        () => qInput("breuken", "fraction_of_normal", "Bereken: 1/3 van 21 = ____", 7, "number"),
        () => qInput("breuken", "fraction_of_normal", "Bereken: 4/5 van 35 = ____", 28, "number"),
        () => qInput("breuken", "fraction_of_normal", "Bereken: 5/6 van 36 = ____", 30, "number"),
        () => qInput("breuken", "fraction_of_normal", "Bereken: 7/10 van 50 = ____", 35, "number")
      ],
      hard: [
        () => qInput("breuken", "fraction_of_hard", "Bereken: 5/6 van 48 = ____", 40, "number"),
        () => qInput("breuken", "fraction_of_hard", "Bereken: 7/10 van 90 = ____", 63, "number"),
        () => qInput("breuken", "fraction_of_hard", "Bereken: 3/5 van 120 = ____", 72, "number"),
        () => qInput("breuken", "fraction_of_hard", "Bereken: 4/3 van 30 = ____", 40, "number"),
        () => qInput("breuken", "fraction_of_hard", "Bereken: 9/4 van 16 = ____", 36, "number"),
        () => qInput("breuken", "fraction_of_hard", "Bereken: 11/5 van 25 = ____", 55, "number")
      ]
    },

    read_fraction: {
      easy: [

        // ─────────────────────────
        // TAARTEN (cirkels)
        // ─────────────────────────

        // 1/2
        () => {
          const v = svgFractionPie(4, 2, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "1/2",
            "fraction",
            null,
            v
          );
        },

        // 3/4
        () => {
          const v = svgFractionPie(4, 3, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // 2/6
        () => {
          const v = svgFractionPie(6, 2, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "2/6",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // CHOCOLADEREPEN (rasters)
        // ─────────────────────────

        // 3/6
        () => {
          const v = svgFractionChocolate(3, 2, 3, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "3/6",
            "fraction",
            null,
            v
          );
        },

        // 4/8
        () => {
          const v = svgFractionChocolate(4, 2, 4, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "4/8",
            "fraction",
            null,
            v
          );
        },

        // 5/10
        () => {
          const v = svgFractionChocolate(5, 2, 5, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "5/10",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // BREUKENSTROKEN (balken)
        // ─────────────────────────

        // 2/5
        () => {
          const v = svgFractionBar(5, 2, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "2/5",
            "fraction",
            null,
            v
          );
        },

        // 3/8
        () => {
          const v = svgFractionBar(8, 3, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "3/8",
            "fraction",
            null,
            v
          );
        },

        // 4/10
        () => {
          const v = svgFractionBar(10, 4, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_easy",
            "Schrijf als breuk.",
            "4/10",
            "fraction",
            null,
            v
          );
        }

      ],
      normal: [

        // ─────────────────────────
        // TAARTEN (cirkeldiagram)
        // ─────────────────────────

        // 4/6 → 2/3
        () => {
          const v = svgFractionPie(6, 4, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "2/3",
            "fraction",
            null,
            v
          );
        },

        // 6/8 → 3/4
        () => {
          const v = svgFractionPie(8, 6, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // 3/9 → 1/3
        () => {
          const v = svgFractionPie(9, 3, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "1/3",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // CHOCOLADEREPEN (rasters)
        // ─────────────────────────

        // 6/12 → 1/2
        () => {
          const v = svgFractionChocolate(4, 3, 6, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "1/2",
            "fraction",
            null,
            v
          );
        },

        // 4/10 → 2/5
        () => {
          const v = svgFractionChocolate(5, 2, 4, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "2/5",
            "fraction",
            null,
            v
          );
        },

        // 9/12 → 3/4
        () => {
          const v = svgFractionChocolate(4, 3, 9, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // BREUKENSTROKEN (balken)
        // ─────────────────────────

        // 4/8 → 1/2
        () => {
          const v = svgFractionBar(8, 4, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "1/2",
            "fraction",
            null,
            v
          );
        },

        // 6/10 → 3/5
        () => {
          const v = svgFractionBar(10, 6, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "3/5",
            "fraction",
            null,
            v
          );
        },

        // 9/12 → 3/4
        () => {
          const v = svgFractionBar(12, 9, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_normal",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        }

      ],
      hard: [

        // ─────────────────────────
        // TAARTEN (veel stukken)
        // ─────────────────────────

        // 9/12 → 3/4
        () => {
          const v = svgFractionPie(12, 9, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // 10/15 → 2/3
        () => {
          const v = svgFractionPie(15, 10, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "2/3",
            "fraction",
            null,
            v
          );
        },

        // 14/16 → 7/8
        () => {
          const v = svgFractionPie(16, 14, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "7/8",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // CHOCOLADEREPEN (grotere rasters)
        // ─────────────────────────

        // 12/16 → 3/4
        () => {
          const v = svgFractionChocolate(4, 4, 12, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // 15/20 → 3/4
        () => {
          const v = svgFractionChocolate(5, 4, 15, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "3/4",
            "fraction",
            null,
            v
          );
        },

        // 8/12 → 2/3
        () => {
          const v = svgFractionChocolate(4, 3, 8, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "2/3",
            "fraction",
            null,
            v
          );
        },

        // ─────────────────────────
        // BREUKENSTROKEN (abstracter)
        // ─────────────────────────

        // 6/12 → 1/2
        () => {
          const v = svgFractionBar(12, 6, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "1/2",
            "fraction",
            null,
            v
          );
        },

        // 9/15 → 3/5
        () => {
          const v = svgFractionBar(15, 9, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "3/5",
            "fraction",
            null,
            v
          );
        },

        // 10/20 → 1/2
        () => {
          const v = svgFractionBar(20, 10, "Welk deel is ingekleurd?");
          return qInput(
            "breuken",
            "read_fraction_hard",
            "Schrijf als breuk (vereenvoudigd).",
            "1/2",
            "fraction",
            null,
            v
          );
        }

      ]
    },

    complement: {
      easy: [
        () => qInput("breuken", "complement_easy", "Van een taart is 1/4 opgegeten.\nWelk deel blijft over?", "3/4", "fraction"),
        () => qInput("breuken", "complement_easy", "Eén op vijf snoepen is zuur.\nWelk deel is NIET zuur?", "4/5", "fraction"),
        () => qInput("breuken", "complement_easy", "Van een pizza is 2/6 gegeten.\nWelk deel is over?", "4/6", "fraction"),
        () => qInput("breuken", "complement_easy", "Drie van de acht kinderen zijn jongens.\nWelk deel is meisjes?", "5/8", "fraction"),
        () => qInput("breuken", "complement_easy", "Van een reep is 1/3 op.\nWelk deel is nog heel?", "2/3", "fraction")
      ],
      normal: [
        () => qInput("breuken", "complement_normal", "Van een tuin is 3/8 bloemen.\nWelk deel is GEEN bloemen?", "5/8", "fraction"),
        () => qInput("breuken", "complement_normal", "In een klas draagt 2/3 een jas.\nWelk deel draagt geen jas?", "1/3", "fraction"),
        () => qInput("breuken", "complement_normal", "Van een chocoladereep is 5/12 opgegeten.\nWelk deel is nog heel?", "7/12", "fraction"),
        () => qInput("breuken", "complement_normal", "Eén op de vier auto's is rood.\nWelk deel is NIET rood?", "3/4", "fraction"),
        () => qInput("breuken", "complement_normal", "Van een kom soep is 3/5 op.\nWelk deel is nog over?", "2/5", "fraction")
      ],
      hard: [
        () => qInput("breuken", "complement_hard", "Van een voorraad is 7/10 verkocht.\nWelk deel is NIET verkocht?", "3/10", "fraction"),
        () => qInput("breuken", "complement_hard", "Van een park is 5/6 gras.\nWelk deel is geen gras?", "1/6", "fraction"),
        () => qInput("breuken", "complement_hard", "In een bakkerij is 11/15 brood verkocht.\nWelk deel is nog over?", "4/15", "fraction"),
        () => qInput("breuken", "complement_hard", "Van een fles is 9/12 sap gedronken.\nWelk deel is nog over?", "3/12", "fraction"),
        () => qInput("breuken", "complement_hard", "Eén op de acht lampen is kapot.\nWelk deel is NIET kapot?", "7/8", "fraction")
      ]
    },

    compare: {
      easy: [
        () => qMc("breuken", "compare_easy", "Wat is groter?", ["1/4", "3/4"], "3/4"),
        () => qMc("breuken", "compare_easy", "Wat is groter?", ["2/5", "4/5"], "4/5"),
        () => qMc("breuken", "compare_easy", "Wat is groter?", ["1", "3/4"], "1"),
        () => qMc("breuken", "compare_easy", "Wat is kleiner?", ["1/2", "1"], "1/2")
      ],
      normal: [
        () => qMc("breuken", "compare_normal", "Wat is groter?", ["3/4", "3/8"], "3/4"),
        () => qMc("breuken", "compare_normal", "Wat is groter?", ["2/3", "2/5"], "2/3"),
        () => qMc("breuken", "compare_normal", "Wat is groter?", ["3/5", "4/7"], "3/5"),
        () => qMc("breuken", "compare_normal", "Wat is het kleinst?", ["1/2", "2/3", "3/4"], "1/2")
      ],
      hard: [
        () => qMc("breuken", "compare_hard", "Wat is groter?", ["5/6", "4/5"], "5/6"),
        () => qMc("breuken", "compare_hard", "Wat is groter?", ["7/6", "1"], "7/6"),
        () => qMc("breuken", "compare_hard", "Wat is het grootst?", ["3/4", "5/8", "2/3"], "3/4"),
        () => qMc("breuken", "compare_hard", "Waar/niet waar: 4/6 is groter dan 2/3.", ["waar", "niet waar"], "niet waar")
      ]
    },
    fraction_click: {
      easy: [

        // 1/2 van 4
        () => {
          const total = 4;
          const num = 1, den = 2;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_easy",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        },

        // 1/4 van 8
        () => {
          const total = 8;
          const num = 1, den = 4;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_easy",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        },

        // 3/4 van 8
        () => {
          const total = 8;
          const num = 3, den = 4;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_easy",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        }

      ],

      normal: [

        // 2/3 van 6
        () => {
          const total = 6;
          const num = 2, den = 3;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_normal",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        },

        // 3/5 van 10
        () => {
          const total = 10;
          const num = 3, den = 5;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_normal",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        },

        // 4/6 van 12
        () => {
          const total = 12;
          const num = 4, den = 6;

          const v = visualFractionGrid({
            total,
            num,
            den
          });

          return qInput(
            "breuken",
            "fraction_click_normal",
            "",
            null,
            null,
            null,
            v,
            0,
            null,
            () => checkClickedCount(total * num / den)
          );
        }

      ],

    }


  },
  procent: {

    percent_of: {
      easy: [

        () => qInput(
          "procent",
          "percent_of_easy",
          "In een doos zitten 80 knikkers.\n25% daarvan zijn rood.\nHoeveel rode knikkers zijn er?",
          20,
          "number",
          null,
          svgPercentBar?.(80, 25) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_easy",
          "Een magazijn bevat 1 800 flessen water.\n10% daarvan wordt geleverd.\nHoeveel flessen worden geleverd?",
          180,
          "number",
          null,
          svgPercentBar?.(1800, 10) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_easy",
          "Een klas telt 60 leerlingen.\n50% zit vooraan.\nHoeveel leerlingen zitten vooraan?",
          30,
          "number",
          null,
          svgClassGroup?.(60, 50) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_easy",
          "Een bak bevat 60 appels.\n5% is beschadigd.\nHoeveel appels zijn beschadigd?",
          3,
          "number",
          null,
          svgPercentBar?.(60, 5) ?? null
        )

      ],
      normal: [

        () => qInput(
          "procent",
          "percent_of_normal",
          "Een sportclub verkoopt 200 tickets.\n15% daarvan zijn kinderkaartjes.\nHoeveel kinderkaartjes zijn dat?",
          30,
          "number",
          null,
          svgPercentBar?.(200, 15) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_normal",
          "Een doos bevat 250 chocolaatjes.\n12% is met melkchocolade.\nHoeveel zijn dat?",
          30,
          "number",
          null,
          svgPercentBar?.(250, 12) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_normal",
          "Een bus vervoert 90 passagiers.\n30% stapt uit aan de volgende halte.\nHoeveel passagiers stappen uit?",
          27,
          "number",
          null,
          svgBusLoad?.(90, 30) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_normal",
          "Een fabriek produceert 160 fietsen per dag.\n35% daarvan is elektrisch.\nHoeveel elektrische fietsen zijn dat?",
          56,
          "number",
          null,
          svgPercentBar?.(160, 35) ?? null
        )

      ],
      hard: [

        () => qInput(
          "procent",
          "percent_of_hard",
          "Een magazijn bevat 200 dozen.\n7,5% daarvan is beschadigd.\nHoeveel dozen zijn beschadigd?",
          15,
          "number",
          null,
          svgPercentBar?.(200, 7.5) ?? null,
          0.02,
          "Tip: 7,5% = 5% + 2,5%"
        ),

        () => qInput(
          "procent",
          "percent_of_hard",
          "Een tank bevat 400 liter water.\n2,5% lekt weg.\nHoeveel liter gaat verloren?",
          10,
          "number",
          null,
          svgTank?.(400, 2.5) ?? null,
          0.02,
          "Tip: 2,5% = 1/4 van 10%"
        ),

        () => qInput(
          "procent",
          "percent_of_hard",
          "Een fabriek maakt 250 onderdelen per dag.\n18% voldoet niet aan de norm.\nHoeveel onderdelen zijn afgekeurd?",
          45,
          "number",
          null,
          svgPercentBar?.(250, 18) ?? null
        ),

        () => qInput(
          "procent",
          "percent_of_hard",
          "Een doos bevat 160 koekjes.\n12,5% wordt uitgedeeld.\nHoeveel koekjes worden uitgedeeld?",
          20,
          "number",
          null,
          svgPercentBar?.(160, 12.5) ?? null,
          0.02,
          "Tip: 12,5% = 1/8"
        )

      ]
    },


    discount: {
      easy: [

        () => qInput(
          "procent",
          "discount_easy",
          "Youssef koopt sportschoenen op de markt.\nDe prijs is €80.\nEr is 25% korting.\nHoeveel moet hij betalen?",
          60,
          "number",
          "€",
          svgShopDiscount("schoenen", 80, 25, "shoes.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_easy",
          "In een kledingwinkel kost een trui €50.\nJe krijgt 10% korting.\nHoeveel betaal je aan de kassa?",
          45,
          "number",
          "€",
          svgShopDiscount("trui", 50, 10, "clothes.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_easy",
          "Fatima koopt een jas voor €120.\nEr is 20% korting.\nHoeveel betaalt ze?",
          96,
          "number",
          "€",
          svgShopDiscount("jas", 120, 20, "jacket.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_easy",
          "Een pet kost €40.\nVandaag is het 50% korting.\nHoeveel betaal je?",
          20,
          "number",
          "€",
          svgShopDiscount("pet", 40, 50, "cap.svg"),
          0.02
        )

      ],
      normal: [

        () => qInput(
          "procent",
          "discount_normal",
          "In een elektronicazaak kost een koptelefoon €75.\nEr is 20% korting.\nHoeveel moet je betalen?",
          60,
          "number",
          "€",
          svgShopDiscount("koptelefoon", 75, 20, "headphones.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_normal",
          "Een smartphone kost €160.\nJe krijgt 15% korting.\nWat is de nieuwe prijs?",
          136,
          "number",
          "€",
          svgShopDiscount("smartphone", 160, 15, "phone.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_normal",
          "In de solden kost een broek €90.\nEr is 30% korting.\nHoeveel betaal je?",
          63,
          "number",
          "€",
          svgShopDiscount("broek", 90, 30, "pants.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_normal",
          "Een jas kost €250.\nDe winkel geeft 12% korting.\nWat is de prijs na korting?",
          220,
          "number",
          "€",
          svgShopDiscount("jas", 250, 12, "coat.svg"),
          0.02
        )

      ],
      hard: [

        () => qInput(
          "procent",
          "discount_hard",
          "Een rugzak kost €48.\nEr is 25% korting.\nHoeveel betaal je?",
          36,
          "number",
          "€",
          svgShopDiscount("rugzak", 48, 25, "backpack.svg"),
          0.02
        ),

        () => qInput(
          "procent",
          "discount_hard",
          "Een jas kost €240.\nJe krijgt 7,5% korting.\nWat betaal je?",
          222,
          "number",
          "€",
          svgShopDiscount("jas", 240, 7.5, "wintercoat.svg"),
          0.05,
          "Tip: 7,5% = 5% + 2,5%"
        ),

        () => qInput(
          "procent",
          "discount_hard",
          "Een feestjurk kost €135.\nEr is 12,5% korting.\nHoeveel betaal je? (afronden op 2 cijfers)",
          118.13,
          "number",
          "€",
          svgShopDiscount("feestjurk", 135, 12.5, "dress.svg"),
          0.05
        ),

        () => qInput(
          "procent",
          "discount_hard",
          "Een televisie kost €320.\nDe korting is 18%.\nWat is de nieuwe prijs?",
          262.4,
          "number",
          "€",
          svgShopDiscount("televisie", 320, 18, "tv.svg"),
          0.05,
          "Schrijf met komma"
        )

      ]
    }

    ,

    complement: {
      easy: [
        () => qInput(
          "procent",
          "complement_easy",
          "In de klas van juf Amina is 65% van de leerlingen aanwezig.\n____% is vandaag niet op school.",
          35,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_easy",
          "De gsm van Youssef is voor 40% opgeladen.\n____% van de batterij is nog leeg.",
          60,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_easy",
          "In een zak chips is nog 20% over.\n____% van de chips is al opgegeten.",
          80,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_easy",
          "Een bus naar Brussel is voor 90% gevuld met passagiers.\n____% van de plaatsen is nog vrij.",
          10,
          "number"
        )
      ],
      normal: [
        () => qInput(
          "procent",
          "complement_normal",
          "Van alle leerlingen in de school komt 38% met de fiets.\n____% komt NIET met de fiets.",
          62,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_normal",
          "Van de laptops in het ICT-lokaal is 15% kapot.\n____% werkt nog goed.",
          85,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_normal",
          "Bij een toets wiskunde slaagde 72% van de klas.\n____% slaagde niet.",
          28,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_normal",
          "Van een groepswerk is 55% al afgewerkt.\n____% moet nog gedaan worden.",
          45,
          "number"
        )
      ],
      hard: [
        () => qInput(
          "procent",
          "complement_hard",
          "In een winkel is er 7,5% korting op een jas.\n____% van de prijs betaal je nog.",
          92.5,
          "number",
          null,
          null,
          0.05,
          "Schrijf met komma"
        ),
        () => qInput(
          "procent",
          "complement_hard",
          "Van een voorraad koekjes is al 12,5% opgegeten.\n____% blijft nog over.",
          87.5,
          "number",
          null,
          null,
          0.05,
          "Schrijf met komma"
        ),
        () => qInput(
          "procent",
          "complement_hard",
          "Bij een online test was 99% van de antwoorden correct.\n____% was fout.",
          1,
          "number"
        ),
        () => qInput(
          "procent",
          "complement_hard",
          "In een enquête bleek 0,5% van de antwoorden fout te zijn.\n____% was juist.",
          99.5,
          "number",
          null,
          null,
          0.05,
          "Schrijf met komma"
        )
      ]
    }
    ,
    error: {
      easy: [
        () => qMc(
          "procent",
          "error_easy",
          "Yassin zegt in de klas:\n“10% van 50 is 5.”\nHeeft hij gelijk?",
          ["ja", "nee"],
          "ja"
        ),
        () => qMc(
          "procent",
          "error_easy",
          "Amina rekent:\n“50% van 80 is 50.”\nIs dat juist?",
          ["ja", "nee"],
          "nee"
        ),
        () => qMc(
          "procent",
          "error_easy",
          "De leerkracht zegt:\n“25% is hetzelfde als 1/4.”\nKlopt dat?",
          ["ja", "nee"],
          "ja"
        ),
        () => qMc(
          "procent",
          "error_easy",
          "In een winkel zegt iemand:\n“5% van 100 is 50.”\nIs dat correct?",
          ["ja", "nee"],
          "nee"
        )
      ],
      normal: [
        () => qMc(
          "procent",
          "error_normal",
          "In een winkel rekent Samir:\n“20% korting op €60 → €60 − €20 = €40.”\nKlopt dit?",
          ["ja", "nee"],
          "nee"
        ),
        () => qMc(
          "procent",
          "error_normal",
          "Fatima zegt:\n“€80 wordt 10% duurder, dus €80 + €10 = €90.”\nIs dat juist?",
          ["ja", "nee"],
          "nee"
        ),
        () => qMc(
          "procent",
          "error_normal",
          "De leerkracht zegt:\n“15% van 200 is 30.”\nHeeft hij gelijk?",
          ["ja", "nee"],
          "ja"
        ),
        () => qMc(
          "procent",
          "error_normal",
          "Een leerling zegt:\n“12% van 250 is 25.”\nKlopt dat?",
          ["ja", "nee"],
          "nee"
        )
      ],
      hard: [
        () => qMc(
          "procent",
          "error_hard",
          "In een toets zegt iemand:\n“12,5% van 160 is 16.”\nIs dat juist?",
          ["ja", "nee"],
          "nee"
        ),
        () => qMc(
          "procent",
          "error_hard",
          "Een winkel affiche zegt:\n“7,5% korting → je betaalt nog 92,5%.”\nKlopt dat?",
          ["ja", "nee"],
          "ja"
        ),
        () => qMc(
          "procent",
          "error_hard",
          "Een leerling rekent:\n“18% van 250 = 18 × 250 = 4500.”\nIs dit correct?",
          ["ja", "nee"],
          "nee"
        ),
        () => qMc(
          "procent",
          "error_hard",
          "Iemand beweert:\n“0,5% is hetzelfde als 1/2.”\nKlopt dat?",
          ["ja", "nee"],
          "nee"
        )
      ]
    },
    compare: {
      easy: [
        () => qMc("procent", "compare_easy", "Wat is meer?", ["10% van 100", "20% van 100"], "20% van 100"),
        () => qMc("procent", "compare_easy", "Wat is meer?", ["25% van 80", "50% van 80"], "50% van 80"),
        () => qMc("procent", "compare_easy", "Wat is minder?", ["5% van 60", "10% van 60"], "5% van 60"),
        () => qMc("procent", "compare_easy", "Wat is groter?", ["50%", "25%"], "50%")
      ],
      normal: [
        () => qMc("procent", "compare_normal", "Wat is meer?", ["20% van 200", "25% van 160"], "25% van 160"),
        () => qMc("procent", "compare_normal", "Wat is meer?", ["30% van 90", "25% van 120"], "25% van 120"),
        () => qMc("procent", "compare_normal", "Waar betaal je het minst?", ["€100 met 20% korting", "€80 met 10% korting"], "€100 met 20% korting"),
        () => qMc("procent", "compare_normal", "Welke stijging is groter?", ["10% van €150", "15% van €80"], "10% van €150")
      ],
      hard: [
        () => qMc("procent", "compare_hard", "Wat is meer?", ["12,5% van 160", "20% van 90"], "12,5% van 160"),
        () => qMc("procent", "compare_hard", "Wat is minder?", ["7,5% van 200", "10% van 140"], "7,5% van 200"),
        () => qMc("procent", "compare_hard", "Waar betaal je het minst?", ["€240 met 25% korting", "€200 met 15% korting"], "€200 met 15% korting"),
        () => qMc("procent", "compare_hard", "Waar/niet waar: 30% van 120 is meer dan 25% van 150.", ["waar", "niet waar"], "niet waar")
      ]
    }

  },



  tijd: (() => {
    const partOf = (h) => {
      if (h < 6) return "'s nachts";
      if (h < 12) return "'s morgens";
      if (h < 18) return "na de middag";
      return "'s avonds";
    };

    const analogToDigital = (h, m, ctx, skill) => () => {
      const part = partOf(h);
      const prompt =
        ctx +
        "\nHet is " + part + ".\nLees de klok en schrijf in digitale tijd (24u): ____";

      return qInput(
        "tijd",
        skill,
        prompt,
        formatTime(h, m),
        "time",
        null,
        svgClock(h, m),
        0
      );
    };

    const wordsToDigital = (phrase, h, m, skill) => () => {
      const prompt = "Schrijf in digitale tijd (24u): " + phrase + " = ____";
      return qInput(
        "tijd",
        skill,
        prompt,
        formatTime(h, m),
        "time",
        null,
        null,
        0
      );
    };

    const uid = (pfx = "clk") => pfx + "_" + Math.random().toString(36).slice(2, 8);

    const checkSetClock = (id, targetH, targetM, tolMin = 0) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const h12 = Number(el.dataset.h12);
      const m = Number(el.dataset.m);
      const tH12 = (targetH % 12) || 12;

      const dm = Math.abs(m - targetM);
      const d = Math.min(dm, 60 - dm);
      return h12 === tH12 && d <= tolMin;
    };

    const setClockFromDigital = (targetH, targetM, skill, step) => () => {
      const id = uid("clk");
      const startH12 = 1 + Math.floor(Math.random() * 12);
      const startM = step > 1
        ? (Math.floor(Math.random() * (60 / step)) * step)
        : Math.floor(Math.random() * 60);

      const target = formatTime(targetH, targetM);
      const visual =
        htmlDigitalTime(target) +
        svgClockSettable(id, { h12: startH12, m: startM, step, size: 200 });

      const prompt =
        "De digitale klok toont " + target + ".\n" +
        "Zet de analoge klok goed (sleep de wijzers) en druk OK.";

      const check = () => checkSetClock(id, targetH, targetM, step > 1 ? 0 : 1);

      return qInput(
        "tijd",
        skill,
        prompt,
        target,
        "time",
        null,
        visual,
        0,
        null,
        check,
        true
      );
    };

    const diffMin = (h1, m1, h2, m2) => {
      let a = h1 * 60 + m1;
      let b = h2 * 60 + m2;
      let d = b - a;
      if (d < 0) d += 1440;
      return d;
    };

    const timeSubQ = (nowH, nowM, targetH, targetM, ctx, skill) => () => {
      const part = partOf(nowH);
      const v = svgClock(nowH, nowM);
      const d = diffMin(nowH, nowM, targetH, targetM);

      const prompt =
        ctx +
        "\nHet is " + part + ".\n" +
        "Afspraak om " + formatTime(targetH, targetM) + ".\n" +
        "Hoeveel tijd heb je nog? ____ min";

      return qInput(
        "tijd",
        skill,
        prompt,
        d,
        "number",
        "min",
        v,
        0.01
      );
    };

    const timeAddQ = (startH, startM, dh, dm, ctx, skill) => () => {
      const part = partOf(startH);
      const v = svgClock(startH, startM);
      const r = addTime(startH, startM, dh, dm);

      const dur =
        (dh ? dh + "u " : "") +
        (dm ? dm + "min" : "0min");

      const prompt =
        ctx +
        "\nHet is " + part + ".\n" +
        "Start (zie klok) + " + dur + " = ____ (digitale tijd, 24u)";

      return qInput(
        "tijd",
        skill,
        prompt,
        formatTime(r.h, r.m),
        "time",
        null,
        v,
        0
      );
    };

    return {
      /* =========================
         KLOK LEZEN / KLOK ZETTEN
      ========================= */
      clock_read: {
        easy: [
          analogToDigital(7, 20, "Oscar fietst naar school.", "clock_read_easy"),
          analogToDigital(9, 50, "In de klas start de les wiskunde.", "clock_read_easy"),
          analogToDigital(11, 25, "In de speeltijd kijkt Ella op de klok.", "clock_read_easy"),
          analogToDigital(15, 10, "Na school wil Anas naar de bibliotheek.", "clock_read_easy"),
          analogToDigital(16, 5, "Na de middag begint de voetbaltraining.", "clock_read_easy"),

          wordsToDigital("kwart over acht 's morgens", 8, 15, "clock_words_easy"),
          wordsToDigital("half vier na de middag", 15, 30, "clock_words_easy"),

          setClockFromDigital(13, 40, "clock_set_easy", 5)
        ],

        normal: [
          analogToDigital(18, 55, "Moussa staat klaar voor jiu jitsu.", "clock_read_normal"),
          analogToDigital(20, 10, "Na het avondeten begint de film.", "clock_read_normal"),
          analogToDigital(6, 40, "Vroeg opstaan voor een uitstap.", "clock_read_normal"),
          analogToDigital(14, 35, "Na de middag gaat de bel voor de les.", "clock_read_normal"),
          analogToDigital(0, 15, "Het is stil in huis en iedereen slaapt.", "clock_read_normal"),
          analogToDigital(23, 40, "Laat op de avond komt de bus nog aan.", "clock_read_normal"),

          wordsToDigital("kwart voor zeven 's morgens", 6, 45, "clock_words_normal"),
          wordsToDigital("tien over half acht 's avonds", 19, 40, "clock_words_normal"),
          wordsToDigital("tien voor twee 's nachts", 1, 50, "clock_words_normal"),

          setClockFromDigital(19, 25, "clock_set_normal", 5)
        ],

        hard: [
          analogToDigital(3, 45, "In de nacht is de straat helemaal leeg.", "clock_read_hard"),
          analogToDigital(0, 5, "Een wekker gaat heel vroeg af.", "clock_read_hard"),
          analogToDigital(12, 0, "Rond de middag kijkt Emir naar de klok.", "clock_read_hard"),
          analogToDigital(22, 50, "Na een avondwandeling kom je thuis.", "clock_read_hard"),
          analogToDigital(23, 55, "Vlak voor middernacht tellen ze af.", "clock_read_hard"),

          wordsToDigital("vijf voor half één 's nachts", 0, 25, "clock_words_hard"),
          wordsToDigital("drie over negen 's avonds", 21, 3, "clock_words_hard"),
          wordsToDigital("kwart over twaalf 's nachts", 0, 15, "clock_words_hard"),

          setClockFromDigital(5, 17, "clock_set_hard", 1)
        ]
      },

      /* =========================
         TIJD OMZETTEN / TIJDMAAT
      ========================= */
      convert: {
        easy: [
          () => qMc(
            "tijd",
            "time_convert_easy",
            "Vul de juiste tijdmaat in:\nIk loop 100 m in 18 ____.",
            ["seconden", "minuten", "uren"],
            "seconden"
          ),
          () => qMc(
            "tijd",
            "time_convert_easy",
            "Vul de juiste tijdmaat in:\nDe grote vakantie duurt ongeveer 2 ____.",
            ["dagen", "weken", "maanden"],
            "maanden"
          ),
          () => qMc(
            "tijd",
            "time_convert_easy",
            "Vul de juiste tijdmaat in:\nHanden wassen duurt 30 ____.",
            ["seconden", "minuten", "uren"],
            "seconden"
          ),
          () => qMc(
            "tijd",
            "time_convert_easy",
            "Vul de juiste tijdmaat in:\nEen etentje in een restaurant duurt 2 ____.",
            ["minuten", "uren", "dagen"],
            "uren"
          ),

          () => qInput("tijd", "time_convert_easy", "Reken om: 1 minuut 20 seconden = ____ seconden", 80, "number", "sec"),
          () => qInput("tijd", "time_convert_easy", "Herleid: 2 uur = ____ minuten", 120, "number", "min"),
          () => qInput("tijd", "time_convert_easy", "Herleid: 45 minuten = ____ seconden", 2700, "number", "sec"),
          () => qInput("tijd", "time_convert_easy", "Herleid: 300 seconden = ____ minuten", 5, "number", "min")
        ],

        normal: [
          () => qInput("tijd", "time_convert_normal", "Herleid: 90 minuten = ____ uur", 1.5, "number", "uur", null, 0.02),
          () => qInput("tijd", "time_convert_normal", "Herleid: 3,5 uur = ____ minuten", 210, "number", "min"),
          () => qInput("tijd", "time_convert_normal", "Herleid: 2 uur 15 min = ____ minuten", 135, "number", "min"),
          () => qInput("tijd", "time_convert_normal", "Herleid: 1 dag = ____ uur", 24, "number", "uur"),
          () => qInput("tijd", "time_convert_normal", "Herleid: 2 min 30 sec = ____ seconden", 150, "number", "sec"),
          () => qMc("tijd", "time_convert_normal", "Kies de juiste eenheid:\nEen treinrit Leuven → Brussel duurt 25 ____.", ["seconden", "minuten", "uren"], "minuten"),
          () => qMc("tijd", "time_convert_normal", "Kies de juiste eenheid:\nEen sprint duurt 12 ____.", ["seconden", "minuten", "uren"], "seconden"),
          () => qInput("tijd", "time_convert_normal", "Herleid: 1200 seconden = ____ minuten", 20, "number", "min")
        ],

        hard: [
          () => qInput("tijd", "time_convert_hard", "Herleid: 0,75 uur = ____ minuten", 45, "number", "min", null, 0.02),
          () => qInput("tijd", "time_convert_hard", "Herleid: 135 minuten = ____ uur", 2.25, "number", "uur", null, 0.02, "Tip: 60 min = 1 uur"),
          () => qInput("tijd", "time_convert_hard", "Herleid: 2,4 uur = ____ minuten", 144, "number", "min", null, 0.02),
          () => qInput("tijd", "time_convert_hard", "Herleid: 10 800 seconden = ____ uur", 3, "number", "uur", null, 0.02),
          () => qInput("tijd", "time_convert_hard", "Herleid: 1 week = ____ dagen", 7, "number", "dagen"),
          () => qMc("tijd", "time_convert_hard", "Wat is juist?", ["1u30 = 90 min", "1u30 = 130 min", "1u30 = 30 min"], "1u30 = 90 min"),
          () => qInput("tijd", "time_convert_hard", "Herleid: 750 seconden = ____ minuten", 12.5, "number", "min", null, 0.02),
          () => qInput("tijd", "time_convert_hard", "Herleid: 2 uur 45 min = ____ minuten", 165, "number", "min")
        ]
      },

      /* =========================
         TIJD OPTELLEN
      ========================= */
      time_add: {
        easy: [
          timeAddQ(9, 20, 0, 15, "De les start en je moet 15 minuten wachten.", "time_add_easy"),
          timeAddQ(7, 45, 0, 30, "Je ontbijt duurt 30 minuten.", "time_add_easy"),
          timeAddQ(15, 10, 0, 20, "Je bent te vroeg en wacht 20 minuten.", "time_add_easy"),
          timeAddQ(11, 50, 0, 10, "De speeltijd duurt nog 10 minuten.", "time_add_easy"),
          timeAddQ(8, 5, 0, 25, "De busrit duurt 25 minuten.", "time_add_easy")
        ],

        normal: [
          timeAddQ(13, 45, 1, 30, "De film duurt 1u 30min.", "time_add_normal"),
          timeAddQ(18, 10, 0, 45, "De training duurt 45 minuten.", "time_add_normal"),
          timeAddQ(20, 35, 2, 0, "Je speelt een game-avond van 2 uur.", "time_add_normal"),
          timeAddQ(9, 55, 1, 5, "Een toets duurt 1u 5min.", "time_add_normal"),
          timeAddQ(16, 25, 0, 50, "Je werkt nog 50 minuten door.", "time_add_normal")
        ],

        hard: [
          timeAddQ(22, 50, 2, 25, "Je reist 's avonds nog 2u 25min.", "time_add_hard"),
          timeAddQ(23, 40, 0, 35, "Je wacht nog 35 minuten op de laatste bus.", "time_add_hard"),
          timeAddQ(5, 55, 0, 20, "Heel vroeg: je loopt 20 minuten warm.", "time_add_hard"),
          timeAddQ(11, 50, 2, 40, "Een uitstap duurt 2u 40min.", "time_add_hard"),
          timeAddQ(17, 55, 1, 10, "Je kookt 1u 10min.", "time_add_hard")
        ]
      },

      /* =========================
         TIJD VERSCHIL
      ========================= */
      time_sub: {
        easy: [
          timeSubQ(15, 25, 16, 0, "Anas moet naar de dokter.", "time_sub_easy"),
          timeSubQ(10, 10, 10, 40, "Elien wacht op de bus.", "time_sub_easy"),
          timeSubQ(18, 30, 19, 0, "De sportles begint straks.", "time_sub_easy"),
          timeSubQ(8, 5, 8, 20, "Je hebt nog pauze.", "time_sub_easy"),
          timeSubQ(11, 40, 12, 0, "De middagpauze start om 12:00.", "time_sub_easy")
        ],

        normal: [
          timeSubQ(14, 10, 15, 0, "Je hebt een afspraak bij de tandarts.", "time_sub_normal"),
          timeSubQ(23, 10, 23, 45, "Je wil nog 1 aflevering kijken.", "time_sub_normal"),
          timeSubQ(0, 15, 1, 0, "Je wacht 's nachts op een taxi.", "time_sub_normal"),
          timeSubQ(11, 35, 12, 20, "Je bent hongerig, lunch is om 12:20.", "time_sub_normal"),
          timeSubQ(19, 5, 20, 30, "Je spreekt af met vrienden.", "time_sub_normal")
        ],

        hard: [
          timeSubQ(23, 50, 0, 10, "Het is bijna middernacht.", "time_sub_hard"),
          timeSubQ(21, 37, 23, 5, "De film start later op de avond.", "time_sub_hard"),
          timeSubQ(4, 55, 6, 10, "Je wekker gaat om 06:10.", "time_sub_hard"),
          timeSubQ(17, 20, 18, 2, "De trein vertrekt om 18:02.", "time_sub_hard"),
          timeSubQ(22, 45, 1, 15, "Een nachtrit duurt tot 01:15.", "time_sub_hard")
        ]
      }
    };
  })(),



  global: {
    "mix": [
      () => pickFromTopic("inhoud"),
      () => pickFromTopic("grafieken"),
      () => pickFromTopic("gemmid"),
      () => pickFromTopic("massa"),
      () => pickFromTopic("breuken"),
      () => pickFromTopic("procent"),
      () => pickFromTopic("lijnen"),
      () => pickFromTopic("hoeken"),
      () => pickFromTopic("tijd")
    ]
  }
};

/* =========================
   Helpers om vragen op te halen
========================= */

function pickFromTopic(topic) {
  const t = BANK[topic];
  if (!t) return null;

  const subtopics = Object.keys(t);
  const sub = t[subtopics[Math.floor(Math.random() * subtopics.length)]];
  if (!sub) return null;

  const levels = Object.keys(sub);
  const lvl = sub[levels[Math.floor(Math.random() * levels.length)]];
  if (!Array.isArray(lvl) || !lvl.length) return null;

  return lvl[Math.floor(Math.random() * lvl.length)]();
}

