class MockDB {
  #tables: { [index: string]: any }
  #factories: { [index: string]: any }

  static instance: any //?

  constructor() {
    this.reset()
    this.#tables = {}
    this.#factories = {}

    if (typeof MockDB.instance === 'object') {
      return MockDB.instance
    }

    MockDB.instance = this
    return this
  }

  get tables() {
    return this.#tables
  }

  get factories() {
    return this.#factories
  }

  /**
   * Indicar que valores por defecto tendran los atributos de los objectos de esa tabla
   * @param {string} tableName - Nombre de la tabla
   * @param {object} attributes - Valor por defecto al crear un nuevo elemento
   */
  addFactory(tableName: string, attributes: object) {
    this.#factories[tableName] = attributes
  }

  /**
   * Añadir datos a una tabla
   * @param {string} tableName - Nombre de la tabla
   * @param {number} iterations - Número de entradas del objeto
   * @param {object} value - Valores a insertar
   * @returns {Array} Elementos insertados
   */
  addSeed(tableName: string, iterations = 1, value = {}): Array<any> {
    if (!(tableName in this.#tables)) {
      this.#tables[tableName] = []
    }

    const existingFactory = this.#factories[tableName] ?? {}
    const isDynamicFactory = typeof existingFactory === 'function'

    const newItems = []
    const maxId = this.#getMaxValue(tableName, 'id')
    for (let i = 1; i <= iterations; i += 1) {
      const factoryValues = isDynamicFactory ? existingFactory(maxId + i) : existingFactory
      const current = { ...factoryValues, ...value }

      newItems.push(current)
      this.#tables[tableName].push(current)
    }

    return newItems
  }

  /**
   * Buscar datos en la bd un valor
   * @param {string} tableName
   * @param {string} key
   * @param {object} value
   * @returns {object|undefined} Elemento coincidente
   */
  find(tableName: string, key: string, value: any): any {
    if (!(tableName in this.#tables)) return undefined

    return this.#tables[tableName].find((item: any) => key in item && item[key] === value)
  }

  /**
   * Buscar datos en la bd varios valores
   * @param {string} tableName
   * @param {string} key
   * @param {object} value
   * @returns {Array} Elementos coincidentes
   */
  filter(tableName: string, key: string, value: string | number | boolean): Array<any> {
    if (!(tableName in this.#tables)) return []

    return this.#tables[tableName].filter((item: any) => key in item && item[key] === value)
  }

  /**
   * Buscar todos los datos de la tabla en la bd
   * @param {string} tableName
   * @returns {Array} Elementos coincidentes
   */
  all(tableName: string): Array<any> {
    if (!(tableName in this.#tables)) return []

    return this.#tables[tableName] ?? []
  }

  /**
   * Buscar todos los datos de la tabla en la bd
   * @param {string} tableName
   * @returns {Array} Elementos coincidentes
   */
  reset() {
    this.#tables = {}
    this.#factories = {}
  }

  /**
   * Obtener el mayor valor de un atributo entre los elemento de una tabla en especifico
   * @param {string} tableName Nombre de la tabla
   * @param {string} attributeName Nombre del atributo
   * @returns {number} El valor más alto
   */
  #getMaxValue(tableName: string, attributeName: string) {
    if (!(tableName in this.#tables)) return 0

    if (!this.#tables[tableName].length) return 0

    if (!this.#tables[tableName][0][attributeName]) return 0

    const values = this.#tables[tableName].map((item: any) => item[attributeName]) ?? [0]
    return Math.max(...values)
  }
}

export default new MockDB()
