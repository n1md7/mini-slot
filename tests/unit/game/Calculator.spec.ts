import { describe, expect, it } from 'vitest';
import { Calculator } from '/src/game/Calculator';
import { Block } from '/src/game/components/reels/components/Block';
import { IMAGE_ASSET } from '/src/game/enums';
import { Texture } from 'pixi.js';
import BARx1 from '/images/1xBAR.png';
import BARx2 from '/images/2xBAR.png';
import BARx3 from '/images/3xBAR.png';
import Seven from '/images/Seven.png';
import Cherry from '/images/Cherry.png';

describe('Calculator', () => {
  describe('[BARx1, BARx1, BARx1]', () => {
    // Arrange
    const block01 = new Block(Texture.from(BARx1), IMAGE_ASSET.BARx1, 0);
    const block02 = new Block(Texture.from(BARx1), IMAGE_ASSET.BARx1, 0);
    const block03 = new Block(Texture.from(BARx1), IMAGE_ASSET.BARx1, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(10);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(10);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(10);
    });
  });

  describe('[BARx2, BARx2, BARx2]', () => {
    // Arrange
    const block01 = new Block(Texture.from(BARx2), IMAGE_ASSET.BARx2, 0);
    const block02 = new Block(Texture.from(BARx2), IMAGE_ASSET.BARx2, 0);
    const block03 = new Block(Texture.from(BARx2), IMAGE_ASSET.BARx2, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(20);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(20);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(20);
    });
  });

  describe('[BARx3, BARx3, BARx3]', () => {
    // Arrange
    const block01 = new Block(Texture.from(BARx3), IMAGE_ASSET.BARx3, 0);
    const block02 = new Block(Texture.from(BARx3), IMAGE_ASSET.BARx3, 0);
    const block03 = new Block(Texture.from(BARx3), IMAGE_ASSET.BARx3, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(50);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(50);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(50);
    });
  });

  describe('[BARx1, BARx2, BARx3]', () => {
    // Arrange
    const block01 = new Block(Texture.from(BARx1), IMAGE_ASSET.BARx1, 0);
    const block02 = new Block(Texture.from(BARx2), IMAGE_ASSET.BARx2, 0);
    const block03 = new Block(Texture.from(BARx3), IMAGE_ASSET.BARx3, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(5);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(5);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(5);
    });
  });

  describe('[Chery, Cherry, Cherry]', () => {
    // Arrange
    const block01 = new Block(Texture.from(Cherry), IMAGE_ASSET.CHERRY, 0);
    const block02 = new Block(Texture.from(Cherry), IMAGE_ASSET.CHERRY, 0);
    const block03 = new Block(Texture.from(Cherry), IMAGE_ASSET.CHERRY, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(2000);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(1000);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(4000);
    });
  });

  describe('[Seven, Seven, Seven]', () => {
    // Arrange
    const block01 = new Block(Texture.from(Seven), IMAGE_ASSET.SEVEN, 0);
    const block02 = new Block(Texture.from(Seven), IMAGE_ASSET.SEVEN, 0);
    const block03 = new Block(Texture.from(Seven), IMAGE_ASSET.SEVEN, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(150);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(450);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(300);
    });
  });

  describe('[Seven, Seven, Cherry]', () => {
    // Arrange
    const block01 = new Block(Texture.from(Seven), IMAGE_ASSET.SEVEN, 0);
    const block02 = new Block(Texture.from(Seven), IMAGE_ASSET.SEVEN, 0);
    const block03 = new Block(Texture.from(Cherry), IMAGE_ASSET.CHERRY, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(75);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(75);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(75);
    });
  });
});