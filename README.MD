## Fonctionnalités principales

* Affichage des produits avec leurs garnitures
* Ajout, suppression et vidage du panier
* Calcul dynamique du total
* Paiement sécurisé via Stripe
* Panier persistant dans le navigateur (`localStorage`)
* Authentification sécurisée via JWT
* Envoi d'emails pour activation de compte (testable via MailDev)

## Technologies utilisées

* **Backend :** Spring Boot, JWT, API REST
* **Frontend :** React, TypeScript, React-Bootstrap
* **Base de données :** PostgreSQL
* **Paiement :** Stripe
* **Emails de test :** MailDev

## Instructions pour tester le projet

1. Cloner le dépôt :

```bash
git clone https://github.com/TarekSammoud/interview-project-demo.git
cd interview-project-demo
```

2. Configurer le backend :

* Ajouter votre clé Stripe dans le fichier `application.properties` :

```properties
stripe.apiKey=VOTRE_CLE_STRIPE_ICI
```

* Installer et lancer MailDev pour tester les emails :

```bash
npm install -g maildev
maildev
```

* Lancer l'application Spring Boot :

```bash
./mvnw spring-boot:run
```

3. Configurer le frontend :

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

---

### Note importante sur l'activation de compte

Lors de la création d'un nouveau compte, vous recevrez un **lien d'activation dans MailDev**. Vous **ne pourrez pas vous connecter tant que le compte n'est pas activé**. Toute action nécessitant un token JWT valide échouera si l'activation n'a pas été effectuée.

---

Ce projet a été conçu pour montrer mes compétences en **développement fullstack**, **gestion de panier**, **intégration de paiement** et **gestion sécurisée des utilisateurs**.
N'hésitez pas à poser des questions lors de l'entretien, je pourrai expliquer le code et mes choix techniques.
