# Judo Dojo - Backend API 🥋
![npm bundle size (version)](https://img.shields.io/badge/version-0.0.1-darkblue)  ![npm bundle size (version)](https://img.shields.io/badge/language-JavaScript-yellow)  ![npm bundle size (version)](https://img.shields.io/badge/framework-Express-lightgreen) 

Ein vollständiges **Node.js + Express + MongoDB** Backend für eine Judo-Dojo Webanwendung. Diese API stellt alle notwendigen Endpunkte für eine Vereinswebsite bereit.

## 📌 Projektübersicht

* Vereinsverwaltung - Trainer-Profile, Trainingszeiten und Veranstaltungen

*  Datenbereitstellung - Vollständige API für alle Vereinsinformationen im JSON-Format

* Medienverwaltung - Bereitstellung von Bildern für Galerie und Profile

*  MongoDB-Integration - Persistente Datenspeicherung in der Cloud

### Backend-Architektur

-   **Node.js + Express** - Leistungsstarker Server mit RESTful API
    
-   **MongoDB Atlas** - Cloud-basierte NoSQL-Datenbank
    
-   **Mongoose ODM** - Strukturierte Datenmodellierung und Validierung
    
-   **Datenmigration** - Automatisierter Import aus bestehenden JSON-Daten

Die API dient als Backend für ein separates React-Frontend und ermöglicht eine vollständige Fullstack-Anwendung für die digitale Präsenz eines Judo-Vereins.

## 🔍 Endpunkte

| Methode   | Endpoint                   | Beschreibung                          |
|-----------|----------------------------|---------------------------------------|
| `GET`     | `/api/trainer`             | Gibt alle Trainer zurück              |
| `GET`     | `/api/gallery`        		 | Gibt alle Bilder zurück           
| `GET`     | `/api/schedule`               | Zeigt den Terminkalender
| `POST`    | `/api/contact`             | Gibt alle eingegangenen Kontaktanfragen zurück.           

