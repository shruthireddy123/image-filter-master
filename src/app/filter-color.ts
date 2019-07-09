class FilterColor {
  r: any;
  g: any;
  b: any;

  constructor(r: any, g: any, b: any) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getColor() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

export default FilterColor;
