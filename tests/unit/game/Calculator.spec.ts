import { describe, expect, it } from 'vitest';
import { Calculator } from '/src/game/Calculator';
import { Block } from '/src/game/components/reels/components/Block';
import { IMAGE_ASSET } from '/src/game/enums';
import { Texture } from 'pixi.js';

const image = Texture.from('BARx1.png') as unknown as HTMLImageElement;

describe('Calculator', () => {
  describe('[BARx1, BARx1, BARx1]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.BARx1, 0);
    const block02 = new Block(image, IMAGE_ASSET.BARx1, 0);
    const block03 = new Block(image, IMAGE_ASSET.BARx1, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(4);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(4);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(4);
    });
  });

  describe('[BARx2, BARx2, BARx2]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.BARx2, 0);
    const block02 = new Block(image, IMAGE_ASSET.BARx2, 0);
    const block03 = new Block(image, IMAGE_ASSET.BARx2, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(8);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(8);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(8);
    });
  });

  describe('[BARx3, BARx3, BARx3]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.BARx3, 0);
    const block02 = new Block(image, IMAGE_ASSET.BARx3, 0);
    const block03 = new Block(image, IMAGE_ASSET.BARx3, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(16);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(16);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(16);
    });
  });

  describe('[BARx1, BARx2, BARx3]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.BARx1, 0);
    const block02 = new Block(image, IMAGE_ASSET.BARx2, 0);
    const block03 = new Block(image, IMAGE_ASSET.BARx3, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(2);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(2);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(2);
    });
  });

  describe('[Chery, Cherry, Cherry]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.CHERRY, 0);
    const block02 = new Block(image, IMAGE_ASSET.CHERRY, 0);
    const block03 = new Block(image, IMAGE_ASSET.CHERRY, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(512);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(256);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(512 + 256);
    });
  });

  describe('[Seven, Seven, Seven]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.SEVEN, 0);
    const block02 = new Block(image, IMAGE_ASSET.SEVEN, 0);
    const block03 = new Block(image, IMAGE_ASSET.SEVEN, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(1 * 128);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(3 * 128);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(2 * 128);
    });
  });

  describe('[Seven, Seven, Cherry]', () => {
    // Arrange
    const block01 = new Block(image, IMAGE_ASSET.SEVEN, 0);
    const block02 = new Block(image, IMAGE_ASSET.SEVEN, 0);
    const block03 = new Block(image, IMAGE_ASSET.CHERRY, 0);

    const calculator = new Calculator();

    it('should calculate TOP line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Top');

      // Assert
      expect(result).toBe(64);
    });

    it('should calculate MIDDLE line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Middle');

      // Assert
      expect(result).toBe(64);
    });

    it('should calculate BOTTOM line', () => {
      // Act
      const result = calculator.calculate([block01, block02, block03], 'Bottom');

      // Assert
      expect(result).toBe(64);
    });
  });
});
