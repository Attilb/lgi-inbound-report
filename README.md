# 🚚 LGI Átvételi Riport App · Bolt.new projekt README

Ez a projekt egy **mobilon használható React + Vite** alapú alkalmazás,  
amely a raktári dolgozók számára teszi lehetővé, hogy **bizonyító fotókkal és megjegyzésekkel** dokumentálják a szállítmányok beérkezését.

---

## 🧭 Alapinfók

**Technológiák**
- React 18 + Vite 5
- React Router 6
- Tailwind CSS
- jsPDF + html2canvas (riport-PDF generálás)
- Nincs auth, nincs aláírás, csak magyar nyelv

**Fő lépések**
1. Fuvar adatainak rögzítése  
2. Fotók hozzáadása (kamerával)  
3. Lezárás (státusz, összefoglaló, átvevő név)  
4. Riport előnézet + PDF letöltés / email küldés  

---

## ⚙️ Futtatás

```bash
npm install
npm run dev
npm install jspdf html2canvas
