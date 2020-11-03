import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {EMPTY, merge, of} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';

import {Form, FormField, FormQueryParams, Meta, ServerResponse} from '../../shared/types/form';
import {FormsService} from './services/forms.service';
import {untilDestroyed} from '../../core';
import {FormsTableComponent} from '../../shared/components/forms-table/forms-table.component';
import {CreateFormComponent} from '../../shared/entryComponents/create-form/create-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  data: Array<Form>;
  meta: Meta;

  formFields: FormField[];

  filterForm: FormGroup;
  searchControl: FormControl = new FormControl('');

  @ViewChild(FormsTableComponent) table: FormsTableComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getDataFromResolver();
  }

  ngAfterViewInit(): void {
    this.paginatorOrSortOnChange();
    this.searchOnChange();
    this.filterOnChange();
  }

  ngOnDestroy(): void {
  }

  get formQueryParams(): FormQueryParams {
    return {
      order_by: this.table.sort.active,
      order_direction: this.table.sort.direction,
      page: this.paginator.pageIndex + 1,
      per_page: this.paginator.pageSize
    };
  }

  private getDataFromResolver(): void {
    this.route.data
      .pipe(
        map(response => response.serverData),
        catchError(() => of([])),
        untilDestroyed(this)
      )
      .subscribe((response: ServerResponse<Form>) => {
        this.data = response.data;
        this.meta = response.meta;
      });

    this.route.data
      .pipe(
        map(response => response.formFields),
        catchError(() => of([])),
        untilDestroyed(this)
      )
      .subscribe((response: ServerResponse<FormField>) => this.formFields = response.data);
  }

  private paginatorOrSortOnChange(): void {
    merge(this.table.sort.sortChange, this.paginator.page)
      .pipe(
        switchMap(() => this.formsService.getAll(this.formQueryParams)),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        catchError(() => of([])),
        untilDestroyed(this)
      ).subscribe((forms: Form[]) => this.data = forms);
  }

  private initForm(): void {
    this.filterForm = this.formBuilder.group({
      created_at: '',
      updated_at: '',
    });
  }

  private searchOnChange(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        filter(value => value.trim()),
        distinctUntilChanged(),
        switchMap(search => this.formsService.getAll({search})
          .pipe(
            catchError(() => EMPTY)
          )),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this)
      )
      .subscribe((forms: Form[]) => this.data = forms);
  }

  private filterOnChange(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        filter(value => value.created_at || value.updated_at),
        map(date => this.stringifyDate(date)),
        switchMap(query => this.formsService.getAll(query)
          .pipe(
            catchError(() => EMPTY)
          )),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this)
      )
      .subscribe((forms: Form[]) => this.data = forms);
  }

  private stringifyDate(date: object): object {
    const dateFilter = [];
    Object.keys(date).forEach(key => {
      if (date[key]) {
        dateFilter.push(`${key},>=,` + moment(date[key]).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));
      }
    });
    return {filters: dateFilter.join(';')};
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      disableClose: true,
      data: this.formFields.concat()
    });

    dialogRef.afterClosed()
      .pipe(
        filter(value => value),
        switchMap(form => this.formsService.save(form)),
        switchMap(() => this.formsService.getAll()),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this),
      )
      .subscribe((forms: Form[]) => this.data = forms);
  }

  delete(id: number): void {
    this.formsService.delete(id)
      .pipe(
        switchMap(() => this.formsService.getAll()),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this))
      .subscribe((forms: Form[]) => this.data = forms);
  }

  refreshTable(): void {
    this.formsService.getAll()
      .pipe(
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this))
      .subscribe((forms: Form[]) => this.data = forms);
  }

  update(updatedForm: Form): void {
    this.formsService.update(updatedForm)
      .pipe(
        switchMap(() => this.formsService.getAll()),
        map(response => {
          this.meta = response.meta;
          return response.data;
        }),
        untilDestroyed(this))
      .subscribe((forms: Form[]) => this.data = forms);
  }
}
