CREATE TABLE Employe(
    id SERIAL PRIMARY KEY,
    prenom varchar(64) NOT NULL,
    nom varchar(64) NOT NULL,
    nom_utilisateur varchar(16) UNIQUE NOT NULL,
    mot_de_passe varchar(64) NOT NULL,
    role varchar(16) CHECK (role IN ('ADJOINT', 'GERANT', 'ASSOCIE')) NOT NULL,
    date_embauche date,
    numero_assurance_social varchar(9),
    taux_horaire decimal(5,2)
);

CREATE TABLE Horaire_Quotidien(
    id SERIAL PRIMARY KEY,
    employe int NOT NULL,
    date_debut date,
    FOREIGN KEY(employe) REFERENCES Employe(id)
);

CREATE TABLE Feuille_De_Temps(
    id SERIAL PRIMARY KEY,
    employe int NOT NULL,
    date_debut date,
    FOREIGN KEY(employe) REFERENCES Employe(id)
);

CREATE TABLE Quart(
    id SERIAL PRIMARY KEY,
    date date NOT NULL,
    heure_debut time,
    debut_repas time,
    fin_repas time,
    heure_fin time,
    horaire_quotidien int,
    feuille_de_temps int,
    FOREIGN KEY(horaire_quotidien) REFERENCES Horaire_Quotidien(id),
    FOREIGN KEY(feuille_de_temps) REFERENCES Feuille_De_Temps(id)
);
