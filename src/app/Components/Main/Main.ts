import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Usuario } from '../DB/Otros';
import { Firestore, collection, collectionData, doc, getDoc, orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, using } from 'rxjs';

@Component({
  selector: 'Main',
  templateUrl: './Main.html',
  styleUrls: ['./Main.css']
})

@Injectable({
  providedIn: 'root'
})

export class MainComponent implements OnInit {
  //Firebase
  usuariosBd = collection(this.firestore, "Usuario");

  //General
  Usuario = new Usuario();
  UsuarioFavs = new Usuario();

  comicsfav: any[] = [];
  comics: any[] = [];
  comicdetails: any = {}; // Detalles del cómic actual.


  //#region Peticiones
  private apiUrl = 'https://gateway.marvel.com:443/v1/public/comics';
  private publicKey = '01e5356ffcd9542ce9224f7bdcf9d339';
  private hash = 'ef1186e9d8ede8aba2db5e51c3776e13';
  private ts = '1'; // El timestamp que usaste para generar el hash


  //#endregion 


  constructor(private firestore: Firestore, public router: Router, private http: HttpClient) {

    if (history.state.UsuarioId == "" || history.state.UsuarioId == undefined) {
    }
    else {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }
    this.Usuario = new Usuario();
    this.Usuario.setData(JSON.parse(localStorage.getItem('Usuario')!));
    // let q = query(this.usuariosBd, where("UsuarioId", "==", this.Usuario.UsuarioId));
    // collectionData(q).subscribe((snapUsuarios) => {
    //   if (snapUsuarios.length > 0) {
    //     this.Usuario.setData(snapUsuarios[0]);
    //   }
    // });

  }

  ngOnInit(): void {
    this.getComics().subscribe(data => {
      this.comics = data.data.results;
    });
  }

  getComics(): Observable<any> {
    const url = `${this.apiUrl}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }

  getComicdetails(id: number): void {
    const url = `${this.apiUrl}/${id}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    // Hacer la petición HTTP para obtener los detalles del cómic.
    this.http.get(url).subscribe((data: any) => {
    this.comicdetails = data.data.results[0]; // Obtener el detalle del cómic.
    });
  }

  getComicsFav(ids: string[]): void {
    this.comicsfav = [];
    ids.forEach((id: string) => {
      const url = `${this.apiUrl}/${id}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
      this.http.get(url).subscribe((data: any) => {
        this.comicsfav.push(data.data.results[0]); // Agregar el detalle al array.
      });

    });
  }

  AgregarFav(Comic: any) {
    var flag = true;
    let q = query(this.usuariosBd, where("UsuarioId", "==", this.Usuario.UsuarioId))
    collectionData(q).subscribe((snapUsuario) => {
      if (flag && snapUsuario.length > 0) {
        flag = false;
        this.Usuario.setData(snapUsuario[0])

        // Verificar si el cómic ya está en la lista de favoritos
        if (!this.Usuario.ComicFav.includes(Comic.id)) {
          this.Usuario.ComicFav.push(Comic.id);
        } else {
          const index = this.Usuario.ComicFav.indexOf(Comic.id); // Obtener el índice del cómic
          if (index > -1) { // Verificar que el cómic esté en la lista
            this.Usuario.ComicFav.splice(index, 1); // Eliminar el cómic de la lista
          }
        }
      }
      let rutaSaveFav = doc(this.firestore, "Usuario", this.Usuario.UsuarioId)
      setDoc(rutaSaveFav, JSON.parse(JSON.stringify(this.Usuario))).then(() => {
      })
    })
  }

  verFav() {
    let flag = true;
    let q = query(this.usuariosBd, where("UsuarioId", "==", this.Usuario.UsuarioId));
    collectionData(q).subscribe((snapUsuarios) => {
      if (flag && snapUsuarios.length > 0) {
        flag = false;
        this.UsuarioFavs.setData(snapUsuarios[0]);
        this.getComicsFav(this.UsuarioFavs.ComicFav)
      }
    });
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