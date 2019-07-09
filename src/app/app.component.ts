import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import FilterColor from './filter-color';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'image-filter';
  context: any;
  width = 300;
  height = 300;
  filters = [
    new FilterColor(0xff, 0xff, 0xff),
    new FilterColor(0xec, 0x8a, 0x00),
    new FilterColor(0xfa, 0x96, 0x00),
    new FilterColor(0xeb, 0xb1, 0x13),
    new FilterColor(0x00, 0x6d, 0xff),
    new FilterColor(0x00, 0x5d, 0xff),
    new FilterColor(0x00, 0xb5, 0xff),
    new FilterColor(0xea, 0x1a, 0x1a),
    new FilterColor(0xf3, 0x84, 0x17),
    new FilterColor(0xf9, 0xe3, 0x1c),
    new FilterColor(0x19, 0xc9, 0x19),
    new FilterColor(0x1d, 0xcb, 0xea),
    new FilterColor(0x1d, 0x35, 0xea),
    new FilterColor(0x9b, 0x1d, 0xea),
    new FilterColor(0xe3, 0x18, 0xe3),
    new FilterColor(0xac, 0x7a, 0x33),
    new FilterColor(0xff, 0x00, 0x00),
    new FilterColor(0x00, 0x22, 0xcd),
    new FilterColor(0x00, 0x8c, 0x00),
    new FilterColor(0xff, 0xd5, 0x00),
    new FilterColor(0x00, 0xc1, 0xb1)
  ];

  @ViewChild('originalImageCanvas', { static: false })
  refOriginalImage: ElementRef<HTMLCanvasElement>;

  @ViewChild('filterImage', { static: false })
  refFilterImage: ElementRef<HTMLCanvasElement>;

  ngOnInit() {}
  ngAfterViewInit() {
    this.applyImage();
  }
  applyImage(imagePath: string = 'assets/smile.jpeg') {
    const original = new Image();
    this.context = this.refOriginalImage.nativeElement.getContext('2d');
    original.src = imagePath;
    original.onload = () => {
      this.context.drawImage(original, 0, 0);
    };
  }

  filter(filter: FilterColor, density: number = 30) {
    const { data, width, height } = this.context.getImageData(0, 0, this.width, this.height);
    const filteredImage = new ImageData(data.slice(), width, height);
    const rIntensity = (filter.r * density + 255 * (100 - density)) / 25500;
    const gIntensity = (filter.g * density + 255 * (100 - density)) / 25500;
    const bIntensity = (filter.b * density + 255 * (100 - density)) / 25500;

    for (let i = 0; i < data.length; i += 4) {
      const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      filteredImage.data[i] = Math.round(rIntensity * luma);
      filteredImage.data[i + 1] = Math.round(gIntensity * luma);
      filteredImage.data[i + 2] = Math.round(bIntensity * luma);
    }

    const filterImageContext = this.refFilterImage.nativeElement.getContext('2d');

    filterImageContext.putImageData(filteredImage, 0, 0);
  }

  onSelectFilter(event: Event, filterColor: FilterColor) {
    this.filter(filterColor, 40);
  }
}
