import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isHamburgerMenuOpen = false;
  slides: HTMLElement[] = []; // Initialize the slides property with an empty array
  currentIndex: number = 0;
  images3 = [
    "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OS40LzEwICAyMksgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00355365-lzflppmver-portrait.jpg",
   "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-Mzc3SyBMaWtlcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00347867-jylnkbfyan-portrait.jpg",
    "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-OS4yLzEwICA2MS43SyBWb3Rlcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00329481-bcufavugyg-portrait.jpg",
   "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MTU3LjRLIExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00072466-kwewqvtsdf-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAzMS40SyBWb3Rlcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00338378-flxyehczgl-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-MTAuMUsgTGlrZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00360617-dbpzmfxhfz-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-Mi4ySyBMaWtlcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00364044-nzutajtwfx-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ni4yLzEwICAxMy41SyBWb3Rlcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00357727-rznxsvxcjy-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-Nzg2IExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00363093-sldajaqjcl-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:ote-NzA0IExpa2Vz,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00364299-qqappqamxk-portrait.jpg",

];

  images1 = [
    "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTQ1KyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/workshop-and-more-web-collection-202211140440.png",
   "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/kids-zone-collection-202211140440.png",
  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTkwKyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/comedy-shows-collection-202211140440.png" ,
  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTEwKyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/music-shows-collection-202211140440.png" ,
  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/esports-collection-202211140440.png" ,
   "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/upskill-collection-202211140440.png",
  "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/interactive-games-collection-202211140440.png" ,
"https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/arts-crafts-collection-202211140440.png",
"https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTI1KyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/theatre-shows-collection-202211140440.png",
"https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/adventure-fun-collection-202211140440.png",

  ]

  images2 = [
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMiBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00363018-gpsbunwaxb-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00130069-mqrhnqmxrd-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-RnJpLCAyMSBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00362432-ukpcextqpm-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-RnJpLCAyOCBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00358276-vjdwsfbydg-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00362540-ahjexwclps-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-V2VkLCAzMSBEZWM%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00362658-dbwagtvhxu-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-V2VkLCAzMSBEZWM%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00362659-gznejhdqff-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMiBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00315696-bqfpnkqwqe-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMyBTZXAgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00363973-vhlkyxskeg-portrait.jpg",
"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-RnJpLCAyMSBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00359309-phwmhhdgws-portrait.jpg",

  ]

  slideWidth = 255; // Adjust the width of each slide based on your requirement
  visibleSlides = 5;
  currentIndex3 = 0;

  currentIndex1 = 0;

  currentIndex2 = 0;

  get sliderPosition3() {
    return -this.currentIndex3 * this.slideWidth;
  }

  slideNext3() {
    if (this.currentIndex3 < this.images3.length-1 - this.visibleSlides) {
      this.currentIndex3++;
    }
  }

  slidePrev3() {
    if (this.currentIndex3 > 0) {
      this.currentIndex3--;
    }
  }

  get sliderPosition1() {
    return -this.currentIndex1 * this.slideWidth;
  }

  slideNext1() {
    if (this.currentIndex1 < this.images1.length-1 - this.visibleSlides) {
      this.currentIndex1++;
    }
  }

  slidePrev1() {
    if (this.currentIndex1 > 0) {
      this.currentIndex1--;
    }
  }

  get sliderPosition2() {
    return -this.currentIndex2 * this.slideWidth;
  }

  slideNext2() {
    if (this.currentIndex2 < this.images2.length-1 - this.visibleSlides) {
      this.currentIndex2++;
    }
  }

  slidePrev2() {
    if (this.currentIndex2 > 0) {
      this.currentIndex2--;
    }
  }

  // Close the hamburger menu when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isHamburgerMenuOpen = false;
  }

  ngOnInit() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.slides[this.currentIndex].classList.add('active');
    setInterval(this.slideNext.bind(this), 2000); // Adjust the interval time (e.g., 2000ms for 2 seconds)
  }

  slideNext() {
    this.slides[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.slides[this.currentIndex].classList.add('active');
  }

  jumpToSlide(slide: HTMLElement) {
    this.slides[this.currentIndex].classList.remove('active');
    this.currentIndex = this.slides.indexOf(slide);
    this.slides[this.currentIndex].classList.add('active');
  }


  
}
