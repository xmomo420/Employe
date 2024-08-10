export class DateUtils {

  public static joursSemaine: { [key: string]: string } = {
    0: "Lundi",
    1: "Mardi",
    2: "Mercredi",
    3: "Jeudi",
    4: "Vendredi",
    5: "Samedi",
    6: "Dimanche"
  };

  public static getDateByJourSemaine(jourSemaine: number, dateDebut: Date): Date {
    const nouvelleDate = new Date(dateDebut);
    nouvelleDate.setDate(nouvelleDate.getDate() + jourSemaine);
    return nouvelleDate;
  }

  public static getJoursSemaineKeys(): number[] {
    return Object.keys(this.joursSemaine).map(Number);
  }

  public static moisToString(mois: number): string {
    switch (mois) {
      case 0:
        return "janvier";
      case 1:
        return "février";
      case 2:
        return "mars";
      case 3:
        return "avril";
      case 4:
        return "mai";
      case 5:
        return "juin";
      case 6:
        return "juillet";
      case 7:
        return "août";
      case 8:
        return "septembre";
      case 9:
        return "octobre";
      case 10:
        return "novembre";
      case 11:
        return "décembre";
      default:
        return "";
    }
  }

  public static formatterDate(date?: Date): string {
    if (date) {
      const dateParam = new Date(date);
      return dateParam.getDate() + " " + this.moisToString(dateParam.getMonth());
    }
    return "";
  }


}
