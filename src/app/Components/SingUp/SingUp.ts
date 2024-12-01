import { Component, Inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../DB/Otros';

@Component({
  selector: 'SingUp',
  templateUrl: './SingUp.html',
  styleUrls: ['./SingUp.css']
})
@Injectable({
  providedIn: 'root'
})
export class SingUpComponent {

    //General
    Usuario = new Usuario();

    constructor(private firestore: Firestore, public router: Router) {

    }

    Registro(){
      this.Usuario.UsuarioId = this.generateRandomString(20);
      let rutaSaveUser = doc(this.firestore, "Usuario",  this.Usuario.UsuarioId)
      setDoc(rutaSaveUser, JSON.parse(JSON.stringify(this.Usuario))).then(() => {

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