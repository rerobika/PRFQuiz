PRF Quiz - Fáncsik Róbert

**Használat:**
```sh
  cd quiz-api && npm install && npm start
  cd quiz-qui && npm install && npm start
```

**DB url:**
  - Konfigurálható a quiz-api/src/models/index.js-ben

***Amit a program tud:***
 - *Regisztráció*
 - *Login*
 - *Admin:*
   - Tesztek létrehozása tetszőleges válaszlehetőséggel
   - Quiz létrehozása saját tesztekből tetszőleges kombinációban
 - *Player:*
   - Az összes admin által létrehozott quizt egyszer kitölheti
   - A már kitöltött tesztek pontszáma megjelenik
 - *Quiz:*
   - Itt egy authentikált felhasználó kitölthet egy quizt
   - A quiz összes kérdése megjelenik
   - A kérdésekre az összes válasz megjeleik, amelyeket a player kiválaszthat
 - *Fancy PageNotFound* oldal

***Nehézségek:***
 - Mivel webes technológiákban sok tapasztalatom még nem volt ezért a kezdeti felépítés nehézkes volt.
 - PassportJS... :)

***Megoldás menete:***
  - A loginnal/register kezdtem, megvalósítottam a backend részét, majd sokat szenvedés után a PassportJs-el is összetudtam rakni
  - Az admin felülettel folytattam, megcsináltam a tesztek/quizek szerkezetét + a UI-t
  - Ezt követően a player/quiz oldalt csináltam meg, itt egyszerre folyt a backend/frontend fejlesztés
  - Végül kapott az UI egy kis csinosítást, és bekerültek a logout gombok
  - A lépéseket folyamatan commitáltam a gitbe.



