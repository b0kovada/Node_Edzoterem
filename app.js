import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import adminRoutes from './routes/admin.js'
import timetableRoutes from './routes/training.js'
import __dirname from './util/rootpath.js'

const app = express()
const PORT = 3000
//const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', timetableRoutes) //!!
app.use('/admin', adminRoutes) //!!

app.use((req, res) => {
    res.status(404).render('404.ejs', {
        pageTitle: 'Page Not Found',
        path: ''
    })
})

app.listen(PORT, () => console.log(`server runs on port: http://localhost:${PORT}`))

import java.io.*;
import java.util.*;

public class EpitmenyAdo {

    static class Telek {
        String utcaNeve;
        int hazszam;
        int alapterulet;
        char adosav;
        String tulajdonosAdoszam;

        public Telek(String utcaNeve, int hazszam, int alapterulet, char adosav, String tulajdonosAdoszam) {
            this.utcaNeve = utcaNeve;
            this.hazszam = hazszam;
            this.alapterulet = alapterulet;
            this.adosav = adosav;
            this.tulajdonosAdoszam = tulajdonosAdoszam;
        }
    }

    static List<Telek> telkek = new ArrayList<>();

    public static void main(String[] args) {
        beolvasas("utca.txt");

        // 2. feladat: Telkek száma
        System.out.println("2. feladat: " + telkek.size() + " telek van az állományban.");

        // 3. feladat: Adószám alapján keresés
        Scanner sc = new Scanner(System.in);
        System.out.print("Kérem adja meg az adószámot: ");
        String keresettAdoszam = sc.nextLine();
        tulajdonosKeres(keresettAdoszam);

        // 5. feladat: Adósáv statisztika
        adosavStatisztika();

        // 6. feladat: Eltérő adósávú utcák
        elteroAdosavUtak();

        // 7. feladat: Fizetendő adó tulajdonosonként
        fizetendoTulajdonosonkent("fizetendo.txt");
    }

    // 1. feladat: Adatok beolvasása
    public static void beolvasas(String fajlNev) {
        try (BufferedReader br = new BufferedReader(new FileReader(fajlNev))) {
            String sor;
            while ((sor = br.readLine()) != null) {
                String[] adatok = sor.split(" ");
                String utcaNeve = adatok[0];
                int hazszam = Integer.parseInt(adatok[1]);
                int alapterulet = Integer.parseInt(adatok[2]);
                char adosav = adatok[3].charAt(0);
                String tulajdonosAdoszam = adatok[4];
                telkek.add(new Telek(utcaNeve, hazszam, alapterulet, adosav, tulajdonosAdoszam));
            }
        } catch (IOException e) {
            System.out.println("Hiba történt a fájl beolvasása közben: " + e.getMessage());
        }
    }

    // 3. feladat: Tulajdonos keresése
    public static void tulajdonosKeres(String adoszam) {
        boolean talalat = false;
        for (Telek telek : telkek) {
            if (telek.tulajdonosAdoszam.equals(adoszam)) {
                System.out.println("3. feladat: " + telek.utcaNeve + " utca " + telek.hazszam);
                talalat = true;
            }
        }
        if (!talalat) {
            System.out.println("3. feladat: Nem szerepel az adatállományban.");
        }
    }

    // 4. feladat: Adószámítási függvény
    public static int ado(char adosav, int alapterulet) {
        int adosavDij;
        switch (adosav) {
            case 'A': adosavDij = 100; break;
            case 'B': adosavDij = 80; break;
            case 'C': adosavDij = 50; break;
            default: adosavDij = 0;
        }
        return adosavDij * alapterulet;
    }

    // 5. feladat: Adósáv statisztika
    public static void adosavStatisztika() {
        Map<Character, Integer> telekSzam = new HashMap<>();
        Map<Character, Integer> osszAdo = new HashMap<>();

        for (Telek telek : telkek) {
            int adoErtek = ado(telek.adosav, telek.alapterulet);
            telekSzam.put(telek.adosav, telekSzam.getOrDefault(telek.adosav, 0) + 1);
            osszAdo.put(telek.adosav, osszAdo.getOrDefault(telek.adosav, 0) + adoErtek);
        }

        System.out.println("5. feladat:");
        for (char adosav : telekSzam.keySet()) {
            System.out.println(adosav + " sávba " + telekSzam.get(adosav) + " telek tartozik, az adó " + osszAdo.get(adosav) + " Ft.");
        }
    }

    // 6. feladat: Eltérő adósávú utcák
    public static void elteroAdosavUtak() {
        Set<String> utcakEllenorzesre = new HashSet<>();

        Map<String, Set<Character>> utcaAdosavok = new HashMap<>();
        for (Telek telek : telkek) {
            utcaAdosavok.computeIfAbsent(telek.utcaNeve, k -> new HashSet<>()).add(telek.adosav);
        }

        for (String utca : utcaAdosavok.keySet()) {
            if (utcaAdosavok.get(utca).size() > 1) {
                utcakEllenorzesre.add(utca);
            }
        }

        System.out.println("6. feladat: Eltérő adósávú utcák:");
        for (String utca : utcakEllenorzesre) {
            System.out.println(utca);
        }
    }

    // 7. feladat: Fizetendő adó tulajdonosonként
    public static void fizetendoTulajdonosonkent(String fajlNev) {
        Map<String, Integer> tulajdonosAdok = new HashMap<>();

        for (Telek telek : telkek) {
            int adoErtek = ado(telek.adosav, telek.alapterulet);
            tulajdonosAdok.put(telek.tulajdonosAdoszam, tulajdonosAdok.getOrDefault(telek.tulajdonosAdoszam, 0) + adoErtek);
        }

        try (PrintWriter writer = new PrintWriter(new FileWriter(fajlNev))) {
            for (String adoszam : tulajdonosAdok.keySet()) {
                writer.println(adoszam + " " + tulajdonosAdok.get(adoszam));
            }
            System.out.println("7. feladat: Fizetendo.txt fajl letrehozva.");
        } catch (IOException e) {
            System.out.println("Hiba történt a fájl írása közben: " + e.getMessage());
        }
    }
}
