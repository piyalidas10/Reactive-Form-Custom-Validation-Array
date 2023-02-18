import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() field: AbstractControl | undefined;
  @Input() showError: boolean = false;
  @Input() customClass: string = 'error-parent';
  @Input() warnings: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
