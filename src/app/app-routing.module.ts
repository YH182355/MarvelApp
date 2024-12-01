import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login';
import { SingUpComponent } from './Components/SingUp/SingUp';
import { MainComponent } from './Components/Main/Main';

const routes: Routes = [
  {path:"Login", component:LoginComponent},
  {path:"", component:SingUpComponent},
  {path: "Main", component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
