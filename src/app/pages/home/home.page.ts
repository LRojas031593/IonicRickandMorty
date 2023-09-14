import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  characters: any[] = [];
  params = {} as any;
  constructor(private rymSv:RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }
  getCharacters(event?:any) {
    this.params.page += 1;
    this.rymSv.getCharacters(this.params).subscribe({
      next:(respuesta: any) => {
        console.log(this.characters);
        this.characters.push(...respuesta.results);
        if(event){
          event.target.complete();
        }  
      },
      error: (err: any) => {
        if(event){
          event.target.complete();
        }  
        console.log(err)},
    });
  }
  searchCharacters() {
    this.params.page = 1;
    this.rymSv.getCharacters(this.params).subscribe({
      next:(respuesta: any) => {
        this.characters=respuesta.results;
        
      },
      error: (err: any) => {
      
      },
    });
  }
}
