export class Quart {
  private _id?: number;
  private _date: Date;
  private _heureDebut: Date;
  private _debutRepas?: Date;
  private _finRepas?: Date;
  private _heureFin?: Date;
  // Clés étrangères
  private _horaireQuotidien?: number;
  private _feuilleDeTemps?: number;


  constructor(
    date: Date,
    heureDebut: Date,
    heureFin?: Date,
    debutRepas?: Date,
    finRepas?: Date,
    horaireQuotidien?: number,
    feuilleDeTemps?: number,
    id?: number) {
    this._date = date;
    this._heureDebut = heureDebut;
    this._debutRepas = debutRepas;
    this._finRepas = finRepas;
    this._heureFin = heureFin;
    this._horaireQuotidien = horaireQuotidien;
    this._feuilleDeTemps = feuilleDeTemps;
    this._id = id;
  }

  public static parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  public static formatterHeureAffichage(date: Date | undefined): string {
    if (!date) {
      return '';
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  public static formatterHeureBackend(date: Date | undefined): string {
    if (!date) {
      return '';
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  public toJson(): any {
    return {
      date: this._date.toLocaleDateString(),
      heureDebut: `${Quart.formatterHeureBackend(this._heureDebut)}:00`,
      heureFin: `${Quart.formatterHeureBackend(this._heureFin)}:00`,
      debutRepas: this.debutRepas !== undefined ? `${Quart.formatterHeureBackend(this._debutRepas)}:00` : null,
      finRepas: this.finRepas !== undefined ? `${Quart.formatterHeureBackend(this._finRepas)}:00` : null,
    };
  }

  public static jsonToQuart(jsonObject: any): Quart {
    const dateAvecTemps = jsonObject.date + "T00:00:00";
    return new Quart(
      new Date(dateAvecTemps),
      this.parseTime(jsonObject.heureDebut),
      jsonObject.heureFin !== null ? this.parseTime(jsonObject.heureFin) : undefined,
      jsonObject.debutRepas !== null ? this.parseTime(jsonObject.debutRepas) : undefined,
      jsonObject.finRepas !== null ? this.parseTime(jsonObject.finRepas) : undefined,
      jsonObject._horaireQuotidien !== null ? jsonObject._horaireQuotidien : undefined,
      jsonObject._feuilleDeTemps !== null ? jsonObject._feuilleDeTemps : undefined,
      jsonObject.id !== null ? jsonObject.id : -1,
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


  set id(value: number) {
    this._id = value;
  }

  set date(value: Date) {
    this._date = value;
  }

  set heureDebut(value: Date) {
    this._heureDebut = value;
  }

  set debutRepas(value: Date) {
    this._debutRepas = value;
  }

  set finRepas(value: Date) {
    this._finRepas = value;
  }

  set heureFin(value: Date) {
    this._heureFin = value;
  }

  set horaireQuotidien(value: number) {
    this._horaireQuotidien = value;
  }

  set feuilleDeTemps(value: number) {
    this._feuilleDeTemps = value;
  }
}
