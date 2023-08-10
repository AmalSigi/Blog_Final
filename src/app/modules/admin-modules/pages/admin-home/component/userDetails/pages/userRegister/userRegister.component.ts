import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  _UserRoles: AddUserRoleDto[];
}
interface AddUserRoleDto {
  id: number;
  roleName: string;
}
interface TransformedUserRoleDto {
  roleId: number;
  _RoleName: string;
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
        _MiddleName: '',
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),

        _UserRoles: [null, Validators.required],
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
      .subscribe(
        (roles) => {
          console.log(roles);
          this.roles = roles;
        },
        (error) => {
          console.error('Failed');
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
    console.log(this.registrationForm.value);
    console.log(formData);
    this.http.post(url, formData).subscribe(
      (res) => {
        console.log('Registration Successfull', res);
      },
      (err) => console.error(`Error Occured ${JSON.stringify(err)}`)
    );
  }
  transformFormData(data: any): RegisterUserDto {
    const userRoles: TransformedUserRoleDto[] = [];

    if (data._UserRoles) {
      const selectedRole = this.roles.find(
        (role) => role.id === data._UserRoles
      );
      if (selectedRole) {
        userRoles.push({
          roleId: selectedRole.id,
          _RoleName: selectedRole.roleName,
        });
      }
    }

    delete data.confirmPassword;
    return {
      ...data,
      _UserRoles: userRoles,
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
