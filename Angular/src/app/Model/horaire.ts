import {Quart} from "./Quart";

export class Horaire {
  private id?: number;
  private _quartsTravail: Quart[];
  private employe: number;
  dateDebut: Date;

  constructor(quartsTravail: Quart[], employe: number, dateDebut: Date, id?: number) {
    this.id = id;
    this._quartsTravail = quartsTravail;
    this.employe = employe;
    this.dateDebut = dateDebut;
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
      new Date(dateAvecTemp),
      jsonObject.id !== null ? jsonObject.id : undefined
    );
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
