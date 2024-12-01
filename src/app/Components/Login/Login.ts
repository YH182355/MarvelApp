import { Component, Inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../DB/Otros';

@Component({
  selector: 'Login',
  templateUrl: './Login.html',
  styleUrls: ['./Login.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent {

    //Firebase
    usuariosBd = collection(this.firestore, "Usuario");
    //General
    Usuario = new Usuario();

    constructor(private firestore: Firestore, public router: Router) {

    }

    LogIn() {
      let q = query(this.usuariosBd, where("Usuario", "==", this.Usuario.Usuario), where("Password", "==", this.Usuario.Password))
      collectionData(q).subscribe((snapUsuarios) => {
      if (snapUsuarios.length > 0) {
        this.Usuario.setData(snapUsuarios[0])
       }
       this.router.navigate(['/Main'], {state: this.Usuario});
      })

    }

    generateRandomString = (num: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1 = '';
      const charactersLength = characters.length;
      for (let i = 0; i < num; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result1;
    }
}