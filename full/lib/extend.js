/**
 * Базовый класс для наследования.
 * Также позволяет реализовать множественное наследование.
 * Использование:
 * function MyClass(arg1, arg2) {
 *     ExtClass.call(this, {
 *     MyParentClass1: [arg1], // родительский класс 1 с параметрами
 *     MyParentClass2: [arg2], // родительский класс 2
 *     MyParentClass3: [arg1, arg2], // и так далее
 *     ...
 *   });
 *
 *   // далее можно реализовывать собственные методы или переписывать
 *   // родительские
 * }
 *
 * После такого вызова ваш класс MyClass унаследует все методы и свойства
 * родительских классов MyParentClass1 и т.д.
 * Если оба класса имеют методы с одинаковым именем, то MyClass
 * унаследует в качестве своего метода последний из перечисленных
 * в вызове родительских классов.
 * Однако к любому методу любого из родительских классов всегда можно
 * обратиться посредством следующей конструкции:
 * this.$super['MyParentClassName'].methodName.call(this, ...args...);
 * так как методы всех родителей будут занесены в this.$super
 */
function ExtClass(supers) {
  // переменная для хранения методов родительских классов
  // здесь будут числится не только прямые предки (родительские классы, 
  // перечисленные при вызове), но и их предки тоже
  this.$super = this.$super ? this.$super : {};

  // переменная для хранения массива имен родительских классов
  // для реализации метода this.instanceOf()
  this.$_parents = this.$_parents ? this.$_parents : [];

  /**
   * Проверка, является ли объект объектом заданного класса
   * @param string className Имя класса для проверки
   * @returns boolean TRUE если является, иначе FALSE
   */
  this.instanceOf = function(className) {
    return (__inArray(className, this.$_parents) || (this instanceof eval(className)));
  };

  /**
   * Приватная функция для добавления родительского класса.
   * Методы род. класса могут быть вызваны так: 
   * this.$super['parenClassName'].method.call(this, ...args...);
   * @param object that Обертка для this объекта
   * @param string className Имя класса
   */
  function __addSuper(that, className) {
    var obj = new (eval(className));
    that.$super[className] = {};
    if (!__inArray(className, that.$_parents)) that.$_parents.push(className);
    for (var i in obj) {
      if (typeof obj[i] == 'function') {
        that.$super[className][i] = obj[i];
      }
    }
  };

  /**
   * Приватная функция для проверки на наличие элемента в масиве
   * @param mixed value Искомое значение
   * @param array arraySeek Массив поиска
   * @returns boolean TRUE если найдено, иначе FALSE
   */
  function __inArray(value, arraySeek) {
    if (arraySeek && arraySeek.length) {
      for (var i in arraySeek) {
        if (arraySeek[i] == value) return true;
      }
    }
    return false;
  };

  // основной цикл добавления родительских классов
  for (var i in supers) {
    var className = i;
    var args = supers[i];
    (eval(className)).apply(this, args);
    __addSuper(this, className);
  }
};