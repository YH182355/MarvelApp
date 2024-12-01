export class Usuario {

    UsuarioId = "";
    Usuario = "";
    Password = "";
    Nombre = "";
    ComicFav: string[] = new Array();

    constructor(){
  
    }
  
    setData(data: any){
      this.UsuarioId =  data.UsuarioId;
      this.Usuario = data.Usuario;
      this.Password = data.Password;
      this.Nombre = data.Nombre;
      this.ComicFav = data.ComicFav;
    }
  
  }
