import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { finalize, take } from 'rxjs';

import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User, UserPayload } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    UserFormComponent
  ],
  templateUrl: './user-management-page.component.html',
  styleUrl: './user-management-page.component.css'
})
export class UserManagementPageComponent implements OnInit {
  readonly displayedColumns = ['name', 'email', 'note', 'actions'];

  /** Material table tracks updates reliably via `MatTableDataSource`; a plain array often skips re-render. */
  readonly dataSource = new MatTableDataSource<User>([]);

  selectedUser: User | null = null;
  loading = true;
  submitting = false;
  showForm = false;

  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.changeDetectorRef.detectChanges();
        })
      )
      .subscribe({
        next: (users) => {
          this.dataSource.data = users;
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => {
          console.error('getUsers failed', err);
          this.showError(this.httpErrorMessage('Failed to load users', err));
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  openCreateForm(): void {
    this.selectedUser = null;
    this.showForm = true;
  }

  openEditForm(user: User): void {
    this.selectedUser = user;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedUser = null;
  }

  saveUser(payload: UserPayload): void {
    this.submitting = true;
    const request$ = this.selectedUser
      ? this.userService.updateUser(this.selectedUser.id, payload)
      : this.userService.createUser(payload);

    request$
      .pipe(
        take(1),
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.showSuccess(this.selectedUser ? 'User updated successfully.' : 'User created successfully.');
          this.closeForm();
          this.fetchUsers();
        },
        error: (err) => {
          console.error('saveUser failed', err);
          this.showError(this.httpErrorMessage('Unable to save user', err));
        }
      });
  }

  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.name}?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel'
      }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean | undefined) => {
        if (confirmed) {
          this.deleteUser(user.id);
        }
      });
  }

  private deleteUser(id: number): void {
    this.userService
      .deleteUser(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.showSuccess('User deleted successfully.');
          this.fetchUsers();
        },
        error: (err) => {
          console.error('deleteUser failed', err);
          this.showError(this.httpErrorMessage('Unable to delete user', err));
        }
      });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3500
    });
  }

  private httpErrorMessage(prefix: string, err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return `${prefix}. Network/CORS error — run ng serve with proxy (see proxy.conf.json) or enable CORS on the API.`;
      }
      return `${prefix} (${err.status}${err.statusText ? ` ${err.statusText}` : ''}).`;
    }
    return `${prefix}. Please try again.`;
  }
}
