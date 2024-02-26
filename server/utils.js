/**
 * Détermine si des coordonées sont valides pour notre grilles
 */
export function isValidCoordinate({ x, y }, gridSize) {
  if (y < 0 || y >= gridSize) return false;
  if (x < 0 || x >= gridSize) return false;
  return true;
}

/**
 * Détermine si des coordonées correspondent à une case vide
 */
export function isCoordinateEmpty({ x, y }, grid) {
  return grid[y][x] == null;
}

/**
 * Retourne un nombre aléatoire en min et max.
 * @returns
 */
export function random(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min) + min;
}

/**
 * Retourne une élément aléatoire dans un Array
 * @param {*} arr
 * @returns
 */
export function getRandArray(arr) {
  return arr[Math.floor(random(arr.length))];
}

/**
 * Retourne une petite chaîne de charactère aléatoire.
 */
export function randomIdentifier() {
  return Math.random().toString(16).slice(2, 4);
}

/**
 * Crée un Array 2D (Grille) de taille 'size'
 * @returns
 */
export function emptyGrid(size) {
  return Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => null);
  });
}
