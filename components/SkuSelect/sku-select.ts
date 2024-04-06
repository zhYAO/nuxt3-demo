function cloneTwo(o: any[]): any[] {
  const ret: any[] = [];
  for (let j = 0; j < o.length; j++) {
    const i = o[j];
    ret.push(Array.isArray(i) ? [...i] : i);
  }
  return ret;
}

/**
 * 准备质数
 * @param {Int} num 质数范围
 * @returns []
 */
export function getPrime(total: number): number[] {
  let i = 2;
  const arr: number[] = [];
  const isPrime = (number: number): boolean => {
    for (let ii = 2; ii < number; ++ii) {
      if (number % ii === 0) {
        return false;
      }
    }
    return true;
  };
  // 循环判断，质数数量够完成返回
  for (i; arr.length < total; ++i) {
    if (isPrime(i)) {
      arr.push(i);
    }
  }
  // 返回需要的质数
  return arr;
}

export class PathFinder {
  maps: number[][];
  openWay: number[];
  openWayMix: number[][];
  _way: { [key: number]: [number, number] };
  light: number[][];
  selected: number[];

  constructor(maps: number[][], openWay: number[][]) {
    this.maps = maps;
    this.openWayMix = openWay;
    this.openWay = [];
    this._way = {};
    this.light = [];
    this.selected = [];
    this.init();
  }

  /**
   * 初始化，格式需要对比数据，并进行初始化是否可选计算
   */
  init() {
    this.light = cloneTwo(this.maps);
    const light = this.light;

    // 默认每个规则都可以选中，即赋值为1
    for (let i = 0; i < light.length; i++) {
      const l = light[i];
      for (let j = 0; j < l.length; j++) {
        this._way[l[j]] = [i, j];
        l[j] = 1;
      }
    }

    // 得到每个可操作的 SKU 质数的集合
    for (let i = 0; i < this.openWayMix.length; i++) {
      this.openWay[i] = this.openWayMix[i].reduce((acc, val) => acc * val, 1);
    }
    // return 初始化得到规格位置，规格默认可选处理，可选 SKU 的规格对应的质数合集
    this._check();
  }

  /**
   * 选中结果处理
   * @param {Boolean} isAdd 是否新增状态
   * @returns
   */
  _check(isAdd?: boolean) {
    const light = this.light;
    const maps = this.maps;

    for (let i = 0; i < light.length; i++) {
      const li = light[i];
      const selected = this._getSelected(i);
      for (let j = 0; j < li.length; j++) {
        if (li[j] !== 2) {
          // 如果是加一个条件，只在是light值为1的点进行选择
          if (isAdd) {
            if (li[j]) {
              light[i][j] = this._checkItem(maps[i][j], selected);
            }
          } else {
            light[i][j] = this._checkItem(maps[i][j], selected);
          }
        }
      }
    }
    return this.light;
  }

  /**
   * 检查是否可选内容
   * @param {Int} item 当前规格质数
   * @param {Array} selected
   * @returns
   */
  _checkItem(item: number, selected: number): number {
    // 拿到可以选择的 SKU 内容集合
    const openWay: any[] = this.openWay;
    const val = item * selected;
    // 拿到已经选中规格集合*此规格集合值
    // 可选 SKU 集合反除，查询是否可选
    for (let i = 0; i < openWay.length; i++) {
      if (openWay[i] % val === 0) {
        return 1;
      }
    }
    return 0;
  }

  /**
   * 组合中已选内容，初始化后无内容
   * @param {Index} xpath
   * @returns
   */
  _getSelected(xpath: number): number {
    const selected = this.selected;
    const _way = this._way;
    let ret = 1;
    let retArr: number[] = [];

    if (selected.length) {
      for (let j = 0; j < selected.length; j++) {
        const s = selected[j];
        // xpath表示同一行，当已经被选择的和当前检测的项目再同一行的时候
        // 需要忽略。
        // 必须选择了 [1, 2],检测的项目是[1, 3]，不可能存在[1, 2]和[1, 3]
        // 的组合，他们在同一行
        if (_way[s][0] !== xpath) {
          ret *= s;
          retArr.push(s);
        }
      }
    }

    return ret;
  }

  /** 选择可选规格后处理
   * @param {array} point [x, y]
   */
  add(point: number | number[]) {
    const p = Array.isArray(point) ? point : this._way[point];
    const val = this.maps[p[0]][p[1]];

    // 检查是否可选中
    if (!this.light[p[0]][p[1]]) {
      throw new Error(
        `this point [${p}] is no longer available, please choose another`,
      );
    }

    if (this.selected.includes(val)) return;

    const isAdd = this._dealChange(p);
    this.selected.push(val);
    this.light[p[0]][p[1]] = 2;
    this._check(!isAdd);
  }

  /**
   * 判断是否同行选中
   * @param {Array} point 选中内容坐标
   * @returns
   */
  _dealChange(point: number[]): boolean {
    const selected = this.selected;
    // 遍历处理选中内容
    for (let i = 0; i < selected.length; i++) {
      // 获取刚刚选中内容的坐标，属于同一行内容
      const line = this._way[selected[i]];
      if (line[0] === point[0]) {
        this.light[line[0]][line[1]] = 1;
        selected.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * 移除已选规格
   * @param {Array} point
   */
  remove(point: number | number[]) {
    const p = Array.isArray(point) ? point : this._way[point];
    const val = this.maps[p[0]][p[1]];
    if (!val) {
      return;
    }

    const index = this.selected.indexOf(val);
    if (index > -1) {
      this.light[this._way[val][0]][this._way[val][1]] = 1;
      this.selected.splice(index, 1);
      this._check();
    }
  }

  /**
   * 获取当前可用数据
   * @returns []
   */
  getWay(): number[][] {
    const light = this.light;
    const way = cloneTwo(light);
    for (let i = 0; i < light.length; i++) {
      const line = light[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j]) way[i][j] = this.maps[i][j];
      }
    }
    return way;
  }
}

/**
 * 笛卡尔积组装
 * @param {Array} list
 * @returns []
 */
export function descartes(list: any[][]): any[][] {
  return list.reduce((a, b) => a.flatMap((x) => b.map((y) => [...x, y])), [[]]);
}
