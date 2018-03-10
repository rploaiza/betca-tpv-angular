import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Provider } from '../shared/provider.model';
import { ProviderService } from '../shared/provider.service';

@Component({
    templateUrl: 'provider-creation-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ProviderCreationDialogComponent implements OnInit {
    edit: boolean;
    provider: Provider;

    constructor(public dialogRef: MatDialogRef<ProviderCreationDialogComponent>,
        private providerService: ProviderService) {
    }

    ngOnInit(): void {
        if (!this.provider) {
            this.provider = { id: undefined, company: '' };
        }
    }

    create(): void {
        this.providerService.createObservable(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.providerService.putObservable(this.provider).subscribe(
            data => this.dialogRef.close()
        );
    }
}
