import {Quart} from "./Quart";

export class Horaire {
  private _id?: number;
  private _quartsTravail: Quart[];
  private _employe: number;
  private _dateDebut: Date;

  constructor(quartsTravail: Quart[], employe: number, dateDebut: Date, id?: number) {
    this._id = id;
    this._quartsTravail = quartsTravail;
    this._employe = employe;
    this._dateDebut = dateDebut;
  }

  public static jsonToHoraire(jsonObject: any) : Horaire {
    const dateAvecTemp = jsonObject.dateDebut + "T00:00:00";
    const quartsTravail: Quart[] = [];
    jsonObject.quartsTravail.forEach((quartJson: any) => {
      quartsTravail.push(Quart.jsonToQuart(quartJson));
    });
    return new Horaire(
      quartsTravail,
      jsonObject.employe.id,
      new Date(dateAvecTemp)
    );
  }

  set employe(value: number) {
    this._employe = value;
  }

  set dateDebut(value: Date) {
    this._dateDebut = value;
  }

  public ajouterQuart(quart: Quart) {
    this.quartsTravail.push(quart);
  }

  public supprimerQuart(dateDuQuart: Date) {
    const indexQuart = this.quartsTravail.findIndex(
      quart => quart.date.toLocaleDateString() === dateDuQuart.toLocaleDateString()
    );
    if (indexQuart !== -1) {
      this.quartsTravail.splice(indexQuart, 1);
    }
  }

  get id(): number | undefined {
    return this._id;
  }

  get employe(): number {
    return this._employe;
  }

  get dateDebut(): Date {
    return this._dateDebut;
  }

  get quartsTravail(): Quart[] {
    return this._quartsTravail;
  }

  public getQuartByJour(jourSemaine : number) : Quart | undefined {
    // Avant : Lundi = 0, Dimanche = 6 -> Dimanche = 0, Samedi = 6
    const jourSemaineAjuste = (jourSemaine + 1) % 7;
    return this.quartsTravail.find(quart => quart.date.getDay() === jourSemaineAjuste);
  }

}
