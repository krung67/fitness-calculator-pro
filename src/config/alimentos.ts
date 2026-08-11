/**
 * Base de datos de alimentos y platos del generador de dietas.
 *
 * MACROS POR 100 g EN CRUDO, salvo donde la unidad diga otra cosa. Es la
 * referencia de las etiquetas y la que usa el resto de la web: mezclarla con
 * valores en cocinado descuadraría las cantidades en torno a un 25 %.
 *
 * Son valores de referencia habituales. Varían según corte y marca, por eso
 * la página remite siempre a la etiqueta del producto.
 */

export type Etiqueta =
  | 'lacteo'
  | 'gluten'
  | 'frutos-secos'
  | 'huevo'
  | 'cerdo'
  | 'marisco'
  | 'pescado'
  | 'carne'
  | 'suplemento';

export interface Alimento {
  nombre: string;
  /** kcal, proteína, grasa y carbohidratos por 100 g (o por unidad si unidad es 'ud'). */
  kcal: number;
  p: number;
  g: number;
  c: number;
  unidad: 'g' | 'ml' | 'ud';
  etiquetas: Etiqueta[];
  /**
   * Ración máxima razonable en un solo plato. Sólo hace falta en alimentos
   * poco densos: para llegar a 800 kcal de patata harían falta más de 700 g,
   * que sale bien en la aritmética pero no se lo come nadie. Cuando el tope
   * impide alcanzar el objetivo, el plato encaja peor y el propio orden por
   * ajuste lo deja fuera de las seis opciones. No se inventa nada: se ofrece
   * otra cosa.
   */
  max?: number;
}

export const ALIMENTOS: Record<string, Alimento> = {
  // ── PROTEÍNAS ──────────────────────────────────────────────
  pollo: { nombre: 'Pechuga de pollo', kcal: 110, p: 23, g: 2, c: 0, unidad: 'g', etiquetas: ['carne'] },
  pavo: { nombre: 'Pechuga de pavo', kcal: 105, p: 24, g: 1, c: 0, unidad: 'g', etiquetas: ['carne'] },
  ternera: { nombre: 'Filete de ternera', kcal: 130, p: 21, g: 5, c: 0, unidad: 'g', etiquetas: ['carne'] },
  carnePicada: { nombre: 'Carne picada de ternera 5 %', kcal: 130, p: 21, g: 5, c: 0, unidad: 'g', etiquetas: ['carne'] },
  merluza: { nombre: 'Merluza', kcal: 80, p: 17, g: 1.5, c: 0, unidad: 'g', etiquetas: ['pescado'] },
  salmon: { nombre: 'Salmón', kcal: 200, p: 20, g: 13, c: 0, unidad: 'g', etiquetas: ['pescado'] },
  atun: { nombre: 'Atún al natural (escurrido)', kcal: 110, p: 25, g: 1, c: 0, unidad: 'g', etiquetas: ['pescado'] },
  huevo: { nombre: 'Huevo', kcal: 70, p: 6.3, g: 5, c: 0.3, unidad: 'ud', etiquetas: ['huevo'], max: 6 },
  // En gramos, no en unidades: las claras se compran en brik y se pesan.
  // Referencia por si vienes de contar huevos: una clara son unos 33 g.
  clara: { nombre: 'Clara de huevo', kcal: 52, p: 11, g: 0.2, c: 0.7, unidad: 'g', etiquetas: ['huevo'], max: 300 },
  jamonCocido: { nombre: 'Jamón cocido', kcal: 110, p: 18, g: 4, c: 1, unidad: 'g', etiquetas: ['cerdo'] },
  yogurGriego: { nombre: 'Yogur griego natural', kcal: 97, p: 9, g: 5, c: 4, unidad: 'g', etiquetas: ['lacteo'] },
  quesoBatido: { nombre: 'Queso batido 0 %', kcal: 47, p: 10, g: 0, c: 4, unidad: 'g', etiquetas: ['lacteo'] },
  requeson: { nombre: 'Requesón', kcal: 97, p: 11, g: 4, c: 3, unidad: 'g', etiquetas: ['lacteo'] },

  // Fuentes vegetales. Sin ellas no había ni un solo plato principal que
  // sobreviviera al filtro "vegetariano": la comida se quedaba vacía.
  // Legumbres en crudo, como el arroz y la pasta.
  lentejas: { nombre: 'Lentejas (en crudo)', kcal: 336, p: 24, g: 1.5, c: 52, unidad: 'g', etiquetas: [] },
  garbanzos: { nombre: 'Garbanzos (en crudo)', kcal: 360, p: 19, g: 6, c: 55, unidad: 'g', etiquetas: [] },
  // Tope en 400 g porque es el bloque que se vende: pedir 440 obliga a abrir dos.
  tofu: { nombre: 'Tofu firme', kcal: 145, p: 15, g: 9, c: 2, unidad: 'g', etiquetas: [], max: 400 },

  // ── CARBOHIDRATOS ──────────────────────────────────────────
  arroz: { nombre: 'Arroz (en crudo)', kcal: 350, p: 7, g: 0.6, c: 78, unidad: 'g', etiquetas: [] },
  pasta: { nombre: 'Pasta (en crudo)', kcal: 355, p: 12, g: 1.5, c: 71, unidad: 'g', etiquetas: ['gluten'] },
  gnocchi: { nombre: 'Gnocchi', kcal: 160, p: 4, g: 1, c: 33, unidad: 'g', etiquetas: ['gluten'], max: 350 },
  patata: { nombre: 'Patata', kcal: 77, p: 2, g: 0.1, c: 17, unidad: 'g', etiquetas: [], max: 400 },
  avena: { nombre: 'Avena', kcal: 380, p: 13, g: 7, c: 60, unidad: 'g', etiquetas: ['gluten'] },
  cremaArroz: { nombre: 'Crema de arroz de sabores', kcal: 370, p: 7, g: 1, c: 82, unidad: 'g', etiquetas: ['suplemento'] },
  cornflakes: { nombre: 'Cornflakes', kcal: 380, p: 7, g: 1, c: 84, unidad: 'g', etiquetas: ['gluten'] },
  panIntegral: { nombre: 'Pan integral', kcal: 245, p: 8, g: 3, c: 43, unidad: 'g', etiquetas: ['gluten'] },
  basePizza: { nombre: 'Base de pizza', kcal: 270, p: 8, g: 3, c: 52, unidad: 'g', etiquetas: ['gluten'] },
  panHamburguesa: { nombre: 'Pan de hamburguesa', kcal: 270, p: 9, g: 4, c: 48, unidad: 'g', etiquetas: ['gluten'] },
  // Sin gluten: era el único desayuno que quedaba al marcar esa restricción.
  tortitasArroz: { nombre: 'Tortitas de arroz', kcal: 385, p: 8, g: 3, c: 81, unidad: 'g', etiquetas: [] },
  miel: { nombre: 'Miel', kcal: 300, p: 0, g: 0, c: 82, unidad: 'g', etiquetas: [] },

  // ── FRUTA ──────────────────────────────────────────────────
  platano: { nombre: 'Plátano', kcal: 90, p: 1, g: 0.3, c: 21, unidad: 'g', etiquetas: [], max: 250 },
  manzana: { nombre: 'Manzana', kcal: 52, p: 0.3, g: 0.2, c: 14, unidad: 'g', etiquetas: [], max: 300 },
  arandanos: { nombre: 'Arándanos', kcal: 57, p: 0.7, g: 0.3, c: 14, unidad: 'g', etiquetas: [], max: 200 },
  frutosRojos: { nombre: 'Frutos rojos', kcal: 45, p: 0.8, g: 0.3, c: 10, unidad: 'g', etiquetas: [], max: 200 },

  // ── GRASAS ─────────────────────────────────────────────────
  aceite: { nombre: 'Aceite de oliva', kcal: 900, p: 0, g: 100, c: 0, unidad: 'g', etiquetas: [] },
  aguacate: { nombre: 'Aguacate', kcal: 160, p: 2, g: 15, c: 2, unidad: 'g', etiquetas: [] },
  almendras: { nombre: 'Almendras', kcal: 600, p: 21, g: 53, c: 5, unidad: 'g', etiquetas: ['frutos-secos'] },

  // ── VERDURAS (aportan poco, van a cantidad fija) ───────────
  tomate: { nombre: 'Tomate triturado', kcal: 18, p: 1, g: 0.2, c: 3, unidad: 'g', etiquetas: [], max: 250 },
  champinones: { nombre: 'Champiñones', kcal: 22, p: 3, g: 0.3, c: 1, unidad: 'g', etiquetas: [] },
  ensalada: { nombre: 'Ensalada variada', kcal: 15, p: 1, g: 0.2, c: 2, unidad: 'g', etiquetas: [], max: 200 },
  calabacin: { nombre: 'Calabacín', kcal: 17, p: 1.2, g: 0.3, c: 2, unidad: 'g', etiquetas: [] },
  pimiento: { nombre: 'Pimiento', kcal: 26, p: 1, g: 0.3, c: 5, unidad: 'g', etiquetas: [] },
  brocoli: { nombre: 'Brócoli', kcal: 34, p: 2.8, g: 0.4, c: 4, unidad: 'g', etiquetas: [] },
  cebolla: { nombre: 'Cebolla', kcal: 40, p: 1.1, g: 0.1, c: 8, unidad: 'g', etiquetas: [] },

  // ── BEBIDAS (el usuario elige cuál) ────────────────────────
  lecheEntera: { nombre: 'Leche entera', kcal: 64, p: 3.2, g: 3.6, c: 4.7, unidad: 'ml', etiquetas: ['lacteo'] },
  lecheDesnatada: { nombre: 'Leche desnatada', kcal: 35, p: 3.4, g: 0.1, c: 5, unidad: 'ml', etiquetas: ['lacteo'] },
  lecheSemi: { nombre: 'Leche semidesnatada', kcal: 46, p: 3.2, g: 1.6, c: 4.8, unidad: 'ml', etiquetas: ['lacteo'] },
  bebidaAlmendras: { nombre: 'Bebida de almendras sin azúcar', kcal: 13, p: 0.4, g: 1.1, c: 0.3, unidad: 'ml', etiquetas: ['frutos-secos'] },

  // ── SUPLEMENTOS ────────────────────────────────────────────
  whey: { nombre: 'Proteína whey', kcal: 400, p: 80, g: 6, c: 7, unidad: 'g', etiquetas: ['lacteo', 'suplemento'] },
};

/** Ingrediente de un plato. `escala` marca cuál se ajusta para cuadrar macros. */
export interface Ingrediente {
  id: keyof typeof ALIMENTOS;
  cantidad: number;
  /** 'prot' se escala para cuadrar proteína · 'carb' para cuadrar calorías · undefined = fijo */
  escala?: 'prot' | 'carb';
}

export type Momento = 'desayuno' | 'mediaManana' | 'comida' | 'merienda' | 'cena';

export interface Plato {
  id: string;
  nombre: string;
  momentos: Momento[];
  ingredientes: Ingrediente[];
  /** true si el plato depende de suplementos (whey, crema de arroz). */
  necesitaSuplementos?: boolean;
  /** true si usa la bebida elegida por el usuario. */
  usaBebida?: boolean;
  /**
   * true = solo se ofrece a quien haya marcado "vegetariano".
   *
   * Para el tofu y compañía: si no comes carne son alimentos que tienes que
   * conocer sí o sí, pero a quien come de todo no se le proponen. Hay mil
   * opciones antes, y una dieta que sugiere algo que no te vas a comer es una
   * dieta que se abandona el primer día.
   */
  soloVegetariano?: boolean;
  nota?: string;
}

/**
 * Platos. Incluye deliberadamente pizza y hamburguesa: una dieta que no
 * permite comer nada apetecible se abandona, y esa es la causa número uno
 * de fracaso.
 */
export const PLATOS: Plato[] = [
  // ── DESAYUNOS ──────────────────────────────────────────────
  // Estos dos son sin gluten: antes, marcar "sin gluten" dejaba el desayuno
  // con una sola opción, porque avena, pan y cornflakes lo llevan todos.
  {
    id: 'huevos-patata',
    nombre: 'Huevos revueltos con patata y tomate',
    momentos: ['desayuno', 'cena'],
    ingredientes: [
      { id: 'huevo', cantidad: 3, escala: 'prot' },
      { id: 'patata', cantidad: 200, escala: 'carb' },
      { id: 'tomate', cantidad: 80 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'tortitas-arroz-pavo',
    nombre: 'Tortitas de arroz con pavo y aguacate',
    momentos: ['desayuno', 'mediaManana', 'merienda'],
    ingredientes: [
      { id: 'pavo', cantidad: 80, escala: 'prot' },
      { id: 'tortitasArroz', cantidad: 40, escala: 'carb' },
      { id: 'aguacate', cantidad: 30 },
      { id: 'tomate', cantidad: 60 },
    ],
  },
  {
    id: 'avena-proteina',
    nombre: 'Avena con proteína y frutos rojos',
    momentos: ['desayuno', 'merienda'],
    necesitaSuplementos: true,
    usaBebida: true,
    ingredientes: [
      { id: 'avena', cantidad: 60, escala: 'carb' },
      { id: 'whey', cantidad: 30, escala: 'prot' },
      { id: 'frutosRojos', cantidad: 80 },
      { id: 'lecheDesnatada', cantidad: 200 },
    ],
    nota: 'La proteína de sabores hace que sepa a postre. Es lo que quita el antojo de dulce en definición.',
  },
  {
    id: 'crema-arroz-proteina',
    nombre: 'Crema de arroz con proteína',
    momentos: ['desayuno', 'merienda'],
    necesitaSuplementos: true,
    usaBebida: true,
    ingredientes: [
      { id: 'cremaArroz', cantidad: 60, escala: 'carb' },
      { id: 'whey', cantidad: 30, escala: 'prot' },
      { id: 'lecheDesnatada', cantidad: 250 },
    ],
    nota: 'Mezclada con bebida de almendras sale más rica y con menos calorías.',
  },
  {
    id: 'cornflakes-miel',
    nombre: 'Cornflakes con miel y proteína',
    momentos: ['desayuno'],
    necesitaSuplementos: true,
    usaBebida: true,
    ingredientes: [
      { id: 'cornflakes', cantidad: 60, escala: 'carb' },
      { id: 'whey', cantidad: 25, escala: 'prot' },
      { id: 'miel', cantidad: 15 },
      { id: 'lecheDesnatada', cantidad: 250 },
    ],
  },
  {
    id: 'tostadas-huevo',
    nombre: 'Tostadas con huevo revuelto',
    momentos: ['desayuno', 'cena'],
    ingredientes: [
      { id: 'panIntegral', cantidad: 70, escala: 'carb' },
      { id: 'huevo', cantidad: 2, escala: 'prot' },
      { id: 'tomate', cantidad: 50 },
      { id: 'aceite', cantidad: 5 },
    ],
  },
  {
    id: 'tostadas-pavo',
    nombre: 'Tostadas con pavo y tomate',
    momentos: ['desayuno', 'merienda'],
    ingredientes: [
      { id: 'panIntegral', cantidad: 70, escala: 'carb' },
      { id: 'pavo', cantidad: 80, escala: 'prot' },
      { id: 'tomate', cantidad: 50 },
      { id: 'aceite', cantidad: 5 },
    ],
  },
  {
    id: 'yogur-avena',
    nombre: 'Yogur griego con avena y arándanos',
    momentos: ['desayuno', 'merienda'],
    ingredientes: [
      { id: 'yogurGriego', cantidad: 200, escala: 'prot' },
      { id: 'avena', cantidad: 50, escala: 'carb' },
      { id: 'arandanos', cantidad: 80 },
      { id: 'miel', cantidad: 10 },
    ],
  },
  {
    id: 'tortitas-avena',
    nombre: 'Tortitas de avena y clara',
    momentos: ['desayuno', 'merienda'],
    ingredientes: [
      { id: 'avena', cantidad: 60, escala: 'carb' },
      { id: 'clara', cantidad: 130, escala: 'prot' },
      { id: 'platano', cantidad: 80 },
      { id: 'miel', cantidad: 10 },
    ],
  },
  {
    // El desayuno que se hace Enrique. La versión completa de las tortitas:
    // el huevo entero da estructura, la proteína en polvo sube el aporte sin
    // añadir volumen y la fruta va por encima, no dentro de la masa.
    id: 'tortitas-proteina',
    nombre: 'Tortitas de avena y proteína',
    momentos: ['desayuno', 'merienda'],
    necesitaSuplementos: true,
    ingredientes: [
      { id: 'avena', cantidad: 60, escala: 'carb' },
      { id: 'clara', cantidad: 130, escala: 'prot' },
      { id: 'huevo', cantidad: 1 },
      { id: 'whey', cantidad: 30 },
      { id: 'frutosRojos', cantidad: 60 },
      { id: 'miel', cantidad: 10 },
    ],
    nota: 'La avena vale en copos o en harina, da igual. La fruta y la miel van de topping por encima, no dentro de la masa: quedan mucho mejor y controlas la cantidad.',
  },

  // ── COMIDAS ────────────────────────────────────────────────
  // Los cuatro primeros son vegetarianos a propósito: sin ellos, marcar
  // "vegetariano" dejaba la comida del mediodía sin ninguna opción.
  {
    id: 'lentejas-arroz',
    nombre: 'Lentejas con arroz y verduras',
    momentos: ['comida'],
    ingredientes: [
      { id: 'lentejas', cantidad: 100, escala: 'prot' },
      { id: 'arroz', cantidad: 40, escala: 'carb' },
      { id: 'cebolla', cantidad: 60 },
      { id: 'pimiento', cantidad: 80 },
      { id: 'aceite', cantidad: 8 },
    ],
    nota: 'Legumbre y arroz juntos completan el perfil de aminoácidos. Es el plato vegetariano con mejor relación proteína-precio.',
  },
  {
    id: 'garbanzos-verdura',
    nombre: 'Garbanzos con verduras y patata',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'garbanzos', cantidad: 100, escala: 'prot' },
      { id: 'patata', cantidad: 200, escala: 'carb' },
      { id: 'brocoli', cantidad: 120 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'tofu-arroz',
    nombre: 'Tofu salteado con arroz',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'tofu', cantidad: 200, escala: 'prot' },
      { id: 'arroz', cantidad: 80, escala: 'carb' },
      { id: 'calabacin', cantidad: 120 },
      { id: 'aceite', cantidad: 8 },
    ],
    soloVegetariano: true,
    nota: 'Escurre bien el tofu y dóralo a fuego fuerte: la diferencia de sabor con el tofu hervido es enorme.',
  },
  {
    id: 'tortilla-patata',
    nombre: 'Tortilla de patata y cebolla',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'huevo', cantidad: 3, escala: 'prot' },
      { id: 'patata', cantidad: 250, escala: 'carb' },
      { id: 'cebolla', cantidad: 60 },
      { id: 'aceite', cantidad: 10 },
    ],
    nota: 'Hecha en sartén antiadherente con poco aceite entra en cualquier déficit.',
  },
  {
    id: 'pollo-arroz',
    nombre: 'Pollo con arroz y verdura',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'pollo', cantidad: 180, escala: 'prot' },
      { id: 'arroz', cantidad: 80, escala: 'carb' },
      { id: 'pimiento', cantidad: 100 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'ternera-patata',
    nombre: 'Ternera con patata al horno',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'ternera', cantidad: 180, escala: 'prot' },
      { id: 'patata', cantidad: 300, escala: 'carb' },
      { id: 'ensalada', cantidad: 100 },
      { id: 'aceite', cantidad: 8 },
    ],
    nota: 'La patata en air fryer queda perfecta con especias y sin aceite extra.',
  },
  {
    id: 'pasta-atun',
    nombre: 'Pasta con atún y tomate',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'pasta', cantidad: 80, escala: 'carb' },
      { id: 'atun', cantidad: 150, escala: 'prot' },
      { id: 'tomate', cantidad: 150 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'gnocchis-pollo',
    nombre: 'Gnocchis con pollo y champiñones',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'gnocchi', cantidad: 250, escala: 'carb' },
      { id: 'pollo', cantidad: 170, escala: 'prot' },
      { id: 'champinones', cantidad: 120 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'pizza-casera',
    nombre: 'Pizza casera de jamón y champiñones',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'basePizza', cantidad: 130, escala: 'carb' },
      { id: 'jamonCocido', cantidad: 100, escala: 'prot' },
      { id: 'tomate', cantidad: 80 },
      { id: 'champinones', cantidad: 80 },
    ],
    nota: 'Base congelada, tomate triturado, champiñones y jamón cocido. Sale muy bien de macros y quita las ganas de pedir una fuera.',
  },
  {
    id: 'hamburguesa-casera',
    nombre: 'Hamburguesa casera con patata',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'carnePicada', cantidad: 150, escala: 'prot' },
      { id: 'panHamburguesa', cantidad: 80 },
      { id: 'patata', cantidad: 250, escala: 'carb' },
      { id: 'tomate', cantidad: 40 },
      { id: 'cebolla', cantidad: 30 },
    ],
    nota: 'Con salsas cero y especias entra perfectamente en una definición.',
  },
  {
    id: 'salmon-arroz',
    nombre: 'Salmón con arroz',
    momentos: ['comida'],
    ingredientes: [
      { id: 'salmon', cantidad: 150, escala: 'prot' },
      { id: 'arroz', cantidad: 70, escala: 'carb' },
      { id: 'brocoli', cantidad: 150 },
    ],
  },
  {
    id: 'merluza-patata',
    nombre: 'Merluza con patata y verdura',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'merluza', cantidad: 200, escala: 'prot' },
      { id: 'patata', cantidad: 280, escala: 'carb' },
      { id: 'calabacin', cantidad: 150 },
      { id: 'aceite', cantidad: 8 },
    ],
  },
  {
    id: 'pavo-arroz',
    nombre: 'Pavo con arroz y pimiento',
    momentos: ['comida', 'cena'],
    ingredientes: [
      { id: 'pavo', cantidad: 180, escala: 'prot' },
      { id: 'arroz', cantidad: 80, escala: 'carb' },
      { id: 'pimiento', cantidad: 120 },
      { id: 'aceite', cantidad: 8 },
    ],
  },

  // ── CENAS ──────────────────────────────────────────────────
  {
    id: 'bocadillo-huevo',
    nombre: 'Bocadillo de huevo',
    momentos: ['cena', 'merienda'],
    ingredientes: [
      { id: 'panIntegral', cantidad: 100, escala: 'carb' },
      { id: 'huevo', cantidad: 3, escala: 'prot' },
      { id: 'tomate', cantidad: 50 },
    ],
    nota: 'Sí, un bocadillo entra en una definición. Es cuestión de que cuadren las calorías.',
  },
  {
    id: 'tortilla-pavo',
    nombre: 'Tortilla de claras con pavo',
    momentos: ['cena'],
    ingredientes: [
      { id: 'clara', cantidad: 200, escala: 'prot' },
      { id: 'pavo', cantidad: 80 },
      { id: 'patata', cantidad: 200, escala: 'carb' },
      { id: 'aceite', cantidad: 5 },
    ],
  },
  {
    id: 'ensalada-pollo',
    nombre: 'Ensalada de pollo',
    momentos: ['cena', 'comida'],
    ingredientes: [
      { id: 'pollo', cantidad: 180, escala: 'prot' },
      { id: 'ensalada', cantidad: 150 },
      { id: 'tomate', cantidad: 100 },
      { id: 'panIntegral', cantidad: 60, escala: 'carb' },
      { id: 'aceite', cantidad: 10 },
    ],
  },
  {
    id: 'revuelto-champinones',
    nombre: 'Revuelto de champiñones y jamón',
    momentos: ['cena'],
    ingredientes: [
      { id: 'huevo', cantidad: 3, escala: 'prot' },
      { id: 'jamonCocido', cantidad: 60 },
      { id: 'champinones', cantidad: 150 },
      { id: 'panIntegral', cantidad: 60, escala: 'carb' },
    ],
  },

  // ── MERIENDAS ──────────────────────────────────────────────
  // Casi todas las meriendas eran lácteas: al marcar "sin lactosa" quedaba
  // prácticamente una. Esta no lleva lácteo, ni gluten, ni carne.
  {
    id: 'manzana-almendras',
    nombre: 'Manzana con almendras',
    momentos: ['mediaManana', 'merienda'],
    ingredientes: [
      { id: 'manzana', cantidad: 180, escala: 'carb' },
      { id: 'almendras', cantidad: 25 },
    ],
    nota: 'La opción de mochila: no necesita nevera ni preparación.',
  },
  {
    id: 'batido-platano',
    nombre: 'Batido de proteína con plátano',
    momentos: ['merienda', 'mediaManana'],
    necesitaSuplementos: true,
    usaBebida: true,
    ingredientes: [
      { id: 'whey', cantidad: 30, escala: 'prot' },
      { id: 'platano', cantidad: 120, escala: 'carb' },
      { id: 'lecheDesnatada', cantidad: 250 },
    ],
  },
  {
    id: 'yogur-arandanos',
    nombre: 'Yogur griego con arándanos',
    momentos: ['merienda', 'mediaManana'],
    ingredientes: [
      { id: 'yogurGriego', cantidad: 200, escala: 'prot' },
      { id: 'arandanos', cantidad: 100 },
      { id: 'miel', cantidad: 15, escala: 'carb' },
    ],
  },
  {
    id: 'requeson-miel',
    nombre: 'Requesón con miel y manzana',
    momentos: ['merienda', 'mediaManana'],
    ingredientes: [
      { id: 'requeson', cantidad: 200, escala: 'prot' },
      { id: 'manzana', cantidad: 150, escala: 'carb' },
      { id: 'miel', cantidad: 10 },
    ],
  },
  {
    id: 'queso-batido-fruta',
    nombre: 'Queso batido con frutos rojos',
    momentos: ['merienda', 'mediaManana'],
    ingredientes: [
      { id: 'quesoBatido', cantidad: 250, escala: 'prot' },
      { id: 'frutosRojos', cantidad: 120 },
      { id: 'avena', cantidad: 30, escala: 'carb' },
    ],
  },
  {
    id: 'manzana-pavo',
    nombre: 'Manzana con tostada de pavo',
    momentos: ['merienda', 'mediaManana'],
    ingredientes: [
      { id: 'panIntegral', cantidad: 50, escala: 'carb' },
      { id: 'pavo', cantidad: 70, escala: 'prot' },
      { id: 'manzana', cantidad: 180 },
    ],
  },
];

/** Restricciones que puede marcar el usuario y qué etiquetas descartan. */
/**
 * Cada opción se marca para QUITAR ese alimento de la dieta. Los nombres van
 * en primera persona y empiezan por un verbo a propósito: la lista anterior
 * decía sólo "Vegetariano" bajo el título "qué no puedes comer", y se leía
 * como "no puedo comer vegetariano". `ayuda` es la explicación que va debajo
 * de cada casilla en la página.
 */
export const RESTRICCIONES: {
  id: string;
  nombre: string;
  ayuda: string;
  excluye: Etiqueta[];
}[] = [
  {
    id: 'vegetariano',
    nombre: 'No como carne ni pescado',
    ayuda: 'Tu proteína saldrá de huevo, lácteos, legumbres y tofu.',
    excluye: ['carne', 'pescado', 'cerdo', 'marisco'],
  },
  {
    id: 'sinLactosa',
    nombre: 'Quita la leche y los lácteos',
    ayuda: 'Fuera yogur, requesón y queso batido. Elige bebida de almendras en el paso anterior.',
    excluye: ['lacteo'],
  },
  {
    id: 'sinGluten',
    nombre: 'Quita el gluten',
    ayuda: 'Fuera pan, pasta, avena y cereales. Se sustituyen por arroz, patata y tortitas de arroz.',
    excluye: ['gluten'],
  },
  {
    id: 'sinFrutosSecos',
    nombre: 'Quita los frutos secos',
    ayuda: 'Fuera almendras y bebida de almendras.',
    excluye: ['frutos-secos'],
  },
  {
    id: 'sinHuevo',
    nombre: 'Quita el huevo',
    ayuda: 'Fuera tortillas, revueltos y tortitas de avena.',
    excluye: ['huevo'],
  },
  {
    id: 'sinCerdo',
    nombre: 'Quita el cerdo',
    ayuda: 'Fuera jamón cocido. Útil si no comes cerdo por religión o por gusto.',
    excluye: ['cerdo'],
  },
  {
    id: 'sinPescado',
    nombre: 'Quita el pescado y el marisco',
    ayuda: 'Fuera merluza, salmón y atún.',
    excluye: ['pescado', 'marisco'],
  },
];

/** Reparto de calorías por comida según cuántas haga el usuario. */
export const REPARTOS: Record<number, { momento: Momento; nombre: string; pct: number }[]> = {
  2: [
    { momento: 'comida', nombre: 'Comida', pct: 0.5 },
    { momento: 'cena', nombre: 'Cena', pct: 0.5 },
  ],
  3: [
    { momento: 'desayuno', nombre: 'Desayuno', pct: 0.3 },
    { momento: 'comida', nombre: 'Comida', pct: 0.4 },
    { momento: 'cena', nombre: 'Cena', pct: 0.3 },
  ],
  // El reparto recomendado: cuatro comidas, con merienda.
  4: [
    { momento: 'desayuno', nombre: 'Desayuno', pct: 0.25 },
    { momento: 'comida', nombre: 'Comida', pct: 0.35 },
    { momento: 'merienda', nombre: 'Merienda', pct: 0.15 },
    { momento: 'cena', nombre: 'Cena', pct: 0.25 },
  ],
  5: [
    { momento: 'desayuno', nombre: 'Desayuno', pct: 0.22 },
    { momento: 'mediaManana', nombre: 'Media mañana', pct: 0.1 },
    { momento: 'comida', nombre: 'Comida', pct: 0.31 },
    { momento: 'merienda', nombre: 'Merienda', pct: 0.14 },
    { momento: 'cena', nombre: 'Cena', pct: 0.23 },
  ],
};

/**
 * Bebidas, ordenadas de más a menos calorías. Lo que las diferencia es la
 * grasa: la proteína apenas cambia entre las tres leches. `porVaso` es la
 * referencia de 250 ml que se enseña en la tabla de la página.
 */
export const BEBIDAS = [
  { id: 'lecheEntera', nombre: 'Leche entera', porVaso: 160, nota: 'La más calórica: 3,6 % de grasa.' },
  { id: 'lecheSemi', nombre: 'Leche semidesnatada', porVaso: 115, nota: 'El término medio, 1,6 % de grasa.' },
  { id: 'lecheDesnatada', nombre: 'Leche desnatada', porVaso: 88, nota: 'Casi sin grasa y con la misma proteína que la entera.' },
  { id: 'bebidaAlmendras', nombre: 'Bebida de almendras sin azúcar', porVaso: 33, nota: 'La que menos calorías tiene con diferencia, pero casi no aporta proteína.' },
] as const;
