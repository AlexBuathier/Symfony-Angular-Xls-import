import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {MusicGroup} from '../../models/music-group';
import {Validators} from '@angular/forms';
import {MusicGroupService} from '../../services/music-group.service';
import {Country} from '../../models/country';
import {City} from '../../models/city';
import {forkJoin, map, Subscription} from 'rxjs';
import {MusicTrend} from '../../models/music-trend';

@Component({
    selector: 'app-file-import',
    templateUrl: './file-import.component.html',
    styleUrls: ['./file-import.component.scss']
})
export class FileImportComponent implements OnInit {

    file: any
    arrayBuffer: any
    filelist: any

    countries: Country[] = [];
    cities: City[] = [];
    musicTrends: MusicTrend[] = [];

    constructor(private musicGroupService: MusicGroupService) {
    }

    @ViewChild('inputFile') inputFile: ElementRef | undefined;


    ngOnInit(): void {
        this.getCountriesAndCity()
    }

    import() {

    }

    addFileInField(event: any) {
        //this.getCountriesAndCity()
        this.file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.file);
        fileReader.onload = (e: ProgressEvent<FileReader>) => {

            this.arrayBuffer = fileReader.result;
            const data = new Uint8Array(this.arrayBuffer);
            const arr = [];
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            const bstr = arr.join("");
            const workbook = XLSX.read(bstr, {type: "binary"});
            const first_sheet_name = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[first_sheet_name];
            /*console.log(worksheet)
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true})[0]);*/
            var arraylist: any = XLSX.utils.sheet_to_json(worksheet, {raw: true});

            this.filelist = [];
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

                console.log(obj.country, obj.city, 'FIND');
                this.filelist.push(obj);
            }
            console.log(this.filelist)
        }
    }

    postMusicGroup() {
        if (this.filelist) {
            for (let i = 0; i < this.filelist.length; i++) {
                console.log(this.filelist[i].name);
                this.musicGroupService.postMusicGroupItem(this.filelist[i]).subscribe((musicGroup: MusicGroup) => {
                        console.log(musicGroup, 'musicGroup');
                        this.musicGroupService.musicGroups.value.push(musicGroup)
                    }
                );
            }
            this.filelist = [];
            this.resetInputFile();
        } else {
            console.log('no file')
        }
    }

    async getCountriesAndCity(): Promise<any> {
        forkJoin([
            this.getCountries(),
            this.getCities(),
            this.getMusicTrend()
        ]).pipe(
            map(() => {
                console.log('done');
            }
            ));
    }

    resetInputFile() {
        this.inputFile ? this.inputFile.nativeElement.value = '' : null;
    }

    getMusicTrend(): Subscription {
        return this.musicGroupService.getMusicTrendCollection().subscribe((musicTrend: MusicTrend[]) => {
            this.musicTrends = musicTrend;
            console.log(this.musicTrends, 'musicTrend');
        });
    }

    getCountries(): Subscription {
        return this.musicGroupService.getCountryCollection().subscribe((countries: Country[]) => {
            this.countries = countries;
            console.log(this.countries, 'countries');
        });
    }

    getCities(): Subscription {
        return this.musicGroupService.getCityCollection().subscribe((cities: City[]) => {
            this.cities = cities;
            console.log(this.cities, 'cities');
        });
    }

}

