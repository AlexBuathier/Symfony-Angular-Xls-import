import {Component, Input, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MusicGroupService} from '../../../services/music-group.service';
import {Country} from '../../../models/country';
import {City} from '../../../models/city';
import {MusicGroup} from '../../../models/music-group';
import {MusicTrend} from '../../../models/music-trend';
import {Observable} from 'rxjs';
import {CityService} from '../../../services/city.service';
import {CountryService} from '../../../services/country.service';
import {MusicTrendService} from '../../../services/music-trend.service';

@Component({
    selector: 'app-crud-music-group-modal',
    templateUrl: './crud-music-group-modal.component.html',
})
export class CrudMusicGroupModalComponent implements OnInit {
    @Input() musicGroupId: number = 0;
    @Input() isDeleteItem: boolean = false;
    maxYear = new Date().getFullYear();
    musicGroupForm: FormGroup;
    musicGroupFormIsSubmit: boolean = false;
    countries: Country[] = [];
    cities: City[] = [];
    musicTrends: MusicTrend[] = [];

    musicGroups$: Observable<MusicGroup[]> = this.musicGroupService.musicGroup$;

    constructor(private musicGroupService: MusicGroupService,
                private cityService: CityService,
                private countryService: CountryService,
                private musicTrendService: MusicTrendService,
                public modalService: BsModalService,
                private fb: FormBuilder
    ) {
        this.musicGroupForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            startDate: ['', [Validators.required, Validators.max(this.maxYear)]],
            separationDate: ['', Validators.min(1900)],
            founder: ['', Validators.maxLength(255)],
            members: [0, Validators.max(50)],
            presentation: ['', Validators.required],
            musicTrend: [null],
            country: [null, Validators.required],
            city: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.setMusicGroupFormDependencies()
    }

    // Get Countries / Trends / MusicGroup Item
    setMusicGroupFormDependencies(): void {
        // Is edit or new item form
        if (this.musicGroupId >= 0) {
            this.getCountries();
            this.getMusicTrends();
        }
        // Is edit form
        if (this.musicGroupId > 0 && !this.isDeleteItem) {
            this.musicGroupService.getMusicGroupItem(this.musicGroupId).subscribe((musicGroup: MusicGroup) => {
                const startDate = new Date(musicGroup.startDate).getFullYear();
                const separationDate = new Date(musicGroup.separationDate).getFullYear();
                this.musicGroupForm.patchValue({
                    ...musicGroup,
                    startDate,
                    separationDate,
                    country: musicGroup.city.country.id,
                    city: musicGroup.city.id,
                    musicTrend: musicGroup?.musicTrend?.id
                });
            });
        }
    }

    // CRUD treatment
    submitForm(): void {
        this.musicGroupFormIsSubmit = true
        if (this.musicGroupForm.valid
        ) {
            let bodyWithIri = {
                ...this.musicGroupForm.value,
                country: 'api/countries/' + this.musicGroupForm.value.country,
                city: 'api/cities/' + this.musicGroupForm.value.city,
                musicTrend: this.musicGroupForm.value.musicTrend ?
                    'api/music_trends/' + this.musicGroupForm.value.musicTrend : null
            };
            // PUT Item
            if (this.musicGroupId > 0 && !this.isDeleteItem) {
                this.musicGroupService.putMusicGroupItem(this.musicGroupId, bodyWithIri).subscribe((mg) => {
                    this.musicGroupService.getMusicGroupItem(mg.id).subscribe((newItem: MusicGroup) => {
                        // musicGroups patch value with new item
                        const index = this.musicGroupService.musicGroups.value.findIndex((el: { id: number; }) => el.id === mg.id);
                        this.musicGroupService.musicGroups.value[index] = newItem;
                    })
                })
                // POST Item
            } else {
                this.musicGroupService.postMusicGroupItem(bodyWithIri).subscribe((mg: MusicGroup) => {
                    this.musicGroupService.getMusicGroupItem(mg.id).subscribe((newItem: MusicGroup) => {
                        this.musicGroupService.musicGroups.value.push(newItem)
                    })
                });
            }
            this.modalService.hide();
        }
        // DELETE Item
        if (this.musicGroupId && this.isDeleteItem) {
            this.musicGroupService.deleteMusicGroupItem(this.musicGroupId).subscribe(() => {
                const index = this.musicGroupService.musicGroups.value.findIndex((el: { id: number; }) => el.id === this.musicGroupId);
                this.musicGroupService.musicGroups.value.splice(index, 1)
            })
            this.modalService.hide();
        }
    }

    // Get cities relation when country is selected in form
    countryOnChange($event: number): void {
        this.getCityByCountryId($event);
    }

    getCountries(): void {
        this.countryService.getCountryCollection().subscribe((countries: Country[]) => {
            this.countries = countries;
        });
    }

    getCityByCountryId(id: number): void {
        this.cityService.getCityByCountry(id).subscribe((cities: City[]) => {
            this.cities = cities;
        });
    }

    getMusicTrends(): void {
        this.musicTrendService.getMusicTrendCollection().subscribe((musicTrends: MusicTrend[]) => {
            this.musicTrends = musicTrends;
        });
    }
}
