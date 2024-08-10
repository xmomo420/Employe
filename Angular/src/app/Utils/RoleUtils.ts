export class RoleUtils {
  public static roleToString(role: string) : string {
    switch (role) {
      case "ASSOCIE":
        return "Associé";
      case "GERANT":
        return "Gérant";
      case "ADJOINT":
        return "Adjoint";
      default:
        return "Inconnu";
    }
  }
}
