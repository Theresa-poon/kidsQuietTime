import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'lesson-one', loadChildren: './lesson-one/lesson-one.module#LessonOnePageModule' },
  { path: 'lesson-two', loadChildren: './lesson-two/lesson-two.module#LessonTwoPageModule' },
  { path: 'lesson-last', loadChildren: './lesson-last/lesson-last.module#LessonLastPageModule' },
  { path: 'progress', loadChildren: './progress/progress.module#ProgressPageModule' },
  { path: 'tips', loadChildren: './tips/tips.module#TipsPageModule' },
  { path: 'game1', loadChildren: './game1/game1.module#Game1PageModule' },
  { path: 'lesson-three', loadChildren: './lesson-three/lesson-three.module#LessonThreePageModule' },
  { path: 'game2', loadChildren: './game2/game2.module#Game2PageModule' },
  { path: 'game3', loadChildren: './game3/game3.module#Game3PageModule' },
  { path: 'game4', loadChildren: './game4/game4.module#Game4PageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
