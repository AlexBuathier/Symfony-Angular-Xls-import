import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {MusicGroup} from '../../models/music-group';
import {MusicGroupService} from '../../services/music-group.service';
import {Country} from '../../models/country';
import {City} from '../../models/city';
import {forkJoin} from 'rxjs';
import {MusicTrend} from '../../models/music-trend';
import {CityService} from '../../services/city.service';
import {CountryService} from '../../services/country.service';
import {MusicTrendService} from '../../services/music-trend.service';

@Component({
    selector: 'app-file-import',
    templateUrl: './file-import.component.html',
    styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent implements OnInit {

    countries: Country[] = [];
    cities: City[] = [];
    musicTrends: MusicTrend[] = [];
    importFileMessage = '';
    className: string = 'text-muted';
    file?: Blob

    constructor(private musicGroupService: MusicGroupService,
                private cityService: CityService,
                private countryService: CountryService,
                private musicTrendService: MusicTrendService) {
    }

    @ViewChild('inputFile') inputFile: ElementRef | undefined;

    ngOnInit(): void {
        this.getEntityDependencies()
    }

    importFile(): void {
        if (this.file) {
            this.musicGroupService.postImportMusicGroup(this.file).subscribe(() => {
                },
                () => {
                    this.className = 'text-danger';
                    this.importFileMessage = 'Error while importing!';
                }, () => {
                    this.className = 'text-success';
                    this.importFileMessage = 'Imported successfully!';
                    this.resetInputFile();
                    this.musicGroupService.getMusicGroupCollection().subscribe(musicGroups => {
                        this.musicGroupService.musicGroups.next(musicGroups)
                    })
                })
        } else {
            this.className = 'text-danger';
            this.importFileMessage = 'Please select a file!';
        }
    }

    getEntityDependencies(): void {
        forkJoin({
            musicTrends: this.musicTrendService.getMusicTrendCollection(),
            countries: this.countryService.getCountryCollection(),
            cities: this.cityService.getCityCollection(),
        }).subscribe((data) => {
            this.countries = data.countries;
            this.cities = data.cities;
            this.musicTrends = data.musicTrends;
        });
    }

    resetInputFile(): void {
        this.inputFile ? this.inputFile.nativeElement.value = '' : null;
        setTimeout(() => {
            this.importFileMessage = '';
        }, 2500)
    }

    addFileInField(event: any): void {
        this.file = event.target.files[0];
    }

}

