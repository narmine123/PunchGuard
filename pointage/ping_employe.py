"""import requests
import time
import configparser
import os
from datetime import datetime



CONFIG_FILE = "config.ini"

#fonction pour créer ou lire config.ini

def get_or_create_config():
    config = configparser.ConfigParser()
    # Si le fichier n'existe pas, on le crée vide
    if not os.path.exists( CONFIG_FILE) : 
        with open(CONFIG_FILE, "w") as f:#Si le fichier n'existe pas, il est créé automatiquement.
#Si le fichier existe déjà, son contenu est écrasé (d'où l'utilité de vérifier avant avec os.path.exists).
            f.write("")
    
    config.read(CONFIG_FILE)

    if 'employe' not in config:
        config.add_section('employe')

    # Obtenir ou demander l’ID employé
    if 'id' not in config['employe'] or not config['employe']['id'].strip():
        print("Aucun ID employé trouvé.")
        emp_id = input("Veuillez saisir votre ID employé : ").strip()
        config.set('employe', 'id', emp_id)
    else:
        emp_id = config['employe']['id'].strip()

    # Obtenir ou demander l’hôte (host)
    if 'host' not in config['employe'] or not config['employe']['host'].strip():
        print("Aucune adresse trouvée.")
 
        host = input("Veuillez saisir l'adresse du serveur (ex: http://localhost:3000) : ").strip()
        config.set('employe', 'host', host)
    else:
        host = config['employe']['host'].strip()

    # Sauvegarde dans le fichier si quelque chose a été modifié
    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)

    return emp_id, host
# Envoi automatique du pointage toutes les 5 minutes
def envoyer_pointage(emp_id, host):
    try:
        response = requests.post(f"{host}", json={"employeId": emp_id})
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Pointage envoyé pour {emp_id} : {response.status_code} - Prochain pointage dans 5 minutes.")
    except Exception as e:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [✗] Erreur d'envoi du pointage :", e)

if __name__ == "__main__":
    try:
        emp_id, host = get_or_create_config()
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Démarrage du service de pointage (ID: {emp_id}, Host: {host})")

        while True:
            envoyer_pointage(emp_id, host)
            time.sleep(5 * 60)
    except Exception as e:
        with open("log_erreur.txt", "w") as log:
            log.write("Erreur lors de l'exécution du pointage :\n")
            log.write(traceback.format_exc())
        print("Une erreur est survenue. Voir log_erreur.txt")
#Il va :
#-envoyer automatiquement un POST toutes les 5 minutes vers http://localhost:3000/ping
#-insérer une ligne dans la base à chaque fois
"""

import requests
import time
import configparser
import os
import sys
from datetime import datetime
import traceback
import tkinter as tk
from tkinter import simpledialog, messagebox

CONFIG_FILE = "config.ini"

def get_or_create_config():
    config = configparser.ConfigParser()
    infos_saisies = False  # Pour savoir si on doit afficher le message "Merci"

    if not os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "w") as f:
            f.write("")

    config.read(CONFIG_FILE)

    if 'employe' not in config:
        config.add_section('employe')

    # Interface graphique tkinter
    root = tk.Tk()
    root.withdraw()

    # Saisie ID
    if 'id' not in config['employe'] or not config['employe']['id'].strip():
        emp_id = simpledialog.askstring("Configuration", "Entrez votre ID employé :")
        if emp_id:
            config.set('employe', 'id', emp_id)
            infos_saisies = True
    else:
        emp_id = config['employe']['id'].strip()

    # Saisie host
    if 'host' not in config['employe'] or not config['employe']['host'].strip():
        host = simpledialog.askstring("Configuration", "Entrez l'adresse du serveur (ex: http://localhost:3000/api/employes/ping) :")
        if host:
            config.set('employe', 'host', host)
            infos_saisies = True
    else:
        host = config['employe']['host'].strip()

    # Sauvegarde
    with open(CONFIG_FILE, 'w') as configfile:
        config.write(configfile)

    # Afficher "Merci" uniquement si l'utilisateur a saisi quelque chose
    if infos_saisies:
        messagebox.showinfo("Configuration réussie", "✅ Merci, vos informations ont été enregistrées.\nLe service de pointage va démarrer.")

    return config['employe']['id'].strip(), config['employe']['host'].strip()


def envoyer_pointage(emp_id, host):
    try:
        response = requests.post(host, json={"employeId": emp_id})
        # Pour mode noconsole, tu peux remplacer ça par notification si tu veux
        # print(...) ne sera pas vu.
        # print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Pointage envoyé pour {emp_id}")
    except Exception as e:
        with open("log_erreur.txt", "w") as log:
            log.write("Erreur lors de l'envoi du pointage :\n")
            log.write(traceback.format_exc())


if __name__ == "__main__":
    try:
        emp_id, host = get_or_create_config()

        # Toujours afficher ce message après la config (même si fichier déjà rempli)
        messagebox.showinfo("Pointage", f"🟢 Démarrage du service de pointage\n\nID: {emp_id}\nHost: {host}")

        while True:
            envoyer_pointage(emp_id, host)
            time.sleep(5 * 60)

    except Exception as e:
        with open("log_erreur.txt", "w") as log:
            log.write("Erreur lors de l'exécution du pointage :\n")
            log.write(traceback.format_exc())

