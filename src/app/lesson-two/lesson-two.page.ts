import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptextService } from '../apptext.service';
import { GamesService } from '../games.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-lesson-two',
  templateUrl: './lesson-two.page.html',
  styleUrls: ['./lesson-two.page.scss'],
})
export class LessonTwoPage implements OnInit {

  public gameQ = []; //json data of 3 questions
  public gameA = []; //json data of 3 answers
  Aone: string; //user input of first answer
  Atwo: string; //user input of second answer
  Athree: string; //user input of third answer
  togameNumber: any;
  fmgameNumber: any;

  constructor(private router: Router,
    public apptextService: ApptextService,
    public gamesService: GamesService,
    public alertController: AlertController,) { }

  ngOnInit() {
    //this.gameQ = this.apptextService.currentText.game1Q.split(",")
    //this.gameA = this.apptextService.currentText.game1A.split(",")
    //console.log(this.gameQ)
    //console.log(this.gameQ[0])
    //console.log(this.gameQ[1])
    //console.log(this.gameQ[2])
    this.fmgameNumber = this.apptextService.currentText.games.substring(0,1)
    console.log("gameNumber= "+this.fmgameNumber)
    this.togameNumber = this.apptextService.currentText.games.substring(1,2)
    console.log("gameNumber= "+this.togameNumber)
  }

  //check() {
  //  if (this.gameA[0] == this.Aone) {
  //    this.gamesService.correctFill[0] = 1
  //  }
  //  if (this.gameA[1] == this.Atwo) {
  //    this.gamesService.correctFill[1]  = 1
  //  }
  //  if (this.gameA[2] == this.Athree) {
  //    this.gamesService.correctFill[2]  = 1
  //  }
  //  if (this.gamesService.correctFill[0] == 0 && this.gamesService.correctFill[1] == 0 && this.gamesService.correctFill[2] == 0) {
  //    console.log("if 'all wrong' is correct")
  //    this.presentAlert('加油 !','你可以翻閱之前的經文和延伸閱讀啊')
  //  }
  //  console.log("correctness: "+this.gamesService.correctFill[0]+", "+this.gamesService.correctFill[1] +", "+this.gamesService.correctFill[2])
  //}

  async presentAlert(title: string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ["OK"]
    })
    await alert.present()
  }

  clickL() {
    this.router.navigate(['/game'+this.fmgameNumber]);
  }

  clickR() {
    this.router.navigate(['/game'+this.togameNumber]);
  }

}
