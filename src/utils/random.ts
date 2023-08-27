import { IMAGE_ASSET } from '/src/game/enums';

type PickRandomYieldType<T = IMAGE_ASSET> = {
  val: T;
  idx: number;
};

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

  /**
   * Forges a new random array from the list with non-repeating neighbouring characters
   */
  public static pick<T = unknown>(list: T[], size = 30): PickRandomYieldType<T>[] {
    const bucket: PickRandomYieldType<T>[] = [];
    const iterator = Random.pickRandom<T>(list);
    let next = iterator.next();
    while (bucket.length < size && next.value) {
      bucket.push(next.value);
      next = iterator.next();
    }

    return bucket;
  }

  public static *pickRandom<T = unknown>(list: T[]) {
    let itemIdx = 0;
    let shallowCopy = Array.from(list);

    while (true) {
      if (shallowCopy.length === 0) shallowCopy = Array.from(list);

      const index = Random.int(0, shallowCopy.length);
      const item = shallowCopy[index];
      shallowCopy.splice(index, 1);

      yield {
        val: item,
        idx: itemIdx++,
      };
    }
  }
}
