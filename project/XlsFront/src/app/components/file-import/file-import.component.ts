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

    file: any
    arrayBuffer: any
    fileList: any

    countries: Country[] = [];
    cities: City[] = [];
    musicTrends: MusicTrend[] = [];

    constructor(private musicGroupService: MusicGroupService,
                private cityService: CityService,
                private countryService: CountryService,
                private musicTrendService: MusicTrendService) {
    }

    @ViewChild('inputFile') inputFile: ElementRef | undefined;

    ngOnInit(): void {
        this.getEntityDependencies()
    }

    postMusicGroup() {
        if (this.fileList) {
            for (let i = 0; i < this.fileList.length; i++) {
                this.musicGroupService.postMusicGroupItem(this.fileList[i]).subscribe((musicGroup: MusicGroup) => {
                    this.musicGroupService.musicGroups.value.push(musicGroup)
                });
            }
            this.fileList = [];
            this.resetInputFile();
        }
    }

    getEntityDependencies(): any {
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

    resetInputFile() {
        this.inputFile ? this.inputFile.nativeElement.value = '' : null;
    }

    addFileInField(event: any) {
        this.file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.file);
        fileReader.onload = (e: ProgressEvent<FileReader>) => {

            this.arrayBuffer = fileReader.result;
            const data = new Uint8Array(this.arrayBuffer);
            const arr = [];
            for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            const bstr = arr.join("");
            const workbook = XLSX.read(bstr, {type: "binary"});
            const first_sheet_name = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[first_sheet_name];
            const arraylist: any = XLSX.utils.sheet_to_json(worksheet, {raw: true});
            this.fileList = [];

            for (let i = 0; i < Object.keys(arraylist[0]).length; i++) {
                let obj = {
                    name: arraylist[i]["Nom du groupe"],
                    startDate: arraylist[i]["Année début"],
                    separationDate: arraylist[i]["Année séparation"] ? arraylist[i]["Année séparation"] : null,
                    founder: arraylist[i]["Fondateurs"] ? arraylist[i]["Fondateurs"] : null,
                    members: arraylist[i]["Membres"] ? arraylist[i]["Membres"] : null,
                    presentation: arraylist[i]["Présentation"],
                    musicTrend: arraylist[i]["Courant musical"]?.trim() ? arraylist[i]["Courant musical"]?.trim() : null,
                    country: arraylist[i]["Origine"].trim(),
                    city: arraylist[i]["Ville"].trim()
                };
                const country = this.countries.find(country => country.name.toLowerCase() === obj.country.toLowerCase());
                const city = this.cities.find(city => city.name.toLowerCase() === obj.city.toLowerCase());
                const musicTrend = this.musicTrends.find(musicTrend => musicTrend.name.toLowerCase() === obj.musicTrend?.toLowerCase());
                obj.country = 'api/countries/' + country?.id
                obj.city = 'api/cities/' + city?.id
                obj.musicTrend = musicTrend?.id ? 'api/music_trends/' + musicTrend?.id : null

                this.fileList.push(obj);
            }
        }
    }

}

