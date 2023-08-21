import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { userApi } from 'src/app/core/http/userAccount.service';
interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRoles: AddUserRoleDto[];
}
interface AddUserRoleDto {
  id: number;
  roleName: string;
}
interface TransformedUserRoleDto {
  roleId: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './userRegister.component.html',
})
export class RegisterComponent {
  roles: AddUserRoleDto[] = [];
  registrationForm!: FormGroup;
  constructor(
    private readonly http: HttpClient,
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: userApi
  ) {}

  ngOnInit(): void {
    this.crearteRegistration();
    this.fetchRoles();
  }
  crearteRegistration(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        middleName: '',
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),

        userRoles: [null, Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
  fetchRoles() {
    this.http
      .get<AddUserRoleDto[]>('http://192.168.29.97:5296/UserAccount/roles')
      this.userService.userRoles()
      .subscribe({
        next:(roles)=>{
          this.roles = roles;

        }
      }
        
      );
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    const formData: RegisterUserDto = this.transformFormData(
      this.registrationForm.value
    );

    const url = 'http://192.168.29.97:5296/UserAccount/registeruser';
this.userService.registerUser(formData).subscribe({
  next:()=>{
    this.router.navigate(['/users']);
  },
  error:(error)=>{
    alert(error.message);
  }

})
  }
  transformFormData(data: any): RegisterUserDto {
    const userRoles: TransformedUserRoleDto[] = [];

    if (data.userRoles) {
      const selectedRole = this.roles.find(
        (role) => role.id === data.userRoles
      );
      if (selectedRole) {
        userRoles.push({
          roleId: selectedRole.id,
        });
      }
    }

    delete data.confirmPassword;
    return {
      ...data,
      userRoles: userRoles,
    };
  }

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }

    const formControl = this.registrationForm.get(field);
    if (formControl) {
      formControl.setValue(formControl.value);
    }
  }
}
