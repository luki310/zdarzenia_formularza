import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "playlists-list",
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Utworów </th>
          <th> Ulubiona </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let playlist of playlists; let i = index" class="playlist-row"
          [ngClass]="{'table-active': selected == playlist}"
          [ngStyle]="{borderBottomColor:playlist.color}"
          (click)="select(playlist)">
          <td> {{ i + 1 }}. </td>
          <td> {{ playlist.name }} </td>
          <td> {{ playlist.tracks }} </td>
          <td>
            <label><input type="checkbox" [(ngModel)]="playlist.favourite" (click)="$event.stopPropagation();">
              Ulubiona</label>
          </td>
          <td>
            <span class="remove" (click)="remove(playlist)" >&times;</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
    .playlist-row {
        border-bottom: 3px solid transparent;
    }
  `
  ]
})
export class PlaylistsListComponent implements OnInit {
  playlistHover;

  @Output("selected") onSelected = new EventEmitter();

  @Input() playlists;

  @Input() selected;

  select(playlist) {
    this.onSelected.emit(playlist);
  }

  constructor() {}

  remove(playlist) {
    let index = this.playlists.findIndex(p => p.id == playlist.id);
    console.log(index);

    this.playlists.splice(index, 1);
  }

  ngOnInit() {}

}
