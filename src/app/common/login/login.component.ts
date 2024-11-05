import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRegistering = false;
  isForgotPassword = false;
  registerAttempted = false;
  isResetPasswordSuccessful = false;
  registrationSuccess = false;

  loginData = { username: '', password: '' };
  registerData = { firstName: '', lastName: '', username: '', password: '' };
  forgotPasswordData = { username: '', newPassword: '', confirmPassword: '' };

  registerMessage = '';
  loginMessage = '';
  forgotPasswordMessage = '';
  resetPasswordMessage = '';

  showPassword = false;
  showRegisterPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router) {}

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
    this.clearMessages();
    this.registerAttempted = false;

    if (this.isRegistering) {
      this.loginData = { username: '', password: '' };
    } else {
        this.registerData = { firstName: '', lastName: '', username: '', password: '' };
        this.registerAttempted = false;
    }
  }

  toggleForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
    this.clearMessages();
    if (this.isForgotPassword) {
      this.forgotPasswordData = { username: '', newPassword: '', confirmPassword: '' };
      this.loginData = { username: '', password: '' };
    }
  }

  toggleresetPassword() {
    this.isForgotPassword = false;
    this.isResetPasswordSuccessful = false;
    this.clearMessages();
  }

  register() {
    this.registerAttempted = true; // Set attempt flag to true on submit

    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.username || !this.registerData.password) {
      this.registerMessage = 'error: All fields are mandatory.';
      return; // Stop further processing if any field is empty
    }
    
    // Only check for existing user if all fields are filled
    const existingUser = JSON.parse(localStorage.getItem(this.registerData.username) || 'null');
    if (existingUser) {
      this.registerMessage = 'error: User already exists. Please log in.';
      return;
    }

    // Register the user
    localStorage.setItem(this.registerData.username, JSON.stringify(this.registerData));
    this.registerMessage = 'success: User Registered successfully, Please log in.';
    this.registrationSuccess = true;
    this.registerAttempted = false;
  }

  goToLogin() {
    this.isRegistering = false;
    this.registrationSuccess = false;
    this.registerData = { firstName: '', lastName: '', username: '', password: '' };
  }

  login() {
    this.clearMessages();

    if (!this.loginData.username || !this.loginData.password) {
      this.loginMessage = 'error: Username and Password is missing.';
      return; // Stop further processing if any field is empty
    }
    const storedUser = JSON.parse(localStorage.getItem(this.loginData.username) || 'null');

    if (storedUser) {
      // Check if the password matches
      if (storedUser.password === this.loginData.password) {
        this.loginMessage = 'success: Logging in...'; // Set success message
            setTimeout(() => {
                this.router.navigate(['/details']); // Navigate to the details page after a brief delay
            }, 1000)
          this.router.navigate(['/details']); // Navigate to the details page on successful login
      } else {
          this.loginMessage = 'error: Username and Password are not correct.'; // Set specific error message for incorrect password
      }
    } else {
        this.loginMessage = 'error: User not found'; // Set message if the user does not exist
    }
  }

  forgotPassword() {
    this.clearMessages();

    if (!this.forgotPasswordData.username || !this.forgotPasswordData.newPassword || !this.forgotPasswordData.confirmPassword) {
      this.forgotPasswordMessage = 'error: All fields are mandatory.';
      return; // Stop further processing if any field is empty
    }

    const storedUser = JSON.parse(localStorage.getItem(this.forgotPasswordData.username) || 'null');

    if (!storedUser) {
      this.forgotPasswordMessage = 'User not found';
    } else if (this.forgotPasswordData.newPassword !== this.forgotPasswordData.confirmPassword) {
      this.forgotPasswordMessage = 'Passwords do not match';
    } else {
      storedUser.password = this.forgotPasswordData.newPassword;
      localStorage.setItem(this.forgotPasswordData.username, JSON.stringify(storedUser));
      this.resetPasswordMessage = 'Password reset successful. Please log in.';
      this.isResetPasswordSuccessful = true;
    }
  } 

  private clearMessages() {
    this.registerMessage = '';
    this.loginMessage = '';
    this.forgotPasswordMessage = '';
    this.resetPasswordMessage = '';
  }
  
  getMessageClass(): string {
    if (this.registerMessage.startsWith('error:')) {
      return 'error'; // Class for error messages
    }
    if (this.registerMessage.startsWith('success:')) {
      return 'success'; // Class for success messages
    }

    if (this.loginMessage.startsWith('error:')) {
      return 'error'; // Class for error messages
    }
    if (this.loginMessage.startsWith('success:')) {
        return 'success'; // Class for success messages
    }

    if (this.forgotPasswordMessage.startsWith('error:')) {
      return 'error'; // Class for error messages
    }
    if (this.forgotPasswordMessage.startsWith('success:')) {
        return 'success'; // Class for success messages
    }
    return ''; // Default class if no message
  }

  togglePasswordVisibility(type: 'login' | 'register' | 'new' | 'confirm') {
    if (type === 'login') {
      this.showPassword = !this.showPassword;
    } else if (type === 'register') {
      this.showRegisterPassword = !this.showRegisterPassword;
    } else if (type === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (type === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
