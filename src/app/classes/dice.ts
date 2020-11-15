export class Dice {

  public static generateD2Dice(): number {
    return this.generateRandomNumber(2, 1);
  }

  public static generateD4Dice(): number {
    return this.generateRandomNumber(4, 1);
  }

  public static generateD6Dice(): number {
    return this.generateRandomNumber(6, 1);
  }

  public static generateD8Dice(): number {
    return this.generateRandomNumber(8, 1);
  }

  public static generateD10Dice(): number {
    return this.generateRandomNumber(10, 1);
  }

  public static generateD12Dice(): number {
    return this.generateRandomNumber(12, 1);
  }

  public static generateD20Dice(): number {
    return this.generateRandomNumber(20, 1);
  }

  public static generateD100Dice(): number {
    return this.generateRandomNumber(10, 1) * 10;
  }

  private static generateRandomNumber(max: number, min: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

}
