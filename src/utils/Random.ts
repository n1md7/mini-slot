export class Random {
  /**
   * The maximum is exclusive and the minimum is inclusive
   */
  public static int(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Shuffles the array by mutating the original value
   */
  public static shuffleList<T = unknown>(list: T[]): T[] {
    for (let ci = 0; ci < list.length; ci++) {
      const ri = Random.int(ci + 1, list.length - 1);

      [list[ri], list[ci]] = [list[ci], list[ri]];
    }

    return list;
  }
}
