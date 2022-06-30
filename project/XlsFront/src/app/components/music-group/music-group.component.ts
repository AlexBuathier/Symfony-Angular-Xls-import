import {Component, OnInit} from '@angular/core';
import {MusicGroup} from '../../models/music-group';
import {MusicGroupService} from '../../services/music-group.service';

@Component({
    selector: 'app-music-groups',
    templateUrl: './music-group.component.html',
    styleUrls: ['./music-group.component.scss']
})
export class MusicGroupComponent implements OnInit {

    musicGroups: MusicGroup[] = [];

    constructor(private musicGroupService: MusicGroupService) {
    }

    ngOnInit(): void {
        this.musicGroupService.getMusicGroupCollection().subscribe((musicGroups: MusicGroup[]) => {
            this.musicGroups = musicGroups;
            console.log(this.musicGroups);
        });
    }

}
