import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ContractService} from '../../../dao/impl/contract/contract.service';
import {Contract} from '../../../model/contract/Contract';
import {ChildAvatarResponse} from '../../../model/childavatar/ChildAvatarResponse';
import {ConfirmDialogComponent} from '../../../dialog/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../object/DialogResult';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {
  contractID: number;
  contract: Contract;
  loading = true;
  statuses = {
    completed: 'Завершён',
    in_work: 'В работе',
    new: 'Новый'
  };
  communications = {
    hasTelegram: 'Telegeam',
    hasWhatsapp: 'Whatsapp',
    hasViber: 'Viber'
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private contractService: ContractService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.contractID = Number(this.route.snapshot.paramMap.get('id'));
    this.getOne();
  }

  getOne() {
    this.contractService.getOne(this.contractID).subscribe(result => {
        this.contract = result;
        this.loading = false;
      },
      error => {
        this.toastr.error(error.error, 'Error');
      });
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  changeStatus(status: string) {
    this.loading = true;
    const upperCased = status.toUpperCase();
    this.contractService.changeStatus(this.contractID, upperCased).subscribe(
      result => {
        this.contract = result;
      },
      error => {
        this.toastr.error(error.error, 'Error');
        this.loading = false;
      },
    () => {
        this.loading = false;
    }
    );
  }

  openDialog(status: string) {
    let message = '';
    if (status === 'in_work') {
      message = `Взять в работу контракт №${this.contractID}?`;
    } else if (status === 'completed') {
      message = `Завешить контракт №${this.contractID}?`;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.changeStatus(status);
      }
    });
  }

}
