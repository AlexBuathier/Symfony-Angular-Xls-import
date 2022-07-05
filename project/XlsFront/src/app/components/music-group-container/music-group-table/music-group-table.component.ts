import {Component, OnInit, TemplateRef} from '@angular/core';
import {MusicGroup} from '../../../models/music-group';
import {MusicGroupService} from '../../../services/music-group.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-music-groups-table',
    templateUrl: './music-group-table.component.html',
})
export class MusicGroupTableComponent implements OnInit {
    currentMusicGroup: number = 0
    currentIsDeleteItem: boolean = false
    //musicGroups: MusicGroup[] | null = [];
    musicGroups$: Observable<MusicGroup[]> = this.musicGroupService.musicGroup$;

    constructor(private musicGroupService: MusicGroupService,
                private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.getMusicGroups()
    }

    getMusicGroups() {
        this.musicGroupService.getMusicGroupCollection().subscribe((musicGroups: MusicGroup[] | null) => {
            //this.musicGroups = musicGroups;
            return this.musicGroupService.musicGroups.next(musicGroups);
            //this.musicGroups = musicGroups;
        });
    }

    openModal(template: TemplateRef<any>, musicGroupId: number = 0, isDeleteItem: boolean = false) {
        if (musicGroupId && musicGroupId > 0) {
            this.currentMusicGroup = musicGroupId
            this.currentIsDeleteItem = isDeleteItem;
        } else {
            this.currentMusicGroup = 0;
            this.currentIsDeleteItem = false;
        }
        this.modalService.show(template, {class: 'modal-lg'});
    }
}
