import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {IonContent, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController } from '@ionic/angular'; 
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { IonSlides } from '@ionic/angular';

const STORAGE_KEY = 'IMAGE_LIST';

@Component({
  selector: 'app-game4',
  templateUrl: './game4.page.html',
  styleUrls: ['./game4.page.scss'],
})
export class Game4Page implements OnInit {

  public gameQ: any; //json data of drawing theme

  //slide for showing previous drawings
  @ViewChild('slides', {static: true}) slides: IonSlides;

  sliderConfig = {
    initialSlide: 100,
    speed: 400,
    //spaceBetween: 10,
    //slidesPerView: 1.4,
    slidesPerView: 1,
    spaceBetween: 5,
    //spaceBetween: 0,
    centeredSlides: true
  };

  //Canvas stuff
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;

  saveX: number;
  saveY: number;
  started: any; //whether user started to draw anything on the canvas

  storedImages = [];

  //@ViewChild(Content) content: Content;
  // @ViewChild(IonContent, {read: IonContent}) myContent: IonContent;
  @ViewChild(IonContent, { read: IonContent, static: true }) content: IonContent;
  //@ViewChild('fixedContainer') fixedContainer: any; // deleted 6 Sep & 1st html <div> deleted #fixedContainer

  selectedColor = "#9e2956"
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  colors1 = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c' ];
  colors2 = [ '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  colors3 = [ '#ffffff', '#c3c3c3', '#ffaec8', '#b97a56' ];

  constructor(private router: Router, private storage: Storage, 
    private plt: Platform, private file: File, private webview: WebView,
    public alertController: AlertController, public apptextService: ApptextService,
    public gamesService: GamesService) {
    // Load all stored images when the app is ready
    this.storage.ready().then(() => {
     this.storage.get(STORAGE_KEY).then(data => {
       if (data != undefined) {
         this.storedImages = data;
       }
     });
   });
 }

 ionViewDidEnter() {
  // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
  // Get the height of the fixed item
  //let itemHeight = this.fixedContainer.nativeElement.offsetHeight; // deleted 6 Sep
  let scroll = this.content.getScrollElement();
  console.log("ionViewDidEnter")
  if (this.gamesService.correctDraw == 0) {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width()*0.55;
    this.canvasElement.height = this.plt.height()*0.70;
    this.setBackground()
  } 

  // Add preexisting scroll margin to fixed container size
  //itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
  //scroll.style.marginTop = itemHeight + 'px';
}

ngOnInit() {
  // Set the Canvas Element and its size
  //if (this.gamesService.correctDraw == 0) {
  //  this.canvasElement = this.canvas.nativeElement;
  //}
  //this.canvasElement.width = this.plt.width() + '';
    //this.canvasElement.width = 250;
  console.log("ngOnInIt")
  console.log("this.gamesService.ratio: "+this.gamesService.ratio)
  //console.log("platform width is: "+this.plt.width())
    //this.canvasElement.height = 200;
  this.started = 0
  this.gameQ = this.apptextService.currentText.game4Q
  console.log(this.gameQ)
  if (this.gamesService.correctDraw == 0) {
    this.presentAlert('送一幅圖畫給天父:',this.gameQ)
  }
  console.log(this.gamesService.correctDraw == 0)

}

selectColor(color) {
  this.selectedColor = color;
}

setBackground() {
  var background = new Image();
  //background.src = '../assets/images/painting.png';
  background.src = this.apptextService.currentText.game4P;
  let ctx = this.canvasElement.getContext('2d');

  background.onload = () => {
    ctx.drawImage(background,0,0, this.canvasElement.width, this.canvasElement.height);   
  }
}

startDrawing(ev) {
  this.started = 1
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  this.saveX = ev.touches[0].pageX - canvasPosition.x;
  this.saveY = ev.touches[0].pageY - canvasPosition.y;
}

moved(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
 
  let ctx = this.canvasElement.getContext('2d');
  let currentX = ev.touches[0].pageX - canvasPosition.x;
  let currentY = ev.touches[0].pageY - canvasPosition.y;
 
  ctx.lineJoin = 'round';
  ctx.strokeStyle = this.selectedColor;
  ctx.lineWidth = 5;
 
  ctx.beginPath();
  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
 
  ctx.stroke();
 
  this.saveX = currentX;
  this.saveY = currentY;
}

saveCanvasImage2() {
  this.presentAlert('謝謝您!', '天父很喜歡您的圖畫!')
  this.gamesService.picture = this.storedImages[this.storedImages.length-1].img
  this.gamesService.correctDraw = 1
  //this.router.navigate(['/lesson-last']);
  console.log("number of stored images = "+this.storedImages.length)
  console.log(this.storedImages[this.storedImages.length-1])
  console.log(this.storedImages[this.storedImages.length-1].img)
}

clearCanvas() {
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  this.setBackground()
}

saveCanvasImage() {
  
  if (this.started == 1) { //check if canvas is empty
  
    var dataUrl = this.canvasElement.toDataURL();
    console.log("canvas data: "+dataUrl)

    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  
    let name = new Date().getTime() + '.png';
    //console.log(name)
    let path = this.file.dataDirectory;
    let options: IWriteOptions = { replace: true };

    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');

    console.log("save image path:"+path)
    //console.log(blob)
    this.file.writeFile(path, name, blob, options).then(res => {
    this.storeImage(name);
    }, err => {
    console.log('error: ', err);
    });

} else {
  this.presentAlert('您可以開始繪畫了!', '天父會很喜歡您的圖畫!')
}

}

    // https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

storeImage(imageName) {
  let saveObj = { img: imageName };
  this.storedImages.push(saveObj);
  console.log("in storeImage function. Length= : "+this.storedImages.length)
  this.storage.set(STORAGE_KEY, this.storedImages).then(() => {
    setTimeout(() =>  {
      this.content.scrollToBottom();
      this.saveCanvasImage2();
    }, 500);
  });
}
 
removeImageAtIndex(index) {
  let removed = this.storedImages.splice(index, 1);
  this.file.removeFile(this.file.dataDirectory, removed[0].img).then(res => {
  }, err => {
    console.log('remove err; ' ,err);
  });
  this.storage.set(STORAGE_KEY, this.storedImages);
}

getImagePath(imageName) {
  let path = this.file.dataDirectory + imageName;
  // https://ionicframework.com/docs/wkwebview/#my-local-resources-do-not-load
  //path = normalizeURL(path);
  path = this.webview.convertFileSrc(path);
  var re = /undefined/gi
  path = path.replace(re, "http://localhost")
  console.log("getImagePath"+path)

  //var str = this.webview.convertFileSrc(this.file.externalDataDirectory+"fondo.png");
  //var re = /undefined/gi;
  //str = str.replace(re, "http://localhost");

  return path;
}

loadPastImage() {
  this.gamesService.correctDraw = 1
}

async presentAlert(title: string, content:string) {
  const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ["OK"]
  })
  await alert.present()
}

  clickL() {
    this.router.navigate(['/lesson-two']);
  }

  clickR() {
    this.router.navigate(['/lesson-three']);
  }

}
