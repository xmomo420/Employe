export class Quart {
  private id?: number;
  private _date: Date;
  private _heureDebut: Date;
  private _debutRepas?: Date;
  private _finRepas?: Date;
  private _heureFin?: Date;
  // Clés étrangères
  private horaireQuotidien?: number;
  private feuilleDeTemps?: number;


  constructor(
    id: number,
    date: Date,
    heureDebut: Date,
    heureFin?: Date,
    debutRepas?: Date,
    finRepas?: Date,
    horaireQuotidien?: number,
    feuilleDeTemps?: number) {
    this.id = id;
    this._date = date;
    this._heureDebut = heureDebut;
    this._debutRepas = debutRepas;
    this._finRepas = finRepas;
    this._heureFin = heureFin;
    this.horaireQuotidien = horaireQuotidien;
    this.feuilleDeTemps = feuilleDeTemps;
  }

  public static parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  public static formatterHeure(date: Date | undefined): string {
    if (!date) {
      return '';
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  public static jsonToQuart(jsonObject: any): Quart {
    const dateAvecTemps = jsonObject.date + "T00:00:00";
    return new Quart(
      jsonObject.id !== null ? jsonObject.id : -1,
      new Date(dateAvecTemps),
      this.parseTime(jsonObject.heureDebut),
      jsonObject.heureFin !== null ? this.parseTime(jsonObject.heureFin) : undefined,
      jsonObject.debutRepas !== null ? this.parseTime(jsonObject.debutRepas) : undefined,
      jsonObject.finRepas !== null ? this.parseTime(jsonObject.finRepas) : undefined,
      jsonObject.horaireQuotidien !== null ? jsonObject.horaireQuotidien : undefined,
      jsonObject.feuilleDeTemps !== null ? jsonObject.feuilleDeTemps : undefined
    );
  }

  get date(): Date {
    return this._date;
  }

  get heureDebut(): Date {
    return this._heureDebut;
  }

  get debutRepas(): Date {
    return <Date>this._debutRepas;
  }

  get finRepas(): Date {
    return <Date>this._finRepas;
  }

  get heureFin(): Date | undefined {
    return this._heureFin;
  }

}
