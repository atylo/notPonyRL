/**
 * ������� ����� ��� ������������.
 * ����� ��������� ����������� ������������� ������������.
 * �������������:
 * function MyClass(arg1, arg2) {
 *     ExtClass.call(this, {
 *     MyParentClass1: [arg1], // ������������ ����� 1 � �����������
 *     MyParentClass2: [arg2], // ������������ ����� 2
 *     MyParentClass3: [arg1, arg2], // � ��� �����
 *     ...
 *   });
 *
 *   // ����� ����� ������������� ����������� ������ ��� ������������
 *   // ������������
 * }
 *
 * ����� ������ ������ ��� ����� MyClass ���������� ��� ������ � ��������
 * ������������ ������� MyParentClass1 � �.�.
 * ���� ��� ������ ����� ������ � ���������� ������, �� MyClass
 * ���������� � �������� ������ ������ ��������� �� �������������
 * � ������ ������������ �������.
 * ������ � ������ ������ ������ �� ������������ ������� ������ �����
 * ���������� ����������� ��������� �����������:
 * this.$super['MyParentClassName'].methodName.call(this, ...args...);
 * ��� ��� ������ ���� ��������� ����� �������� � this.$super
 */
function ExtClass(supers) {
  // ���������� ��� �������� ������� ������������ �������
  // ����� ����� �������� �� ������ ������ ������ (������������ ������, 
  // ������������� ��� ������), �� � �� ������ ����
  this.$super = this.$super ? this.$super : {};

  // ���������� ��� �������� ������� ���� ������������ �������
  // ��� ���������� ������ this.instanceOf()
  this.$_parents = this.$_parents ? this.$_parents : [];

  /**
   * ��������, �������� �� ������ �������� ��������� ������
   * @param string className ��� ������ ��� ��������
   * @returns boolean TRUE ���� ��������, ����� FALSE
   */
  this.instanceOf = function(className) {
    return (__inArray(className, this.$_parents) || (this instanceof eval(className)));
  };

  /**
   * ��������� ������� ��� ���������� ������������� ������.
   * ������ ���. ������ ����� ���� ������� ���: 
   * this.$super['parenClassName'].method.call(this, ...args...);
   * @param object that ������� ��� this �������
   * @param string className ��� ������
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
   * ��������� ������� ��� �������� �� ������� �������� � ������
   * @param mixed value ������� ��������
   * @param array arraySeek ������ ������
   * @returns boolean TRUE ���� �������, ����� FALSE
   */
  function __inArray(value, arraySeek) {
    if (arraySeek && arraySeek.length) {
      for (var i in arraySeek) {
        if (arraySeek[i] == value) return true;
      }
    }
    return false;
  };

  // �������� ���� ���������� ������������ �������
  for (var i in supers) {
    var className = i;
    var args = supers[i];
    (eval(className)).apply(this, args);
    __addSuper(this, className);
  }
};