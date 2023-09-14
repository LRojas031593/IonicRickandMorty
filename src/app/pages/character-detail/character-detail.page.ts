import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  characterId: string='';
  character= null as any;
  episodes: any[] = [];

  constructor(
    private actRoute:ActivatedRoute,
    private rymSv:RickAndMortyService
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
    
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getCharacters();

  }
  getCharacters() {
    this.rymSv.getCharacterById(this.characterId).subscribe({
      next:(respuesta: any) => {
        this.character=respuesta;
        this.getEpisode();
        console.log(this.episodes );
        
        
      },
      error: (err: any) => {


      } 
    });
  }

  getEpisode() {

    for (let url of this.character.episode) {
      this.rymSv.getByUrl(url).subscribe({
        next:(respuesta: any) => {
          this.episodes.push(respuesta);
        },
        error: (err: any) => {
        } 
      });
    }
  }
}
