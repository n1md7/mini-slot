export class Casino {
  private casinoFortune = 100_000_000;

  add(amount: number): void {
    console.log(`deposit: ${amount}`);
    this.casinoFortune += amount;
    return void 0;
  }

  remove(amount: number): void {
    console.log(`withdraw: ${amount}`);
    this.casinoFortune -= amount;

    return void 0;
  }
}

export class User {
  private money = 100;

  deposit(amount: number): void {
    console.log(`deposit: ${amount}`);
    this.money += amount;
    return void 0;
  }

  withdraw(amount: number): void {
    console.log(`withdraw: ${amount}`);
    this.money -= amount;

    return void 0;
  }
}
